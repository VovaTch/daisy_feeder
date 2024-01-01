import axios from "axios";

export const validateToken = async (
  token,
  setError,
  basePath = "http://192.168.1.79/"
) => {
  try {
    console.log(`Trying to validate token...`);
    const response = await axios.get(basePath + "api/get-user/", {
      headers: { Authorization: `Token ${token}` },
    });
    console.log(`User ${response.data.username} authenticated the token.`);
    return response.data;
  } catch (error) {
    setError(`Failed to authenticate the token`);
    return error;
  }
};
