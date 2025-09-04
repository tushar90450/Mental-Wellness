import express from "express";
import {
  createWisdom,
  getWisdomById,
  getWisdomByTags,
  incrementWisdomUsage,
  searchWisdomByEmbedding,
} from "../controllers/wisdom.controller.js";

const router = express.Router();

router.post("/", createWisdom);
router.get("/:id", getWisdomById);
router.get("/", getWisdomByTags); // ?tags=zen,stoicism&page=1&limit=10
router.post("/:id/increment-usage", incrementWisdomUsage);
router.post("/search/embedding", searchWisdomByEmbedding);

export default router;
