import express from "express";
import * as userController from "../controllers/user.controller.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// User registration
router.post("/register", userController.registerUser);

// User login
router.post("/login", userController.loginUser);

// Get current user profile (authenticated)
router.get("/profile", protect, userController.getUserProfile);

// Update user profile (authenticated)
router.put("/profile", protect, userController.updateUserProfile);

// Delete user account (authenticated)
router.delete("/profile", protect, userController.deleteUser);

// Get user analytics (admin only)
router.get("/analytics", protect, adminOnly, userController.getUserAnalytics);

export default router;
