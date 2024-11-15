import React from "react";
import { upvotePost, downvotePost } from "../api";

const Post = ({ post, onVote }) => {
  const handleUpvote = async () => {
    try {
      const response = await upvotePost(post.id);
      console.log(response.data.message);
      onVote(response.data.post);
    } catch (error) {
      console.error("Error upvoting post:", error);
    }
  };

  const handleDownvote = async () => {
    try {
      const response = await downvotePost(post.id);
      console.log(response.data.message);
      onVote(response.data.post);
    } catch (error) {
      console.error("Error downvoting post:", error);
    }
  };

  return (
    <div>
      <h3>{post.content}</h3>
      <p>Votes: {post.votes}</p>
      <button onClick={handleUpvote}>Upvote</button>
      <button onClick={handleDownvote}>Downvote</button>
    </div>
  );
};

export default Post;
