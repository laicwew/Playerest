import express from "express";
import {
  getAllUsersHandler,
  registerHandler,
  registerConfirmHandler,
  loginAuthHandler,
  resendConfirmationCodeHandler,
} from "../controllers/userController";

const router = express();

router.get("/", getAllUsersHandler);

router.post("/register", registerHandler);
router.post("/registerconfirm", registerConfirmHandler);
router.post("/resendconfirm", resendConfirmationCodeHandler);
router.post("/login", loginAuthHandler);

export default router;
