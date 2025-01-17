import express from "express";
import { forgotPassword, mailNotification, loginUser, registerUser, resetPassword, setpushNotifcation } from "../Controllers/authController.js";

const router = express.Router();

router.post("/register",registerUser);
router.post("/login", loginUser);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password/:id/:token",resetPassword);
router.post("/mailsend",mailNotification);
router.post("/pushnotification",setpushNotifcation);


export default router;