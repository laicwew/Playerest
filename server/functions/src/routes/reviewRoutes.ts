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
router.post("/add", addReviewHandler);
router.post("/by-author", getReviewsByAuthorHandler);
router.post("/search", searchReviewsHandler);
router.post("/review/:id", getReviewByIdHandler);
router.get("/paginated", fetchReviewsHandler);
router.delete("/delete/:id", deleteReviewHandler);

router.post("/upload", uploadImage.single("image"), uploadImageHandler);

export default router;
