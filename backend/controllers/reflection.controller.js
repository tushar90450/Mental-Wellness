import asyncHandler from "express-async-handler";
import Reflection from "../models/Reflection.js";

// @desc    Create a new reflection
// @route   POST /api/reflections
// @access  Private
const createReflection = asyncHandler(async (req, res) => {
  const { rawInput, inputType, voiceUrl, artUrl, mantra, emotion, moodScore, visibility } = req.body;

  // Validate required fields
  if (!rawInput) {
    res.status(400);
    throw new Error("Raw input is required");
  }

  const reflection = new Reflection({
    user: req.user._id, // Assuming req.user is set by auth middleware
    rawInput,
    inputType: inputType || "text",
    voiceUrl,
    artUrl,
    mantra,
    emotion: emotion || "neutral",
    moodScore,
    visibility: visibility || "private",
  });

  const createdReflection = await reflection.save();
  res.status(201).json(createdReflection);
});

// @desc    Get a single reflection by ID
// @route   GET /api/reflections/:id
// @access  Private
const getReflection = asyncHandler(async (req, res) => {
  const reflection = await Reflection.findById(req.params.id).populate("user", "name email");

  if (!reflection) {
    res.status(404);
    throw new Error("Reflection not found");
  }

  // Check if user is authorized to view the reflection
  if (
    reflection.visibility === "private" &&
    reflection.user._id.toString() !== req.user._id.toString()
  ) {
    res.status(403);
    throw new Error("Not authorized to view this reflection");
  }

  res.json(reflection);
});

// @desc    Update a reflection
// @route   PUT /api/reflections/:id
// @access  Private
const updateReflection = asyncHandler(async (req, res) => {
  const reflection = await Reflection.findById(req.params.id);

  if (!reflection) {
    res.status(404);
    throw new Error("Reflection not found");
  }

  // Check if user is authorized to update
  if (reflection.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to update this reflection");
  }

  // Update fields
  const { rawInput, inputType, voiceUrl, artUrl, mantra, emotion, moodScore, visibility } = req.body;
  reflection.rawInput = rawInput || reflection.rawInput;
  reflection.inputType = inputType || reflection.inputType;
  reflection.voiceUrl = voiceUrl !== undefined ? voiceUrl : reflection.voiceUrl;
  reflection.artUrl = artUrl !== undefined ? artUrl : reflection.artUrl;
  reflection.mantra = mantra !== undefined ? mantra : reflection.mantra;
  reflection.emotion = emotion || reflection.emotion;
  reflection.moodScore = moodScore !== undefined ? moodScore : reflection.moodScore;
  reflection.visibility = visibility || reflection.visibility;

  const updatedReflection = await reflection.save();
  res.json(updatedReflection);
});

// @desc    Delete a reflection
// @route   DELETE /api/reflections/:id
// @access  Private
const deleteReflection = asyncHandler(async (req, res) => {
  const reflection = await Reflection.findById(req.params.id);

  if (!reflection) {
    res.status(404);
    throw new Error("Reflection not found");
  }

  // Check if user is authorized to delete
  if (reflection.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to delete this reflection");
  }

  await reflection.remove();
  res.json({ message: "Reflection deleted successfully" });
});

// @desc    Get paginated user reflections
// @route   GET /api/reflections/user/:userId
// @access  Private
const getUserReflections = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // Check if user is authorized to view reflections
  if (userId !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to view these reflections");
  }

  const reflections = await Reflection.getUserReflections(userId, page, limit);
  res.json(reflections);
});

// @desc    Get emotion trends for a user
// @route   GET /api/reflections/trends/:userId
// @access  Private
const getEmotionTrends = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { startDate, endDate } = req.query;

  // Check if user is authorized
  if (userId !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to view these trends");
  }

  // Validate dates
  const start = startDate ? new Date(startDate) : new Date(0);
  const end = endDate ? new Date(endDate) : new Date();

  if (isNaN(start) || isNaN(end)) {
    res.status(400);
    throw new Error("Invalid date format");
  }

  const trends = await Reflection.getEmotionTrends(userId, start, end);
  res.json(trends);
});

export {
  createReflection,
  getReflection,
  updateReflection,
  deleteReflection,
  getUserReflections,
  getEmotionTrends,
};