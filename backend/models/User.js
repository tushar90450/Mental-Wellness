import mongoose from "mongoose";
import validator from "mongoose-validator"; // For advanced validation
import sanitizeHtml from "sanitize-html"; // For sanitizing inputs
import bcrypt from "bcryptjs"; // For secure password hashing
import net from "net";


// Define allowed languages for personalization
const ALLOWED_LANGUAGES = ["en", "hi", "es", "fr", "zh"]; // Extended for future multilingual support

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: [100, "Name must be 100 characters or less"],
      validate: {
        validator: (value) =>
          !value || sanitizeHtml(value, { allowedTags: [] }).length > 0,
        message: "Name contains invalid characters",
      },
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: "Invalid email format",
      },
    },

    passwordHash: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      validate: {
        validator: (value) => value && value.length >= 8, // Ensure hash exists
        message: "Invalid password hash",
      },
    },

    avatarUrl: {
      type: String,
      trim: true,
      default: "",
      validate: {
        validator: (value) =>
          !value || /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(value),
        message: "Invalid avatar URL format",
      },
    },

    preferences: {
      language: {
        type: String,
        enum: {
          values: ALLOWED_LANGUAGES,
          message: "{VALUE} is not a supported language",
        },
        default: "en",
      },
      theme: {
        type: String,
        enum: {
          values: ["light", "dark", "system"],
          message: "{VALUE} is not a valid theme",
        },
        default: "system",
      },
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: false },
      },
    },

    reflections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reflection",
      },
    ],

    role: {
      type: String,
      enum: {
        values: ["user", "admin", "moderator"],
        message: "{VALUE} is not a valid role",
      },
      default: "user",
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    lastLoginAt: {
      type: Date,
    },

    status: {
      type: String,
      enum: {
        values: ["active", "suspended", "deleted"],
        message: "{VALUE} is not a valid status",
      },
      default: "active",
    },

    sessions: [
      {
        device: {
          type: String,
          trim: true,
          maxlength: [100, "Device name must be 100 characters or less"],
        },
        
        ip: {
          type: String,
          trim: true,
          validate: {
            validator: (value) => !value || net.isIP(value) !== 0,
            message: "Invalid IP address format",
          },
        },

        token: {
          type: String,
          trim: true,
          required: [true, "Session token is required"],
        },
        createdAt: {
          type: Date,
          default: Date.now,
          expires: "30d", // Auto-expire sessions after 30 days
        },
      },
    ],

    resetPasswordToken: {
      type: String,
      trim: true,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    toJSON: { virtuals: true }, // Include virtuals in JSON output
    toObject: { virtuals: true }, // Include virtuals in object output
  }
);

// Virtual for reflections count
userSchema.virtual("reflectionsCount").get(function () {
  return this.reflections.length;
});

// Pre-save hook for sanitization and password hashing
userSchema.pre("save", async function (next) {
  // Sanitize text fields
  if (this.name) {
    this.name = sanitizeHtml(this.name, { allowedTags: [], allowedAttributes: {} });
  }
  if (this.sessions && this.sessions.length > 0) {
    this.sessions.forEach((session) => {
      if (session.device) {
        session.device = sanitizeHtml(session.device, {
          allowedTags: [],
          allowedAttributes: {},
        });
      }
    });
  }

  // Hash password if modified
  if (this.isModified("passwordHash")) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

// Static method for finding user by email
userSchema.statics.findByEmail = async function (email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Static method for cleaning up expired sessions
userSchema.statics.cleanupSessions = async function (userId) {
  return this.updateOne(
    { _id: userId },
    { $pull: { sessions: { createdAt: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } } } }
  );
};

// Static method for user analytics (e.g., active users by language)
userSchema.statics.getUserAnalytics = async function (startDate, endDate) {
  return this.aggregate([
    {
      $match: {
        status: "active",
        createdAt: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: "$preferences.language",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ]);
};

// Compound indexes for performance
userSchema.index({ email: 1 }, { unique: true }); // Ensure email uniqueness
userSchema.index({ "preferences.language": 1, createdAt: -1 }); // For language-based queries
userSchema.index({ status: 1, lastLoginAt: -1 }); // For active user tracking
userSchema.index({ role: 1 }); // For admin/moderator queries

// Ensure indexes are created
userSchema.on("index", (error) => {
  if (error) {
    console.error("Index creation failed:", error);
  }
});

// Export the model
export default mongoose.model("User", userSchema);