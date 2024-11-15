import Community from "../models/communityModel.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";

// Create a new community
export const createCommunity = async (req, res) => {
  const { communityName, description, insta } = req.body;

  const nameRegex = /^[a-zA-Z0-9_-]+$/; // Only allows letters, numbers, underscores, and hyphens

  if (!communityName || !nameRegex.test(communityName)) {
    return res.status(400).json({ message: "Invalid community name. It should not contain spaces or special characters." });
  }

  try {
    // Check if a community with the same name already exists
    const existingCommunity = await Community.findOne({ name: communityName });
    if (existingCommunity) {
      return res.status(400).json({ message: "Community with the same name already exists" });
    }

    // Create a new community
    const newCommunity = new Community({
      name: communityName,
      description,
      insta,
      moderators: [req.user.id], // Automatically set the creator as a moderator
      members: [req.user.id],
    });

    await newCommunity.save();

    // Add the community to the user's `memberof` and `modof` lists
    const user = await User.findById(req.user.id);
    user.memberOf.push(newCommunity._id);
    user.modOf.push(newCommunity._id);
    await user.save();

    res.status(201).json({ message: `Community ${communityName} created successfully`, community: newCommunity });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating community" });
  }
};
  
// Join an existing community
export const joinCommunity = async (req, res) => {
    const { communityName } = req.params;
    try {
      const community = await Community.findOne({ name: communityName });
      if (!community) return res.status(404).json({ message: "Community not found" });
  
      // Check if user is already a member
      if (community.members.includes(req.user.id)) {
        return res.status(400).json({ message: "Already a member of this community" });
      }
  
      // Add user to the community's members
      community.members.push(req.user.id);
      await community.save();
  
      // Add community to user's `memberOf` list
      const user = await User.findById(req.user.id);
      user.memberOf.push(community._id);
      await user.save();
  
      res.status(200).json({ message: `Joined community ${communityName}` });
    } catch (err) {
      res.status(500).json({ message: "Error joining community" });
    }
  };

  // Leave a community
export const leaveCommunity = async (req, res) => {
    const { communityName } = req.params;
    try {
      const community = await Community.findOne({ name: communityName });
      if (!community) return res.status(404).json({ message: "Community not found" });
  
      // Remove user from the community's members
      community.members = community.members.filter(memberId => memberId.toString() !== req.user.id);
      await community.save();
  
      // Remove community from user's `memberOf` list
      const user = await User.findById(req.user.id);
      user.memberOf = user.memberOf.filter(commId => commId.toString() !== community._id.toString());
      await user.save();
  
      res.status(200).json({ message: `Left community ${communityName}` });
    } catch (err) {
      res.status(500).json({ message: "Error leaving community" });
    }
  };

  // Add a moderator to a community
export const addModerator = async (req, res) => {
    const { communityName } = req.params;
    const { userId } = req.body;
  
    try {
      const community = await Community.findOne({ name: communityName });
      if (!community) return res.status(404).json({ message: "Community not found" });
  
      // Check if the user is already a moderator
      if (community.moderators.includes(userId)) {
        return res.status(400).json({ message: "User is already a moderator" });
      }
  
      // Add the user as a moderator
      community.moderators.push(userId);
      await community.save();
  
      // Add community to user's `modOf` list
      const user = await User.findById(userId);
      user.modOf.push(community._id);
      await user.save();
  
      res.status(200).json({ message: "Moderator added successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error adding moderator" });
    }
  };

  
  export const addMember = async (req, res) => {
    const { communityName } = req.params;
    const { userId } = req.body;
  
    try {
      const community = await Community.findOne({ name: communityName });
      if (!community) return res.status(404).json({ message: "Community not found" });
  
      // Check if the user is already a moderator
      if (community.members.includes(userId)) {
        return res.status(400).json({ message: "User is already a member" });
      }
  
      // Add the user as a moderator
      community.members.push(userId);
      await community.save();
  
      // Add community to user's `modOf` list
      const user = await User.findById(userId);
      user.memberOf.push(community._id);
      await user.save();
  
      res.status(200).json({ message: "Moderator added successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error adding moderator" });
    }
  };

// Get all posts in a community
export const getCommunityPosts = async (req, res) => {
    const { communityName } = req.params;
    try {
        const community = await Community.findOne({ name: communityName });
        if (!community) return res.status(404).json({ message: "Community not found" });
    
        const posts = await Post.find({ community: community._id });
        res.status(200).json({ posts });
    } catch (err) {
        res.status(500).json({ message: "Error fetching posts" });
    }
};
    
// Get all communities
export const getAllCommunities = async (req, res) => {
    try {
      const communities = await Community.find();
      res.status(200).json({ communities });
    } catch (err) {
      res.status(500).json({ message: "Error fetching communities" });
    }
  };
  

  export const createPost = async (req, res) => {
    const {communityName}=req.params;
    const { content } = req.body;

    try {
      const community = await Community.findOne({ name: communityName });
      if (!community) return res.status(404).json({ message: "Community not found" });
  
      const post = new Post({ content, community: community._id, user: req.user.id });
      await post.save();
  
      res.status(201).json({ message: "Post created", post });
    } catch (err) {
      res.status(500).json({ message: "Error creating post" });
    }
  };
