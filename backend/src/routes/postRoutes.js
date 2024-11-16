import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { upvotePost, downvotePost  ,
    removePost,
    approvePost, getByPopular
 } from "../controllers/postController.js";

const router = express.Router();
router.post("/:postId/upvote", authMiddleware, upvotePost);
router.post("/:postId/downvote", authMiddleware, downvotePost);

router.get("/", getByPopular);
router.post("/:postId/remove", authMiddleware, removePost);
router.post("/:postId/approve", authMiddleware, approvePost);

export default router;
