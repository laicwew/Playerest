import express from "express";
import {
  getAllCommentsHandler,
  getCommentsByReviewIdHandler,
  addCommentHandler,
} from "../controllers/commentController";

const router = express();

router.get("/", getAllCommentsHandler);

router.post("/review", getCommentsByReviewIdHandler);
router.post("/add", addCommentHandler);

export default router;
