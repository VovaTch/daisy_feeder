import axios from "axios";

export const validateToken = async (
  token,
  basePath = "http://192.168.1.79/"
) => {
  try {
    console.log(`Trying to validate token ${token}...`);
    const response = await axios.get(basePath + "api/get-user/", {
      heads: { Authorization: `Token ${token}` },
    });
    await axios
      .get(basePath + "api/get-user/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        console.log(`Token validated, passing user ${response.data.username}`);
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
