import express from "express";
import dotenv from "dotenv";
import connectDB from "./backend/config/db.js";

// Import routes
import reflectionRoutes from "./backend/routes/reflectionroutes.js";
import voiceSessionRoutes from "./backend/routes/voiceSessionRoutes.js";

dotenv.config();
const app = express();

// Body parser
app.use(express.json());

// Connect DB
connectDB();

// Base route
app.get("/", (req, res) => {
  res.send("API running...");
});

// Use routes
app.use("/api/reflections", reflectionRoutes);
app.use("/api/voice-sessions", voiceSessionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
