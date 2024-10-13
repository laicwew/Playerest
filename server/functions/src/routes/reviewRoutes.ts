import express from "express";
import {
  getAllReviewsHandler,
  getReviewByIdHandler,
  addReviewHandler,
  getReviewsByAuthorHandler,
  searchReviewsHandler,
  uploadImageHandler,
} from "../controllers/reviewController";
import {uploadImage} from "../services/s3Service";

const router = express();

router.get("/", getAllReviewsHandler);
router.post("/add", addReviewHandler);
router.post("/by-author", getReviewsByAuthorHandler);
router.post("/search", searchReviewsHandler);
router.post("/:id", getReviewByIdHandler);

router.post("/upload", uploadImage.single("image"), uploadImageHandler);

export default router;
