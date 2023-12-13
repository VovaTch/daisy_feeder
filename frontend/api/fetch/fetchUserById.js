import axios from "axios";

export const fetchUserById = async (
  userId,
  basePath = "http://192.168.1.79/"
) => {
  try {
    const response = await axios.get(basePath + `api/get-user-by-id/${userId}`);
    console.log("User fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
