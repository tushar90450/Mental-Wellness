import mongoose from "mongoose";
import Wisdom from "../models/Wisdom.js"; // Import the Wisdom model
import sanitizeHtml from "sanitize-html"; // Corrected from sanitize-htmlKim
import asyncHandler from "express-async-handler"; // Import asyncHandler

// Create a new wisdom entry
export const createWisdom = asyncHandler(async (req, res) => {
  const { source, text, meaning, tags, embedding, attribution } = req.body;

  // Sanitize inputs
  const sanitizedData = {
    source: sanitizeHtml(source, { allowedTags: [], allowedAttributes: {} }),
    text: sanitizeHtml(text, { allowedTags: [], allowedAttributes: {} }),
    meaning: meaning ? sanitizeHtml(meaning, { allowedTags: [], allowedAttributes: {} }) : undefined,
    tags: tags ? tags.map(tag => tag.toLowerCase().trim()) : [],
    embedding: embedding || [],
    attribution: attribution
      ? {
          author: attribution.author
            ? sanitizeHtml(attribution.author, { allowedTags: [], allowedAttributes: {} })
            : undefined,
          reference: attribution.reference
            ? sanitizeHtml(attribution.reference, { allowedTags: [], allowedAttributes: {} })
            : undefined,
          link: attribution.link ? attribution.link : undefined,
        }
      : {},
  };

  const wisdom = new Wisdom(sanitizedData);
  const createdWisdom = await wisdom.save();
  res.status(201).json({
    success: true,
    data: createdWisdom,
  });
});

// Get all wisdom entries with pagination
export const getAllWisdom = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const wisdoms = await Wisdom.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Wisdom.countDocuments();
  res.json({
    success: true,
    data: wisdoms,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});

// Get a single wisdom entry by ID
export const getWisdomById = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid ID format");
  }

  const wisdom = await Wisdom.findById(req.params.id).lean();
  if (!wisdom) {
    res.status(404);
    throw new Error("Wisdom not found");
  }
  res.json({
    success: true,
    data: wisdom,
  });
});

// Update a wisdom entry
export const updateWisdom = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid ID format");
  }

  const { source, text, meaning, tags, embedding, attribution } = req.body;

  // Sanitize inputs
  const sanitizedData = {
    source: source ? sanitizeHtml(source, { allowedTags: [], allowedAttributes: {} }) : undefined,
    text: text ? sanitizeHtml(text, { allowedTags: [], allowedAttributes: {} }) : undefined,
    meaning: meaning ? sanitizeHtml(meaning, { allowedTags: [], allowedAttributes: {} }) : undefined,
    tags: tags ? tags.map(tag => tag.toLowerCase().trim()) : undefined,
    embedding: embedding || undefined,
    attribution: attribution
      ? {
          author: attribution.author
            ? sanitizeHtml(attribution.author, { allowedTags: [], allowedAttributes: {} })
            : undefined,
          reference: attribution.reference
            ? sanitizeHtml(attribution.reference, { allowedTags: [], allowedAttributes: {} })
            : undefined,
          link: attribution.link ? attribution.link : undefined,
        }
      : undefined,
  };

  const wisdom = await Wisdom.findByIdAndUpdate(
    req.params.id,
    { $set: sanitizedData },
    { new: true, runValidators: true }
  ).lean();

  if (!wisdom) {
    res.status(404);
    throw new Error("Wisdom not found");
  }
  res.json({
    success: true,
    data: wisdom,
  });
});

// Delete a wisdom entry
export const deleteWisdom = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid ID format");
  }

  const wisdom = await Wisdom.findByIdAndDelete(req.params.id).lean();
  if (!wisdom) {
    res.status(404);
    throw new Error("Wisdom not found");
  }
  res.json({
    success: true,
    data: { message: "Wisdom deleted successfully" },
  });
});

// Get wisdom entries by tags with pagination
export const getWisdomByTags = asyncHandler(async (req, res) => {
  const tags = req.params.tags.split(",").map(tag => tag.trim().toLowerCase());
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const wisdoms = await Wisdom.getWisdomByTags(tags, page, limit);
  const total = await Wisdom.countDocuments({ tags: { $in: tags } });

  res.json({
    success: true,
    data: wisdoms,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});

// Increment usage count for a wisdom entry
export const incrementWisdomUsage = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid ID format");
  }

  const wisdom = await Wisdom.incrementUsage(req.params.id);
  if (!wisdom) {
    res.status(404);
    throw new Error("Wisdom not found");
  }
  res.json({
    success: true,
    data: wisdom,
  });
});

// Find wisdom entries by embedding (similarity search)
export const findWisdomByEmbedding = asyncHandler(async (req, res) => {
  const { embedding } = req.body;
  if (!Array.isArray(embedding) || !embedding.every(v => typeof v === "number" && isFinite(v))) {
    res.status(400);
    throw new Error("Invalid embedding format");
  }

  const limit = parseInt(req.query.limit) || 5;
  const wisdoms = await Wisdom.findByEmbedding(embedding, limit);
  res.json({
    success: true,
    data: wisdoms,
  });
});