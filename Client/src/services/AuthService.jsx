import axios from "axios";

const API_URL = `http://localhost:5000/`;

//register
// services/AuthService.js
export async function Register({ fullName, email, password }) {
  try {
    const response = await axios.post(`${API_URL}auth/register`, {
      fullName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
}

//login
export async function Login(email, password) {
  try {
    const response = await axios.post(`${API_URL}auth/login`, {
      email,
      password,
    });

    //save token to localstorage
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      return response.data;
    }

  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

//logout
export async function Logout() {
  localStorage.removeItem("token");
}

// Get Auth Token
export function getToken() {
  return localStorage.getItem("token");
}

// Check if user is logged in
export function isLoggedIn() {
  return !!getToken();
}
