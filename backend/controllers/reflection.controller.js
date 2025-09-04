import Reflection from "../models/Reflection.js";

/**
 * Standardized response helper
 */
const sendResponse = (res, status, success, data = null, error = null) => {
  return res.status(status).json({ success, data, error });
};

/**
 * Create a new reflection
 */
export const createReflection = async (req, res) => {
  try {
    const reflection = new Reflection(req.body);
    await reflection.save();
    return sendResponse(res, 201, true, reflection);
  } catch (error) {
    return sendResponse(res, 400, false, null, error.message);
  }
};

/**
 * Get reflection by ID
 */
export const getReflectionById = async (req, res) => {
  try {
    const reflection = await Reflection.findById(req.params.id)
      .populate("user", "username email")
      .populate("wisdomReference", "source text")
      .lean();

    if (!reflection) {
      return sendResponse(res, 404, false, null, "Reflection not found");
    }

    return sendResponse(res, 200, true, reflection);
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message);
  }
};

/**
 * Get reflections by user (with pagination)
 */
export const getUserReflections = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 100); // max 100
    const reflections = await Reflection.getUserReflections(
      req.params.userId,
      page,
      limit
    );
    return sendResponse(res, 200, true, reflections);
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message);
  }
};

/**
 * Get emotion trends in a date range
 */
export const getEmotionTrends = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return sendResponse(res, 400, false, null, "Start and end dates required");
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return sendResponse(res, 400, false, null, "Invalid date format");
    }

    const trends = await Reflection.getEmotionTrends(
      req.params.userId,
      start,
      end
    );
    return sendResponse(res, 200, true, trends);
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message);
  }
};

/**
 * Update a reflection
 */
export const updateReflection = async (req, res) => {
  try {
    const reflection = await Reflection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).lean();

    if (!reflection) {
      return sendResponse(res, 404, false, null, "Reflection not found");
    }

    return sendResponse(res, 200, true, reflection);
  } catch (error) {
    return sendResponse(res, 400, false, null, error.message);
  }
};

/**
 * Delete a reflection
 */
export const deleteReflection = async (req, res) => {
  try {
    const reflection = await Reflection.findByIdAndDelete(req.params.id).lean();

    if (!reflection) {
      return sendResponse(res, 404, false, null, "Reflection not found");
    }

    return sendResponse(res, 200, true, { message: "Reflection deleted" });
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message);
  }
};
