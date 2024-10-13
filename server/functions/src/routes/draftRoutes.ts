import express from "express";
import {
  storeDraftHandler,
  publishDraftHandler,
  getDraftsByUserNameHandler,
} from "../controllers/draftController";

const router = express();

router.post("/store", storeDraftHandler);
router.post("/publish", publishDraftHandler);
router.get("/user/:userId", getDraftsByUserNameHandler);

export default router;
