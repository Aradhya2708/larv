import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
    createCommunity,
    joinCommunity,
    leaveCommunity,
    addModerator,
    getCommunityPosts,
    getAllCommunities,
    addMember,
    createPost,
  } from "../controllers/communityController.js";
  
const router = express.Router();

// Community Routes
router.post("/", authMiddleware, createCommunity);
router.post("/:communityName/join", authMiddleware, joinCommunity);
router.post("/:communityName/leave", authMiddleware, leaveCommunity);
router.post("/:communityName/add_mod", authMiddleware, addModerator);
router.post("/:communityName/add_mem", authMiddleware, addMember);
router.post("/:communityName/post", authMiddleware, createPost);

router.get("/:communityName/posts", authMiddleware, getCommunityPosts);

router.get("/all", authMiddleware, getAllCommunities);

export default router;
