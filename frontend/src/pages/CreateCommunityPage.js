// src/pages/CreateCommunityPage.js
import React, { useState } from "react";
import { createCommunity } from "../api"; // Import the createCommunity function

const CreateCommunityPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateCommunity = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Please fill in both the title and description!");
      return;
    }

    try {
      // Call createCommunity API function to simulate community creation
      const response = await createCommunity(title, description);
      alert("Community created successfully!");
      console.log("Community details:", response); // Simulate logging the community creation
      // Redirect or reset the form as necessary
    } catch (error) {
      console.error("Error creating community:", error);
      alert("Error creating community. Please try again.");
    }
  };

  return (
    <div>
      <h1>Create New Community</h1>
      <form onSubmit={handleCreateCommunity}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="Enter community title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            placeholder="Enter community description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Create Community</button>
      </form>
    </div>
  );
};

export default CreateCommunityPage;
