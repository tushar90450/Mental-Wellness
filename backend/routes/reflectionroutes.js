import express from "express";
import {
  createReflection,
  getReflection,
  updateReflection,
  deleteReflection,
  getUserReflections,
  getEmotionTrends,
} from "../controllers/reflection.controller.js";
import { protect } from "../middleware/authMiddleware.js"; // Assuming authentication middleware

const router = express.Router();

// Create a new reflection (authenticated)
router.post("/", protect, createReflection);

// Get a single reflection by ID
router.get("/:id", protect, getReflection);

// Update a reflection by ID
router.put("/:id", protect, updateReflection);

// Delete a reflection by ID
router.delete("/:id", protect, deleteReflection);

// Get paginated user reflections
router.get("/user/:userId", protect, getUserReflections);

// Get emotion trends for a user
router.get("/trends/:userId", protect, getEmotionTrends);

export default router;