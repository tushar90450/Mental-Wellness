// models/VoiceSession.js
import mongoose from "mongoose";

const voiceSessionSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true, 
      index: true 
    },

    audioUrl: { 
      type: String, 
      required: true,
      trim: true 
    }, // Cloud storage URL of the uploaded audio

    transcription: { 
      type: String, 
      trim: true 
    }, // Whisper or other ASR output

    reflection: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Reflection" 
    }, // Links voice session to a generated reflection

    duration: { 
      type: Number, 
      min: 0 
    }, // audio length in seconds (optional but useful)

    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending"
    }, // track audio -> transcription -> reflection pipeline
  },
  { 
    timestamps: true // adds createdAt & updatedAt
  }
);

// Index for faster user lookup
voiceSessionSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model("VoiceSession", voiceSessionSchema);
