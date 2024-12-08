// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import {
  Register,
  Login,
  Logout,
  getToken,
  isLoggedIn,
} from "../services/AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn());

  useEffect(() => {
    setIsAuthenticated(isLoggedIn());
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await Login(email, password);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
      setIsAuthenticated(false);
    }
  };

  const handleRegister = async (fullName, email, password) => {
    try {
      await Register({ fullName, email, password });
      setIsAuthenticated(true);
    } catch (error) {
      console.error(
        "Registration Error: ",
        error.message // Use the refined error message
      );
    }
  };
  

  const handleLogout = () => {
    Logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, handleRegister, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
