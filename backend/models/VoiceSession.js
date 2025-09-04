import mongoose from "mongoose";
import validator from "mongoose-validator"; // For advanced validation
import sanitizeHtml from "sanitize-html"; // For sanitizing inputs

// Voice Session Schema
const voiceSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },

    audioUrl: {
      type: String,
      required: [true, "Audio URL is required"],
      trim: true,
      validate: {
        validator: (value) => /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(value),
        message: "Invalid audio URL format",
      },
    },

    transcription: {
      type: String,
      trim: true,
      validate: {
        validator: (value) =>
          !value || sanitizeHtml(value, { allowedTags: [] }).length > 0,
        message: "Transcription contains invalid characters",
      },
    },

    reflection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reflection",
    },

    duration: {
      type: Number,
      min: [0, "Duration cannot be negative"],
      validate: {
        validator: (value) => !value || Number.isFinite(value),
        message: "Duration must be a valid number",
      },
    },

    status: {
      type: String,
      enum: {
        values: ["pending", "processing", "completed", "failed"],
        message: "{VALUE} is not a valid status",
      },
      default: "pending",
    },

    errorMessage: {
      type: String,
      trim: true,
      validate: {
        validator: (value) =>
          !value || sanitizeHtml(value, { allowedTags: [] }).length > 0,
        message: "Error message contains invalid characters",
      },
    }, // Store failure reasons for debugging
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    toJSON: { virtuals: true }, // Include virtuals in JSON output
    toObject: { virtuals: true }, // Include virtuals in object output
  }
);

// Pre-save hook to sanitize inputs
voiceSessionSchema.pre("save", function (next) {
  if (this.transcription) {
    this.transcription = sanitizeHtml(this.transcription, {
      allowedTags: [],
      allowedAttributes: {},
    });
  }
  if (this.errorMessage) {
    this.errorMessage = sanitizeHtml(this.errorMessage, {
      allowedTags: [],
      allowedAttributes: {},
    });
  }
  next();
});

// Compound indexes for performance
voiceSessionSchema.index({ user: 1, createdAt: -1 }); // For fetching user sessions
voiceSessionSchema.index({ status: 1, createdAt: -1 }); // For pipeline monitoring
voiceSessionSchema.index({ reflection: 1 }); // For linking to reflections

// Static method for fetching user voice sessions with pagination
voiceSessionSchema.statics.getUserSessions = async function (userId, page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  return this.find({ user: userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean(); // Use lean for faster queries
};

// Static method for retrying failed sessions
voiceSessionSchema.statics.retryFailedSessions = async function () {
  return this.updateMany(
    { status: "failed" },
    { $set: { status: "pending", errorMessage: null } },
    { multi: true }
  );
};

// Static method for pipeline status analytics
voiceSessionSchema.statics.getStatusAnalytics = async function (startDate, endDate) {
  return this.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ]);
};

// Ensure indexes are created
voiceSessionSchema.on("index", (error) => {
  if (error) {
    console.error("Index creation failed:", error);
  }
});

// Export the model
export default mongoose.model("VoiceSession", voiceSessionSchema);