// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000", // Update with your backend URL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Auth API
// export const register = (data) => api.post("/register", data); // { username, email, password } = req.body
// export const login = (data) => api.post("/login", data); //  { username or email, password } = req.body
// export const logout = () => api.post("/logout"); 

// // Community API
// export const joinCommunity = (communityName) => api.post(`/community/${communityName}/join`); 
// export const leaveCommunity = (communityName) => api.post(`/community/${communityName}/leave`); 
// export const addModerator = (communityName, userId) => api.post(`/community/${communityName}/add_mod`, { userId }); { communityName } = req.params, { userId } = req.body
// export const createPost = (communityName, content) => api.post(`/community/${communityName}/post`, { content }); // dekh lena
// export const removePost = (communityName, postId) => api.post(`/community/${communityName}/remove`, { postId }); 
// export const approvePost = (communityName, postId) => api.post(`/community/${communityName}/approve`, { postId }); 

// 

// // Post API
// export const upvotePost = (postId) => api.post(`/post/${postId}/upvote`); [can it be "GET"?]
// export const downvotePost = (postId) => api.post(`/post/${postId}/downvote`);

// // Popular Feed
// export const getMyFeed = () => api.get("/popular/my-feed"); respond 
/**
data: {
      feed: [
        { id: 1, content: "Post 1: Welcome to the tech community!", votes: 10 },
        { id: 2, content: "Post 2: Latest gaming news!", votes: 5 },
      ],
    },
 */

// Mock API

// Simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock Data
const mockData = {
  communities: [
    { name: "tech", members: 1200 },
    { name: "gaming", members: 800 },
  ],
  posts: [
    { id: 1, content: "Welcome to the tech community!", votes: 10 },
    { id: 2, content: "Check out the latest games!", votes: 5 },
  ],
};

// Mock API Functions
export const register = async (data) => {
  await delay(500); // Simulate a delay
  return { status: 200, data: { message: "User registered successfully!", user: data } };
};

export const login = async (data) => {
  await delay(500);
  return { status: 200, data: { message: "Login successful!", user: data } };
};

export const logout = async () => {
  await delay(500);
  return { status: 200, data: { message: "Logged out successfully!" } };
};

// POSTS

export const createPost = async (communityName, content) => {
  await delay(500);
  const newPost = { id: Math.random(), content, votes: 0 };
  mockData.posts.push(newPost);
  return { status: 200, data: { message: `Post created in ${communityName}!`, post: newPost } };
};

export const removePost = async (communityName, postId) => {
  await delay(500);
  mockData.posts = mockData.posts.filter((post) => post.id !== postId);
  return { status: 200, data: { message: `Post ${postId} removed from ${communityName}!` } };
};

export const approvePost = async (communityName, postId) => {
  await delay(500);
  return { status: 200, data: { message: `Post ${postId} approved in ${communityName}!` } };
};

export const upvotePost = async (postId) => {
  console.log("upvoting...")
  await delay(500);
  const post = mockData.posts.find((post) => post.id === postId);
  if (post) post.votes += 1;
  return { status: 200, data: { message: `Post ${postId} upvoted!`, post } };
};

export const downvotePost = async (postId) => {
  console.log("downvoting...")
  await delay(500);
  const post = mockData.posts.find((post) => post.id === postId);
  if (post) post.votes -= 1; // backend se
  return { status: 200, data: { message: `Post ${postId} downvoted!`, post } };
};

// Feed

export const getMyFeed = async () => {
  console.log("Fetching feed...");
  // await delay(500); // Simulate network delay
  console.log("Feed fetched successfully!");
  return {
    status: 200,
    data: {
      feed: [
        { id: 1, content: "Post 1: Welcome to the tech community!", votes: 10 },
        { id: 2, content: "Post 2: Latest gaming news!", votes: 5 },
      ],
    },
  };
};

export const getPopularFeed = async () => {
  await delay(500);
  return { status: 200, data: { feed: mockData.posts.slice(0, 2) } }; // Example: Top 2 posts
};

// Communities

export const getCommunities = async () => {
  await delay(500); // Simulate network delay (500ms)
  // Simulated communities data
  const communities = [
    { name: "Tech Community", members: 1200 },
    { name: "Gaming Community", members: 800 },
    { name: "Music Lovers", members: 500 },
    { name: "Foodies", members: 1500 },
    { name: "Book Club", members: 300 },
  ];
  console.log("Fetched communities:", communities);
  return { status: 200, data: communities };  // Simulated API response
};

export const joinCommunity = async (communityName) => {
  await delay(500);
  return { status: 200, data: { message: `Joined community ${communityName}!` } };
};

export const leaveCommunity = async (communityName) => {
  await delay(500);
  return { status: 200, data: { message: `Left community ${communityName}!` } };
};

export const addModerator = async (communityName, userId) => {
  await delay(500);
  return { status: 200, data: { message: `Added user ${userId} as a moderator to ${communityName}!` } };
};

export const getUserRoleInCommunity = async (communityName) => {
  // Mock function to check if the user is a member or a moderator
  const userRole = localStorage.getItem("username") === "user1" ? { isMember: true, isModerator: true } : { isMember: false, isModerator: false };
  return { data: userRole };
};

export const createCommunity = async (communityName) => {
  // Simulating a delay to mimic a real API call
  await delay(500);  // Adding a small delay to simulate network latency

  // Log the community creation action
  console.log(`Creating community: ${communityName}`);

  // Simulate a successful response from an API
  const newCommunity = { name: communityName, members: 0 };

  // Mock response similar to what a real API might return
  return { status: 200, data: newCommunity };
};

export const getCommunityPosts = async (communityName) => {
  const mockPosts = [
    { content: `Post 1 in ${communityName}` },
    { content: `Post 2 in ${communityName}` },
    { content: `Post 3 in ${communityName}` },
  ];

  await delay(500); // Simulating network delay
  return { data: mockPosts };
};
