// src/pages/CommunityPage.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCommunityPosts, createPost, joinCommunity, leaveCommunity, addModerator } from "../api.js"; // Imported API functions

const CommunityPage = () => {
  const { communityName } = useParams(); // Get the community name from the URL
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [isMember, setIsMember] = useState(false); // Track whether the user is a member
  const [isModerator, setIsModerator] = useState(false); // Check if user is a moderator
  const [community, setCommunity] = useState(null); // Store community details
  const navigate = useNavigate();

  // Fetch posts specific to this community
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getCommunityPosts(communityName); // Get posts from the API
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts for the community:", error);
      }
    };

    const fetchCommunityDetails = async () => {
      try {
        const response = await getCommunityPosts(communityName);
        setCommunity(response.data);
      } catch (error) {
        console.error("Error fetching community details:", error);
      }
    };

    const checkMembership = async () => {
      // try {
      //   // Simulate checking if the user is a member of the community
      //   const response = await getUserRoleInCommunity(communityName);
      //   setIsMember(response.data.isMember); // Update based on real check
      // } catch (error) {
      //   console.error("Error checking membership:", error);
      //   setIsMember(false); // Default to false if error occurs
      // }

      setIsMember(false);
    };

    const checkModeratorship = async () => {
      // try {
      //   const response = await getUserRoleInCommunity(communityName);
      //   setIsModerator(response.data.isModerator); // Update state based on response
      // } catch (error) {
      //   console.error("Error checking moderatorship:", error);
      //   setIsModerator(false); // Default to false if there is an error
      // }

      setIsModerator(true);
    };

    fetchPosts();
    fetchCommunityDetails();
    checkMembership();
    checkModeratorship();
  }, [communityName]);

  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (!newPost.trim()) {
      alert("Please enter a post content.");
      return;
    }

    try {
      // Create a new post in the community
      const response = await createPost(communityName, newPost);
      setPosts([...posts, response.data]); // Add the new post to the list
      setNewPost(""); // Reset the input field
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleRemovePost = async (postId) => {
    // Implement post removal logic here
    console.log("Removing post:", postId);
  };

  const handleJoinCommunity = async () => {
    try {
      await joinCommunity(communityName);
      setIsMember(true); // User has joined the community
    } catch (error) {
      console.error("Error joining community:", error);
    }
  };

  const handleLeaveCommunity = async () => {
    try {
      await leaveCommunity(communityName);
      setIsMember(false); // User has left the community
    } catch (error) {
      console.error("Error leaving community:", error);
    }
  };

  // Handle adding a new moderator
  const handleAddModerator = (memberUsername) => {
    addModerator(communityName, memberUsername)
      .then(() => {
        alert(`${memberUsername} has been added as a moderator.`);
      })
      .catch((error) => {
        console.error("Error adding moderator:", error);
      });
  };

  return (
    <div>
      <h1>{communityName} Community</h1>
      <p>{community?.description}</p>

      {/* Show Join Community button if the user is not a member */}
      {!isMember && (
        <button onClick={handleJoinCommunity}>Join Community</button>
      )}

      {/* Show Leave Community button if the user is a member */}
      {isMember && (
        <button onClick={handleLeaveCommunity}>Leave Community</button>
      )}

      {/* Show moderator options if the user is a moderator */}
      {isModerator && (
        <div>
          <h3>Moderator Actions</h3>
          <div>
            <label>
              Add a new moderator:
              <input
                type="text"
                placeholder="Enter member's username"
                id="addModeratorInput"
              />
              <button
                onClick={() =>
                  handleAddModerator(document.getElementById("addModeratorInput").value)
                }
              >
                Add as Moderator
              </button>
            </label>
          </div>
        </div>
      )}

      {/* Show post creation option if the user is a member */}
      {isMember && (
        <div>
          <h3>Create a New Post</h3>
          <form onSubmit={handleCreatePost}>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Write your post here"
              rows="4"
              cols="50"
            />
            <button type="submit">Post</button>
          </form>
        </div>
      )}

      <div>
        <h2>Posts</h2>
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <p>{post.content}</p>
                {/* Show Remove Post button if the user is a moderator */}
                {isModerator && (
                  <button onClick={() => handleRemovePost(post.id)}>Remove Post</button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;
