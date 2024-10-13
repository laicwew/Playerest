import express from "express";
import {
  getAllUsersHandler,
  registerHandler,
  registerConfirmHandler,
  loginAuthHandler,
} from "../controllers/userController";

const router = express();

router.get("/", getAllUsersHandler);

router.post("/register", registerHandler);
router.post("/registerconfirm", registerConfirmHandler);
router.post("/login", loginAuthHandler);

export default router;
