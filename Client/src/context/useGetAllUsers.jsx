import React, { useEffect, useState } from "react";
import axios from "axios";

// Custom hook to fetch all users
function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]); // State to store users
  const [loading, setLoading] = useState(false); // State to manage loading state

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true); // Set loading to true before the request
      try {
        const token = localStorage.getItem("jwt"); // Get token from localStorage
        if (!token) throw new Error("No token found"); // Handle missing token

        const response = await axios.get("/api/user/allusers", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        });
        setAllUsers(response.data); // Set users data in state
        setLoading(false); // Set loading to false after success
      } catch (error) {
        console.error("Error in useGetAllUsers:", error);
        setLoading(false); // Set loading to false after an error
      }
    };

    getUsers(); // Call the async function to fetch users
  }, []); // Empty dependency array ensures it runs only once

  return [allUsers, loading]; // Return users and loading state
}

export default useGetAllUsers;
