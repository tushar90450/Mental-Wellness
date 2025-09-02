// models/Reflection.js
import mongoose from "mongoose";

const reflectionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  
  // Input
  rawInput: { type: String, required: true },   // text or transcribed voice
  inputType: { type: String, enum: ["text", "voice"], default: "text" },

  // Output
  artUrl: { type: String },  // generated symbolic art
  mantra: { type: String },  // 2-line poetic mantra
  
  // RAG Wisdom context
  wisdomReference: { type: mongoose.Schema.Types.ObjectId, ref: "Wisdom" },

  // For reflection timeline
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Reflection", reflectionSchema);
