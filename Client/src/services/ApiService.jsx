import axios from "axios";
import { getToken } from "../utils/AuthUtils";

export async function getProtectedData() {
  const token = getToken(); // Fetch token from localStorage or wherever it's stored
  const response = await axios.get("http://localhost:3000/api/protected", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
