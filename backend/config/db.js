import mongoose from "mongoose";
import { createLogger, format, transports } from "winston"; // For structured logging

// Initialize logger
const logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    ...(process.env.NODE_ENV === "production"
      ? [new transports.File({ filename: "logs/db.log" })]
      : []),
  ],
});

// Validate environment variables
const validateEnvVars = () => {
  const requiredVars = {
    MONGO_URI: process.env.MONGO_URI,
  };
  const optionalVars = {
    MONGO_MAX_POOL_SIZE: process.env.MONGO_MAX_POOL_SIZE || "10",
    MONGO_MAX_RETRIES: process.env.MONGO_MAX_RETRIES || "5",
    MONGO_BASE_RETRY_DELAY: process.env.MONGO_BASE_RETRY_DELAY || "1000",
  };

  // Check required variables
  for (const [key, value] of Object.entries(requiredVars)) {
    if (!value) {
      logger.error(`${key} is not defined in environment variables`);
      process.exit(1);
    }
  }

  // Validate optional variables (ensure they are valid numbers)
  for (const [key, value] of Object.entries(optionalVars)) {
    if (isNaN(parseInt(value, 10)) || parseInt(value, 10) <= 0) {
      logger.error(`${key} must be a positive number, got: ${value}`);
      process.exit(1);
    }
  }

  return {
    MONGO_URI: requiredVars.MONGO_URI,
    MONGO_MAX_POOL_SIZE: parseInt(optionalVars.MONGO_MAX_POOL_SIZE, 10),
    MONGO_MAX_RETRIES: parseInt(optionalVars.MONGO_MAX_RETRIES, 10),
    MONGO_BASE_RETRY_DELAY: parseInt(optionalVars.MONGO_BASE_RETRY_DELAY, 10),
  };
};

// Production-ready MongoDB connection function
const connectDB = async () => {
  const { MONGO_URI, MONGO_MAX_POOL_SIZE, MONGO_MAX_RETRIES, MONGO_BASE_RETRY_DELAY } =
    validateEnvVars();

  // Mongoose connection options
  const options = {
    maxPoolSize: MONGO_MAX_POOL_SIZE, // Connection pool size
    serverSelectionTimeoutMS: 5000, // Timeout for server selection
    connectTimeoutMS: 10000, // Timeout for initial connection
    socketTimeoutMS: 45000, // Timeout for operations
    family: 4, // Prefer IPv4 (configurable for IPv6 if needed)
    autoIndex: process.env.NODE_ENV !== "production", // Disable auto-indexing in production
    retryWrites: true, // Enable retryable writes for transactions
    w: "majority", // Write concern for data durability
  };

  // Exponential backoff retry logic
  let attempt = 1;
  const MAX_BACKOFF = 30000; // Cap backoff at 30 seconds

  while (attempt <= MONGO_MAX_RETRIES) {
    try {
      const conn = await mongoose.connect(MONGO_URI, options);
      logger.info(`MongoDB Connected: ${conn.connection.host}:${conn.connection.port}`);
      break; // Exit loop on successful connection
    } catch (err) {
      logger.error(`MongoDB connection attempt ${attempt}/${MONGO_MAX_RETRIES} failed: ${err.message}`);
      if (attempt === MONGO_MAX_RETRIES) {
        logger.error("Max retries reached. Exiting process.");
        process.exit(1);
      }

      // Calculate exponential backoff with jitter
      const backoff = Math.min(MONGO_BASE_RETRY_DELAY * 2 ** (attempt - 1), MAX_BACKOFF);
      const jitter = Math.random() * 100; // Add up to 100ms jitter
      logger.info(`Retrying in ${(backoff + jitter) / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, backoff + jitter));
      attempt++;
    }
  }

  // Handle connection errors after initial connection
  mongoose.connection.on("error", (err) => {
    logger.error(`MongoDB connection error: ${err.message}`);
  });

  // Handle reconnection events
  mongoose.connection.on("reconnected", () => {
    logger.info("MongoDB reconnected successfully");
  });

  // Handle disconnection events
  mongoose.connection.on("disconnected", () => {
    logger.warn("MongoDB disconnected");
  });
};

// Graceful shutdown handler
const gracefulShutdown = async () => {
  try {
    await mongoose.connection.close();
    logger.info("MongoDB connection closed gracefully");
    process.exit(0);
  } catch (err) {
    logger.error(`Error during MongoDB disconnection: ${err.message}`);
    process.exit(1);
  }
};

// Register shutdown handlers
process.on("SIGINT", gracefulShutdown); // Ctrl+C
process.on("SIGTERM", gracefulShutdown); // Termination signal

export default connectDB;