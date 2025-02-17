import express from "express";
import { getLiked, removeLiked, userLiked } from "../Controllers/likedController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();


router.post("/createlike",authMiddleware,userLiked);
router.get("/getliked",authMiddleware,getLiked);
router.delete("/removeliked", removeLiked);

export default router;