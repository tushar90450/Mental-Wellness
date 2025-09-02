// models/Reflection.js
import mongoose from "mongoose";

const reflectionSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true, 
      index: true 
    },

    // Input data
    rawInput: { 
      type: String, 
      required: true, 
      trim: true 
    }, 
    inputType: { 
      type: String, 
      enum: ["text", "voice"], 
      default: "text" 
    },

    // Voice storage (optional)
    voiceUrl: { type: String }, // if audio file is stored

    // AI-generated output
    artUrl: { type: String },  
    mantra: { 
      type: String, 
      maxlength: 280, // keep short & poetic 
      trim: true 
    },  

    // RAG Wisdom context
    wisdomReference: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Wisdom" 
    },

    // Sentiment/Emotion metadata (for analytics & recommendations)
    emotion: { 
      type: String, 
      enum: ["happy", "sad", "angry", "neutral", "anxious", "excited"], 
      default: "neutral" 
    },
    moodScore: { type: Number, min: -10, max: 10 }, // scale for analytics

    // Engagement metadata
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    shares: { type: Number, default: 0 },
    visibility: { 
      type: String, 
      enum: ["private", "friends", "public"], 
      default: "private" 
    },

    // Moderation flags
    flagged: { type: Boolean, default: false },
    flaggedReason: { type: String }
  },
  { 
    timestamps: true // adds createdAt & updatedAt automatically
  }
);

// Indexes for faster queries
reflectionSchema.index({ user: 1, createdAt: -1 }); // get latest reflections quickly
reflectionSchema.index({ emotion: 1 }); // mood tracking

export default mongoose.model("Reflection", reflectionSchema);
