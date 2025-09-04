import User from "../models/User.js";

/**
 * Standardized response helper
 */
const sendResponse = (res, status, success, data = null, error = null) => {
  return res.status(status).json({ success, data, error });
};

/**
 * Create a new user
 */
export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    // Hide sensitive fields before sending response
    const userObj = user.toObject();
    delete userObj.password;

    return sendResponse(res, 201, true, userObj);
  } catch (error) {
    return sendResponse(res, 400, false, null, error.message);
  }
};

/**
 * Get user by ID
 */
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password -__v") // hide sensitive fields
      .lean();

    if (!user) {
      return sendResponse(res, 404, false, null, "User not found");
    }

    return sendResponse(res, 200, true, user);
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message);
  }
};

/**
 * Update user
 */
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true, context: "query" }
    )
      .select("-password -__v")
      .lean();

    if (!user) {
      return sendResponse(res, 404, false, null, "User not found");
    }

    return sendResponse(res, 200, true, user);
  } catch (error) {
    return sendResponse(res, 400, false, null, error.message);
  }
};

/**
 * Delete user
 */
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
      .select("-password -__v")
      .lean();

    if (!user) {
      return sendResponse(res, 404, false, null, "User not found");
    }

    return sendResponse(res, 200, true, { message: "User deleted" });
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message);
  }
};

/**
 * Get all users with pagination (optional feature)
 */
export const getAllUsers = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);

    const users = await User.find()
      .select("-password -__v")
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await User.countDocuments();

    return sendResponse(res, 200, true, {
      users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message);
  }
};
