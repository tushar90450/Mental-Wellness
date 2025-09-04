import VoiceSession from "../models/VoiceSession.js";
import { v4 as uuidv4 } from "uuid";

/**
 * Unified response helper
 */
const sendResponse = (res, status, success, data = null, error = null, meta = {}) => {
  return res.status(status).json({
    success,
    data,
    error,
    meta: {
      requestId: meta.requestId || uuidv4(),
      timestamp: new Date().toISOString(),
      ...meta,
    },
  });
};

/**
 * Async wrapper to avoid repetitive try/catch
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch((err) =>
    sendResponse(res, 500, false, null, err.message)
  );

/**
 * Create a new voice session
 */
export const createVoiceSession = asyncHandler(async (req, res) => {
  const session = new VoiceSession(req.body);
  await session.save();

  return sendResponse(res, 201, true, session.toObject({ versionKey: false }), null, {
    message: "Voice session created successfully",
  });
});

/**
 * Get voice session by ID
 */
export const getVoiceSessionById = asyncHandler(async (req, res) => {
  const session = await VoiceSession.findById(req.params.id)
    .populate("user", "username email")
    .populate("reflection", "text meaning")
    .select("-__v")
    .lean();

  if (!session) {
    return sendResponse(res, 404, false, null, "Voice session not found");
  }

  return sendResponse(res, 200, true, session, null, {
    message: "Voice session retrieved successfully",
  });
});

/**
 * Get user voice sessions with pagination, filtering & sorting
 */
export const getUserVoiceSessions = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit) || 10, 100);
  const skip = (page - 1) * limit;

  const { status, sortBy = "createdAt", order = "desc" } = req.query;

  const filter = { user: req.params.userId };
  if (status) filter.status = status;

  const sessions = await VoiceSession.find(filter)
    .sort({ [sortBy]: order === "asc" ? 1 : -1 })
    .skip(skip)
    .limit(limit)
    .select("-__v")
    .lean();

  const total = await VoiceSession.countDocuments(filter);

  return sendResponse(res, 200, true, {
    sessions,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
});

/**
 * Update a voice session
 */
export const updateVoiceSession = asyncHandler(async (req, res) => {
  const session = await VoiceSession.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .select("-__v")
    .lean();

  if (!session) {
    return sendResponse(res, 404, false, null, "Voice session not found");
  }

  return sendResponse(res, 200, true, session, null, {
    message: "Voice session updated successfully",
  });
});

/**
 * Delete a voice session
 */
export const deleteVoiceSession = asyncHandler(async (req, res) => {
  const session = await VoiceSession.findByIdAndDelete(req.params.id)
    .select("-__v")
    .lean();

  if (!session) {
    return sendResponse(res, 404, false, null, "Voice session not found");
  }

  return sendResponse(res, 200, true, { message: "Voice session deleted" });
});

/**
 * Retry failed sessions
 */
export const retryFailedSessions = asyncHandler(async (req, res) => {
  const result = await VoiceSession.retryFailedSessions();
  return sendResponse(res, 200, true, result, null, {
    message: "Failed sessions reset to pending",
  });
});

/**
 * Get pipeline status analytics
 */
export const getStatusAnalytics = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return sendResponse(res, 400, false, null, "Start and end dates are required");
  }

  const analytics = await VoiceSession.getStatusAnalytics(
    new Date(startDate),
    new Date(endDate)
  );

  return sendResponse(res, 200, true, analytics, null, {
    message: "Pipeline analytics generated successfully",
    range: { startDate, endDate },
  });
});
