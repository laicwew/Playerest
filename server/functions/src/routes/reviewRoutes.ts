import express from "express";
import {
  getAllReviewsHandler,
  getReviewByIdHandler,
  addReviewHandler,
  getReviewsByAuthorHandler,
  searchReviewsHandler,
  uploadImageHandler,
  fetchReviewsHandler,
  deleteReviewHandler,
} from "../controllers/reviewController";
import {uploadImage} from "../services/s3Service";

const router = express();

router.get("/", getAllReviewsHandler);
router.get("/:id", getReviewByIdHandler);
router.get("/paginated", fetchReviewsHandler);

router.post("/add", addReviewHandler);
router.post("/upload", uploadImage.single("image"), uploadImageHandler);
router.post("/by-author", getReviewsByAuthorHandler);
router.post("/search", searchReviewsHandler);

router.delete("/:id", deleteReviewHandler);

export default router;
