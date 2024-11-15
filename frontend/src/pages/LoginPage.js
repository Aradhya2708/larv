// src/pages/LoginPage.js
import React from "react";
import { login } from "../api";
import AuthForm from "../components/AuthForm";

const LoginPage = () => {
  const handleLogin = (data) => login(data);
  
  return <AuthForm type="login" onSubmit={handleLogin} />;
};

export default LoginPage;
