// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: "",
    },

    // For personalization
    preferences: {
      language: {
        type: String,
        enum: ["en", "hi"], // supports English & Hindi
        default: "en",
      },
      theme: {
        type: String,
        enum: ["light", "dark", "system"],
        default: "system",
      },
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: false },
      },
    },

    // Emotional reflections gallery
    reflections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reflection",
      },
    ],

    // Security / account management
    role: {
      type: String,
      enum: ["user", "admin"],
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
      enum: ["active", "suspended", "deleted"],
      default: "active",
    },

    // Device tracking (for JWT refresh tokens / sessions)
    sessions: [
      {
        device: String,
        ip: String,
        token: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true } // auto adds createdAt & updatedAt
);

// Indexing for faster queries
userSchema.index({ email: 1 });
userSchema.index({ "preferences.language": 1 });

export default mongoose.model("User", userSchema);
