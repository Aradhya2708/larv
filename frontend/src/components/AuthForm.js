// src/components/AuthForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ type, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password }).then(() => navigate("/"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{type === "login" ? "Login" : "Register"}</h2>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button type="submit">{type === "login" ? "Login" : "Register"}</button>
    </form>
  );
};

export default AuthForm;
