// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CommunityPage from "./pages/CommunityPage";
import CreateCommunityPage from "./pages/CreateCommunityPage"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/community/:community_name" element={<CommunityPage />} />
        <Route path="/create-community" element={<CreateCommunityPage />} />
      </Routes>
    </Router>
  );
}

export default App;
