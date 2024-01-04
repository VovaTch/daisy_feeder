import axios from "axios";

export const fetchUserById = async (userId, basePath) => {
  try {
    const response = await axios.get(basePath + `api/minimal-user/${userId}/`);
    console.log("User fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return error;
  }
};

export const fetchMinUsers = async (setMinUsers, setIsLoading, basePath) => {
  try {
    const response = await axios.get(basePath + `api/minimal-user/`);
    setMinUsers(response.data);
    setIsLoading(false);
    console.log(
      `All minimum ${response.data.length} user representation were fetched successfully`
    );
  } catch (error) {
    console.log("Error fetching min user list:", error);
  }
};
