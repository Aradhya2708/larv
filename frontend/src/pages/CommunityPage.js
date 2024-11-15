// src/pages/CommunityPage.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { joinCommunity, leaveCommunity } from "../api";

const CommunityPage = () => {
  const { community_name } = useParams();
  const [isJoined, setIsJoined] = useState(false);

  const handleJoin = () => {
    joinCommunity(community_name).then(() => setIsJoined(true));
  };

  const handleLeave = () => {
    leaveCommunity(community_name).then(() => setIsJoined(false));
  };

  return (
    <div>
      <h1>{community_name}</h1>
      {isJoined ? (
        <button onClick={handleLeave}>Leave Community</button>
      ) : (
        <button onClick={handleJoin}>Join Community</button>
      )}
    </div>
  );
};

export default CommunityPage;
