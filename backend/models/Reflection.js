import mongoose from "mongoose";
import validator from "mongoose-validator"; // For advanced validation
import sanitizeHtml from "sanitize-html"; // For sanitizing inputs

// Define allowed emotions for consistency and analytics
const ALLOWED_EMOTIONS = [
  "happy",
  "sad",
  "angry",
  "neutral",
  "anxious",
  "excited",
  "calm",
  "confused",
  "grateful",
];

// Reflection Schema
const reflectionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },

    // Input data
    rawInput: {
      type: String,
      required: [true, "Input text is required"],
      trim: true,
      validate: [
        {
          validator: (value) => value.length >= 3,
          message: "Input must be at least 3 characters long",
        },
        {
          validator: (value) => sanitizeHtml(value, { allowedTags: [] }).length > 0,
          message: "Input contains invalid characters",
        },
      ],
    },
    inputType: {
      type: String,
      enum: {
        values: ["text", "voice"],
        message: "{VALUE} is not a valid input type",
      },
      default: "text",
    },

    // Voice storage (optional, with validation for URL format)
    voiceUrl: {
      type: String,
      validate: {
        validator: (value) =>
          !value || /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(value),
        message: "Invalid voice URL format",
      },
    },

    // AI-generated output
    artUrl: {
      type: String,
      validate: {
        validator: (value) =>
          !value || /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(value),
        message: "Invalid art URL format",
      },
    },
    mantra: {
      type: String,
      maxlength: [280, "Mantra must be 280 characters or less"],
      trim: true,
      validate: {
        validator: (value) =>
          !value || sanitizeHtml(value, { allowedTags: [] }).length > 0,
        message: "Mantra contains invalid characters",
      },
    },

    // RAG Wisdom context
    wisdomReference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wisdom",
    },

    // Sentiment/Emotion metadata
    emotion: {
      type: String,
      enum: {
        values: ALLOWED_EMOTIONS,
        message: "{VALUE} is not a valid emotion",
      },
      default: "neutral",
    },
    moodScore: {
      type: Number,
      min: [-10, "Mood score cannot be less than -10"],
      max: [10, "Mood score cannot be more than 10"],
    },

    // Engagement metadata
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    shares: {
      type: Number,
      default: 0,
      min: [0, "Shares cannot be negative"],
    },
    visibility: {
      type: String,
      enum: {
        values: ["private", "friends", "public"],
        message: "{VALUE} is not a valid visibility setting",
      },
      default: "private",
    },

    // Moderation flags
    flagged: {
      type: Boolean,
      default: false,
    },
    flaggedReason: {
      type: String,
      trim: true,
      validate: {
        validator: (value) =>
          !value || sanitizeHtml(value, { allowedTags: [] }).length > 0,
        message: "Flagged reason contains invalid characters",
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    toJSON: { virtuals: true }, // Include virtuals in JSON output
    toObject: { virtuals: true }, // Include virtuals in object output
  }
);

// Virtual for likes count (to avoid storing redundant data)
reflectionSchema.virtual("likesCount").get(function () {
  return this.likes.length;
});

// Pre-save hook to sanitize inputs
reflectionSchema.pre("save", function (next) {
  if (this.rawInput) {
    this.rawInput = sanitizeHtml(this.rawInput, { allowedTags: [], allowedAttributes: {} });
  }
  if (this.mantra) {
    this.mantra = sanitizeHtml(this.mantra, { allowedTags: [], allowedAttributes: {} });
  }
  if (this.flaggedReason) {
    this.flaggedReason = sanitizeHtml(this.flaggedReason, {
      allowedTags: [],
      allowedAttributes: {},
    });
  }
  next();
});

// Compound indexes for performance
reflectionSchema.index({ user: 1, createdAt: -1 }); // For fetching user reflections
reflectionSchema.index({ emotion: 1, createdAt: -1 }); // For emotion-based analytics
reflectionSchema.index({ visibility: 1, createdAt: -1 }); // For public/friends feed queries
reflectionSchema.index({ flagged: 1 }); // For moderation queries

// Static method for paginated user reflections
reflectionSchema.statics.getUserReflections = async function (userId, page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  return this.find({ user: userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean(); // Use lean for faster queries
};

// Static method for analytics (e.g., emotion trends)
reflectionSchema.statics.getEmotionTrends = async function (userId, startDate, endDate) {
  return this.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId), createdAt: { $gte: startDate, $lte: endDate } } },
    { $group: { _id: "$emotion", count: { $sum: 1 }, avgMood: { $avg: "$moodScore" } } },
    { $sort: { count: -1 } },
  ]);
};

// Ensure indexes are created
reflectionSchema.on("index", (error) => {
  if (error) {
    console.error("Index creation failed:", error);
  }
});

// Export the model
export default mongoose.model("Reflection", reflectionSchema);