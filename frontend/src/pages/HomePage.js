import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyFeed, joinCommunity, leaveCommunity, getCommunities } from "../api.js";
import Feed from "../components/Feed.js";

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [communities, setCommunities] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCommunities, setFilteredCommunities] = useState([]);
    const navigate = useNavigate();

    // fetch posts 
    useEffect(() => {
        // Fetch posts
        getMyFeed()
            .then((response) => {
                setPosts(response.data.feed);
            })
            .catch((error) => console.error("Error fetching feed:", error));

        // Fetch communities from the API (simulated)
        getCommunities()
            .then((response) => {
                setCommunities(response.data);
            })
            .catch((error) => console.error("Error fetching communities:", error));
    }, []);


    useEffect(() => {
        // Filter communities based on searchTerm
        setFilteredCommunities(
            communities.filter((community) =>
                community.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, communities]);

    const handleJoinCommunity = async (communityName) => {
        try {
            await joinCommunity(communityName);
            alert(`Joined ${communityName}!`);
        } catch (error) {
            console.error("Error joining community:", error);
        }
    };

    const handleLeaveCommunity = async (communityName) => {
        try {
            await leaveCommunity(communityName);
            alert(`Left ${communityName}!`);
        } catch (error) {
            console.error("Error leaving community:", error);
        }
    };

    const handleVote = (updatedPost) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
        );
    };

    // Redirect to Create Community Page
    const handleCreateCommunityRedirect = () => {
        navigate("/create-community");
    };



    return (
        <div>
            <h1>My Feed</h1>
            <input
                type="text"
                placeholder="Search for communities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div>
                <h2>Communities</h2>
                <ul>
                    {filteredCommunities.map((community, index) => (
                        <li key={index}>
                            <span>{community.name} ({community.members} members)</span>
                            <button onClick={() => handleJoinCommunity(community.name)}>
                                Join
                            </button>
                            <button onClick={() => handleLeaveCommunity(community.name)}>
                                Leave
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Create New Community Button */}
            <div>
                <h2>Create a New Community</h2>
                <button onClick={handleCreateCommunityRedirect}>Create New Community</button>
            </div>

            {/* Render Posts */}
            <Feed posts={posts} onVote={handleVote} />
        </div>
    );
};


export default HomePage;
