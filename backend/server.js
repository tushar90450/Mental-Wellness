import express from "express";
import dotenv from "dotenv";
import helmet from "helmet"; // For security headers
import cors from "cors"; // For CORS configuration
import compression from "compression"; // For response compression
import rateLimit from "express-rate-limit"; // For rate limiting
import { createLogger, format, transports } from "winston"; // For structured logging
import connectDB from "./config/db.js";

// Import routes
import reflectionRoutes from "./routes/reflectionRoutes.js";
import voiceSessionRoutes from "./routes/voiceSessionRoutes.js";
import cluster from "cluster";
import os from "os";

// Initialize environment variables
dotenv.config();

// Initialize logger
const logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    ...(process.env.NODE_ENV === "production"
      ? [new transports.File({ filename: "logs/server.log" })]
      : []),
  ],
});

// Validate critical environment variables
const validateEnvVars = () => {
  const requiredVars = {
    PORT: process.env.PORT || "5000",
    NODE_ENV: process.env.NODE_ENV || "development",
    CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000", // Default for dev
  };

  for (const [key, value] of Object.entries(requiredVars)) {
    if (!value) {
      logger.error(`${key} is not defined in environment variables`);
      process.exit(1);
    }
  }

  return requiredVars;
};

const { PORT, CORS_ORIGIN } = validateEnvVars();

// Initialize Express app
const app = express();

// Security middleware
app.use(helmet()); // Set secure HTTP headers
app.use(
  cors({
    origin: CORS_ORIGIN.split(","), // Allow multiple origins (e.g., "http://example.com,https://aaina.app")
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Performance middleware
app.use(compression()); // Compress responses for faster delivery
app.use(express.json({ limit: "10mb" })); // Limit payload size
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Support URL-encoded bodies

// Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api/", limiter);

// Health check endpoint
app.get("/health", (req, res) => {
  const healthStatus = {
    status: "ok",
    uptime: process.uptime(),
    mongodb: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  };
  res.status(200).json(healthStatus);
});

// Base route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Aaina API is running" });
});

// API routes
app.use("/api/reflections", reflectionRoutes);
app.use("/api/voice-sessions", voiceSessionRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`, { stack: err.stack, path: req.path, method: req.method });
  res.status(err.status || 500).json({
    error: {
      message: process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message,
    },
  });
});

// Clustering for multi-core CPU utilization
const numCPUs = os.cpus().length;
if (process.env.NODE_ENV === "production" && cluster.isMaster) {
  logger.info(`Master process ${process.pid} is running`);

  // Fork workers for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Handle worker exit
  cluster.on("exit", (worker, code, signal) => {
    logger.warn(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
    logger.info("Starting a new worker...");
    cluster.fork();
  });
} else {
  // Worker process: Start the server
  const startServer = async () => {
    try {
      await connectDB(); // Connect to MongoDB
      app.listen(PORT, () => {
        logger.info(`Worker ${process.pid} running on port ${PORT}`);
      });
    } catch (err) {
      logger.error(`Failed to start server: ${err.message}`);
      process.exit(1);
    }
  };

  startServer();
}

// Graceful shutdown
const gracefulShutdown = async () => {
  logger.info("Received shutdown signal. Closing server...");
  try {
    await mongoose.connection.close();
    logger.info("MongoDB connection closed");
    process.exit(0);
  } catch (err) {
    logger.error(`Error during shutdown: ${err.message}`);
    process.exit(1);
  }
};

// Register shutdown handlers
process.on("SIGINT", gracefulShutdown); // Ctrl+C
process.on("SIGTERM", gracefulShutdown); // Termination signal