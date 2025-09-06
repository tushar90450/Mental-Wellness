import express from "express";
import {
  createWisdom,
  getAllWisdom,
  getWisdomById,
  updateWisdom,
  deleteWisdom,
  getWisdomByTags,
  incrementWisdomUsage,
  findWisdomByEmbedding,
} from "../controllers/wisdom.controller.js";

const router = express.Router();

// Create a new wisdom entry
router.post("/", createWisdom);

// Get all wisdom entries with pagination
router.get("/", getAllWisdom);

// Get a single wisdom entry by ID
router.get("/:id", getWisdomById);

// Update a wisdom entry
router.put("/:id", updateWisdom);

// Delete a wisdom entry
router.delete("/:id", deleteWisdom);

// Get wisdom entries by tags with pagination
router.get("/tags/:tags", getWisdomByTags);

// Increment usage count for a wisdom entry
router.patch("/usage/:id", incrementWisdomUsage);

// Find wisdom entries by embedding (similarity search)
router.post("/search/embedding", findWisdomByEmbedding);

export default router;