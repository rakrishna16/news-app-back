import express from "express";
import { forgotPassword, mailNotification,getUser, loginUser, registerUser, resetPassword, setpushNotifcation, sendNotification } from "../Controllers/authController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/register",registerUser);
router.post("/login", loginUser);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password/:id/:token",resetPassword);
router.post("/mailsend",mailNotification);
// router.post("/send-notification",setpushNotifcation);
router.post("/send-notification",sendNotification);
router.get("/getuser/:token",getUser);

export default router;