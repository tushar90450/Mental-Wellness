import express from "express";
import VoiceSession from "../models/VoiceSession.js";

const router = express.Router();

// Create a new voice session
router.post("/", async (req, res) => {
  try {
    const session = new VoiceSession({
      user: req.body.user,
      caretaker: req.body.caretaker,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      duration: req.body.duration,
    });

    const saved = await session.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all sessions for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const sessions = await VoiceSession.find({ user: req.params.userId }).populate("caretaker", "name email");
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all sessions for a caretaker
router.get("/caretaker/:caretakerId", async (req, res) => {
  try {
    const sessions = await VoiceSession.find({ caretaker: req.params.caretakerId }).populate("user", "name email");
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
