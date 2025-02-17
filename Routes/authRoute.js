import express from "express";
import { forgotPassword,apiKeyFire, mailNotification,getUser, loginUser, registerUser, resetPassword, setpushNotifcation } from "../Controllers/authController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/register",registerUser);
router.post("/login", loginUser);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password/:id/:token",resetPassword);
router.post("/mailsend",mailNotification);
router.post("/send-notification",setpushNotifcation);
router.get("/getuser/:token",getUser);
router.get("/apikey",apiKeyFire);

export default router;