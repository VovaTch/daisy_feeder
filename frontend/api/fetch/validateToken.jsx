import axios from "axios";

export const validateToken = async (token, setError, basePath) => {
  try {
    console.log(`Trying to validate token...`);
    const response = await axios.get(basePath + "api/get-user/", {
      headers: { Authorization: `Token ${token}` },
    });
    console.log(`User ${response.data.username} authenticated the token.`);
    return response.data;
  } catch (error) {
    setError(`Failed to authenticate the token`);
    console.log(`Failed to authenticate the token, ${error}`);
  }
};
