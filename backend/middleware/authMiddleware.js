import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Environment variable for JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

// Authentication middleware to protect routes
export const protect = async (req, res, next) => {
  try {
    // Extract token from Authorization header (Bearer token)
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    const { userId, role } = decoded;

    // Find user and validate session
    const user = await User.findById(userId);
    if (!user || user.status !== "active") {
      return res.status(401).json({ message: "User not found or inactive" });
    }

    // Check if token exists in user's sessions
    const session = user.sessions.find((s) => s.token === token);
    if (!session) {
      return res.status(401).json({ message: "Invalid or expired session" });
    }

    // Attach user info to request object
    req.user = { userId, role };

    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(500).json({ message: "Authentication error", error: error.message });
  }
};

// Admin-only middleware
export const adminOnly = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access required" });
  }
};