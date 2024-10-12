import express from "express";
import {
  storeDraftHandler,
  publishDraftHandler,
} from "../controllers/draftController";

const router = express();

router.post("/store", storeDraftHandler);

router.post("/publish", publishDraftHandler);

export default router;
