// api.js
import axios from "axios";

export const fetchPrizes = async () => {
  try {
    const response = await axios.get("/api/v1/prize.json");
    return response.data.prizes;
  } catch (error) {
    console.error("Error fetching prizes:", error);
    throw error;
  }
};
