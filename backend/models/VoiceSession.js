// models/VoiceSession.js
import mongoose from "mongoose";

const voiceSessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  audioUrl: { type: String },     // uploaded audio file
  transcription: { type: String },// Whisper output
  reflection: { type: mongoose.Schema.Types.ObjectId, ref: "Reflection" },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("VoiceSession", voiceSessionSchema);
