import express from "express";
import {
  getAllCommentsHandler,
  getCommentsByReviewIdHandler,
} from "../controllers/commentController";

const router = express();

router.get("/", getAllCommentsHandler);

router.post("/review", getCommentsByReviewIdHandler);

export default router;
