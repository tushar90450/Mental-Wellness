// routes/reflection.routes.js
import express from "express";
import Reflection from "../models/Reflection.js";

const router = express.Router();

/**
 * @route   POST /api/reflections
 * @desc    Create a new reflection
 * @access  Public (you may later add auth middleware here)
 */
router.post("/", async (req, res) => {
  try {
    const { user, rawInput, inputType } = req.body;

    if (!user || !rawInput || !inputType) {
      return res.status(400).json({ error: "user, rawInput, and inputType are required." });
    }

    const reflection = new Reflection({ user, rawInput, inputType });
    const saved = await reflection.save();

    res.status(201).json({
      success: true,
      message: "Reflection created successfully",
      data: saved,
    });
  } catch (err) {
    console.error("Error creating reflection:", err.message);
    res.status(500).json({ error: "Server error. Could not create reflection." });
  }
});

/**
 * @route   GET /api/reflections/:userId
 * @desc    Get all reflections for a specific user
 * @access  Public (you may later restrict this with auth)
 */
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const reflections = await Reflection.find({ user: userId })
      .populate("wisdomReference") // expands linked wisdom
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reflections.length,
      data: reflections,
    });
  } catch (err) {
    console.error("Error fetching reflections:", err.message);
    res.status(500).json({ error: "Server error. Could not fetch reflections." });
  }
});

export default router;
