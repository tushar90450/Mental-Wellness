import Wisdom from "../models/Wisdom.js";

/**
 * Helper for uniform responses
 */
const respond = (res, status, success, data = null, error = null) => {
  res.status(status).json({ success, data, error });
};

/**
 * Create wisdom entry
 */
export const createWisdom = async (req, res) => {
  try {
    const wisdom = await new Wisdom(req.body).save();
    return respond(res, 201, true, wisdom.toObject({ versionKey: false }));
  } catch (err) {
    return respond(res, 400, false, null, err.message);
  }
};

/**
 * Get wisdom by ID
 */
export const getWisdomById = async (req, res) => {
  try {
    const wisdom = await Wisdom.findById(req.params.id)
      .select("-__v")
      .lean();

    if (!wisdom) return respond(res, 404, false, null, "Wisdom not found");
    return respond(res, 200, true, wisdom);
  } catch (err) {
    return respond(res, 500, false, null, err.message);
  }
};

/**
 * Get wisdoms by tags with pagination
 */
export const getWisdomByTags = async (req, res) => {
  try {
    const { tags, page = 1, limit = 10 } = req.query;
    const parsedTags = tags ? tags.split(",").map(t => t.trim()) : [];

    const wisdoms = await Wisdom.getWisdomByTags(parsedTags, page, limit);
    const total = parsedTags.length
      ? await Wisdom.countDocuments({ tags: { $in: parsedTags } })
      : await Wisdom.estimatedDocumentCount();

    return respond(res, 200, true, {
      wisdoms,
      pagination: {
        total,
        page: +page,
        limit: +limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    return respond(res, 500, false, null, err.message);
  }
};

/**
 * Increment usage count
 */
export const incrementWisdomUsage = async (req, res) => {
  try {
    const wisdom = await Wisdom.incrementUsage(req.params.id);
    if (!wisdom) return respond(res, 404, false, null, "Wisdom not found");
    return respond(res, 200, true, wisdom);
  } catch (err) {
    return respond(res, 500, false, null, err.message);
  }
};

/**
 * Semantic search by embedding vector
 */
export const searchWisdomByEmbedding = async (req, res) => {
  try {
    const { embedding, limit = 5 } = req.body;

    if (!Array.isArray(embedding) || !embedding.length) {
      return respond(res, 400, false, null, "Embedding array required");
    }

    const results = await Wisdom.findByEmbedding(embedding, limit);

    return respond(res, 200, true, {
      querySize: embedding.length,
      limit,
      results,
    });
  } catch (err) {
    return respond(res, 500, false, null, err.message);
  }
};
