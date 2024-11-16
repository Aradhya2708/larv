import Post from "../models/postModel.js";

  
  // Remove a post
  export const removePost = async (req, res) => {
    const { postId } = req.params;
    try {
      await Post.findByIdAndDelete(postId);
      res.status(200).json({ message: `Post ${postId} removed` });
    } catch (err) {
      res.status(500).json({ message: "Error removing post" });
    }
  };
  
  // Approve a post
  export const approvePost = async (req, res) => {
    const { postId } = req.params;
    try {
      const post = await Post.findById(postId);
      if (!post) return res.status(404).json({ message: "Post not found" });
  
      post.isApproved = true;
      await post.save();
  
      res.status(200).json({ message: `Post ${postId} approved` });
    } catch (err) {
      res.status(500).json({ message: "Error approving post" });
    }
  };
    
export const upvotePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.upvotes.push(req.user.id);
    await post.save();

    res.status(200).json({ message: "Post upvoted" });
  } catch (err) {
    res.status(500).json({ message: "Error upvoting post" });
  }
};

export const downvotePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.downvotes.push(req.user.id);
    await post.save();

    res.status(200).json({ message: "Post downvoted" });
  } catch (err) {
    res.status(500).json({ message: "Error downvoting post" });
  }
};

export const getByPopular = async (req, res) => {
    try {
      const posts = await Post.find();
      res.status(200).json({ posts });
    } catch (err) {
      res.status(500).json({ message: "Error fetching communities" });
    }
  };
