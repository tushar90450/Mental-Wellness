import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // For generating session tokens
import sanitizeHtml from "sanitize-html";
import net from "net";


// Environment variables (ensure to set these in your .env file)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

const normalizeIp = (ip) => {
  if (!ip) return "127.0.0.1";
  if (ip === "::1") return "127.0.0.1"; // IPv6 localhost → IPv4
  return net.isIP(ip) ? ip : "127.0.0.1"; // Fallback if invalid
};

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, avatarUrl, preferences } = req.body;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create new user
    const user = new User({
      name: name ? sanitizeHtml(name, { allowedTags: [] }) : undefined,
      email: email.toLowerCase(),
      passwordHash: password, // Will be hashed by pre-save hook
      avatarUrl,
      preferences: {
        language: preferences?.language || "en",
        theme: preferences?.theme || "system",
        notifications: {
          email: preferences?.notifications?.email ?? true,
          push: preferences?.notifications?.push ?? false,
        },
      },
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "30d",
    });

    user.sessions.push({
      device: sanitizeHtml(req.headers["user-agent"] || "Unknown", { allowedTags: [] }),
      ip: normalizeIp(req.ip),
      token,
    });

    await user.save();


    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findByEmail(email);
    if (!user || user.status !== "active") {
      return res.status(401).json({ message: "Invalid credentials or inactive account" });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "30d",
    });

    // Update last login
    user.lastLoginAt = new Date();

    // Add session
    user.sessions.push({
      device: sanitizeHtml(req.headers["user-agent"] || "Unknown", { allowedTags: [] }),
      ip: normalizeIp(req.ip),
      token,
    });


    await user.save();

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Get user profile (requires authentication)
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-passwordHash -sessions.token");
    if (!user || user.status !== "active") {
      return res.status(404).json({ message: "User not found or inactive" });
    }
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      preferences: user.preferences,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      lastLoginAt: user.lastLoginAt,
      reflectionsCount: user.reflectionsCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
};

// Update user profile (requires authentication)
export const updateUserProfile = async (req, res) => {
  try {
    const { name, avatarUrl, preferences } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user || user.status !== "active") {
      return res.status(404).json({ message: "User not found or inactive" });
    }

    // Update fields
    if (name) user.name = sanitizeHtml(name, { allowedTags: [] });
    if (avatarUrl) user.avatarUrl = avatarUrl;
    if (preferences) {
      if (preferences.language) user.preferences.language = preferences.language;
      if (preferences.theme) user.preferences.theme = preferences.theme;
      if (preferences.notifications) {
        user.preferences.notifications.email = preferences.notifications.email ?? user.preferences.notifications.email;
        user.preferences.notifications.push = preferences.notifications.push ?? user.preferences.notifications.push;
      }
    }

    await user.save();
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
};

// Delete user account (requires authentication)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.status !== "active") {
      return res.status(404).json({ message: "User not found or already deleted" });
    }

    user.status = "deleted";
    user.sessions = []; // Clear sessions
    await user.save();
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting account", error: error.message });
  }
};

// Get user analytics (requires admin role)
export const getUserAnalytics = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const { startDate, endDate } = req.query;
    const analytics = await User.getUserAnalytics(
      startDate ? new Date(startDate) : new Date(0),
      endDate ? new Date(endDate) : new Date()
    );
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: "Error fetching analytics", error: error.message });
  }
};