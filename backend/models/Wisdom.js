import mongoose from "mongoose";
import validator from "mongoose-validator"; // For advanced validation
import sanitizeHtml from "sanitize-html"; // For sanitizing inputs

// Define allowed tags for consistency
const ALLOWED_TAGS = [
  "zen",
  "stoicism",
  "sufism",
  "hinduism",
  "buddhism",
  "philosophy",
  "spirituality",
  "resilience",
  "compassion",
  "mindfulness",
];

// Wisdom Schema
const wisdomSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: [true, "Source is required"],
      trim: true,
      maxlength: [100, "Source must be 100 characters or less"],
      validate: {
        validator: (value) => sanitizeHtml(value, { allowedTags: [] }).length > 0,
        message: "Source contains invalid characters",
      },
    },

    text: {
      type: String,
      required: [true, "Text is required"],
      trim: true,
      maxlength: [2000, "Text must be 2000 characters or less"],
      validate: {
        validator: (value) => sanitizeHtml(value, { allowedTags: [] }).length > 0,
        message: "Text contains invalid characters",
      },
    },

    meaning: {
      type: String,
      trim: true,
      maxlength: [1000, "Meaning must be 1000 characters or less"],
      validate: {
        validator: (value) =>
          !value || sanitizeHtml(value, { allowedTags: [] }).length > 0,
        message: "Meaning contains invalid characters",
      },
    },

    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
        maxlength: [50, "Each tag must be 50 characters or less"],
        validate: {
          validator: (value) => ALLOWED_TAGS.includes(value) || /^[a-z0-9-]+$/.test(value),
          message: "Invalid tag format or value",
        },
      },
    ],

    embedding: {
      type: [Number],
      default: [],
      validate: {
        validator: (value) =>
          Array.isArray(value) && value.every((v) => typeof v === "number" && isFinite(v)),
        message: "Embedding must be an array of valid numbers",
      },
    },

    attribution: {
      author: {
        type: String,
        trim: true,
        maxlength: [100, "Author name must be 100 characters or less"],
        validate: {
          validator: (value) =>
            !value || sanitizeHtml(value, { allowedTags: [] }).length > 0,
          message: "Author name contains invalid characters",
        },
      },
      reference: {
        type: String,
        trim: true,
        maxlength: [200, "Reference must be 200 characters or less"],
        validate: {
          validator: (value) =>
            !value || sanitizeHtml(value, { allowedTags: [] }).length > 0,
          message: "Reference contains invalid characters",
        },
      },
      link: {
        type: String,
        trim: true,
        validate: {
          validator: (value) =>
            !value || /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(value),
          message: "Invalid link URL format",
        },
      },
    },

    usageCount: {
      type: Number,
      default: 0,
      min: [0, "Usage count cannot be negative"],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    toJSON: { virtuals: true }, // Include virtuals in JSON output
    toObject: { virtuals: true }, // Include virtuals in object output
  }
);

// Pre-save hook to sanitize inputs
wisdomSchema.pre("save", function (next) {
  if (this.source) {
    this.source = sanitizeHtml(this.source, { allowedTags: [], allowedAttributes: {} });
  }
  if (this.text) {
    this.text = sanitizeHtml(this.text, { allowedTags: [], allowedAttributes: {} });
  }
  if (this.meaning) {
    this.meaning = sanitizeHtml(this.meaning, { allowedTags: [], allowedAttributes: {} });
  }
  if (this.attribution.author) {
    this.attribution.author = sanitizeHtml(this.attribution.author, {
      allowedTags: [],
      allowedAttributes: {},
    });
  }
  if (this.attribution.reference) {
    this.attribution.reference = sanitizeHtml(this.attribution.reference, {
      allowedTags: [],
      allowedAttributes: {},
    });
  }
  next();
});

// Indexes for performance
wisdomSchema.index({ source: 1, createdAt: -1 }); // For source-based queries
wisdomSchema.index({ tags: 1, usageCount: -1 }); // For tag-based filtering and popularity
wisdomSchema.index(
  { text: "text", meaning: "text", source: "text" },
  { weights: { text: 10, meaning: 5, source: 2 } }
); // Weighted text search for RAG

// Static method for fetching wisdom by tags with pagination
wisdomSchema.statics.getWisdomByTags = async function (tags, page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  return this.find({ tags: { $in: tags } })
    .sort({ usageCount: -1, createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean(); // Use lean for faster queries
};

// Static method for incrementing usage count
wisdomSchema.statics.incrementUsage = async function (wisdomId) {
  return this.findByIdAndUpdate(
    wisdomId,
    { $inc: { usageCount: 1 } },
    { new: true, lean: true }
  );
};

// Static method for basic embedding-based similarity search (if not using external vector DB)
wisdomSchema.statics.findByEmbedding = async function (queryEmbedding, limit = 5) {
  // Note: For production, use a vector DB like Pinecone or Weaviate for efficient similarity search
  // This is a basic cosine similarity implementation for MongoDB
  return this.aggregate([
    {
      $match: {
        embedding: { $exists: true, $ne: [] },
      },
    },
    {
      $addFields: {
        cosineSimilarity: {
          $let: {
            vars: {
              query: queryEmbedding,
              doc: "$embedding",
            },
            in: {
              $divide: [
                {
                  $reduce: {
                    input: { $zip: { inputs: ["$$query", "$$doc"] } },
                    initialValue: 0,
                    in: {
                      $add: [
                        "$$value",
                        { $multiply: [{ $arrayElemAt: ["$$this", 0] }, { $arrayElemAt: ["$$this", 1] }] },
                      ],
                    },
                  },
                },
                {
                  $multiply: [
                    {
                      $sqrt: {
                        $reduce: {
                          input: "$$query",
                          initialValue: 0,
                          in: { $add: ["$$value", { $pow: ["$$this", 2] }] },
                        },
                      },
                    },
                    {
                      $sqrt: {
                        $reduce: {
                          input: "$$doc",
                          initialValue: 0,
                          in: { $add: ["$$value", { $pow: ["$$this", 2] }] },
                        },
                      },
                    },
                  ],
                },
              ],
            },
          },
        },
      },
    },
    { $sort: { cosineSimilarity: -1 } },
    { $limit: limit },
    { $project: { cosineSimilarity: 0 } }, // Exclude similarity score from output
  ]);
};

// Ensure indexes are created
wisdomSchema.on("index", (error) => {
  if (error) {
    console.error("Index creation failed:", error);
  }
});

// Export the model
export default mongoose.model("Wisdom", wisdomSchema);