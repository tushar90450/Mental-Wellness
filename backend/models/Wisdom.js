// models/Wisdom.js
import mongoose from "mongoose";

const wisdomSchema = new mongoose.Schema({
  source: { type: String, required: true }, // e.g., "Zen", "Bhagavad Gita", "Stoicism"
  text: { type: String, required: true },   // original wisdom text / parable
  meaning: { type: String },                // short interpretation

  // Vector embedding for semantic search
  embedding: { type: [Number], index: "2dsphere" },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Wisdom", wisdomSchema);
