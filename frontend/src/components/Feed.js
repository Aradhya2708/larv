// src/components/Feed.js
import React from "react";
import Post from "./Post";

const Feed = ({ posts, onVote }) => {
    return (
      <div>
        {posts.map((post) => (
          <Post key={post.id} post={post} onVote={onVote} />
        ))}
      </div>
    );
  };
  

export default Feed;
