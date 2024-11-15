// src/pages/RegisterPage.js
import React from "react";
import { register } from "../api";
import AuthForm from "../components/AuthForm";

const RegisterPage = () => {
  const handleRegister = (data) => register(data);
  
  return <AuthForm type="register" onSubmit={handleRegister} />;
};

export default RegisterPage;
