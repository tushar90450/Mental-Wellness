// models/Wisdom.js
import mongoose from "mongoose";

const wisdomSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100, // avoid overly long tags like "Bhagavad Gita - Chapter 2"
    },

    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000, // ensures DB doesn’t store excessively long passages
    },

    meaning: {
      type: String,
      trim: true,
      maxlength: 1000, // optional interpretation/explanation
    },

    // Optional tags/categories for filtering/search
    tags: [
      {
        type: String,
        trim: true,
        maxlength: 50,
        lowercase: true,
      },
    ],

    // Embedding for semantic similarity search
    embedding: {
      type: [Number],
      default: [],
      // ⚠️ Use "2dsphere" only for [lng, lat] coordinates.
      // For embeddings, we store as array of floats & index with external vector DB (like Pinecone).
      // To keep in Mongo, use standard array index for filtering if needed.
    },

    // Attribution / metadata
    attribution: {
      author: { type: String, trim: true, maxlength: 100 },
      reference: { type: String, trim: true }, // e.g., "Chapter 4, Verse 12"
      link: { type: String, trim: true }, // external resource URL
    },

    // Usage tracking (for RAG popularity / analytics)
    usageCount: { type: Number, default: 0 },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Indexing for performance
wisdomSchema.index({ source: 1 });
wisdomSchema.index({ tags: 1 });
wisdomSchema.index({ text: "text", meaning: "text" }); // full-text search

export default mongoose.model("Wisdom", wisdomSchema);
