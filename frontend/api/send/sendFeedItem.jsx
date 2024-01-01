import axios from "axios";

export const sendFeedItem = async (data, basePath = "http://192.168.1.79/") => {
  try {
    console.log(`Trying to send data to ${basePath + "api/feeditem/"}...`);
    console.log(`Food type: ${data.food_choice}`);
    await axios.post(basePath + "api/feeditem/", data);
    console.log(`Sent data to ${basePath}.`);
  } catch (error) {
    console.error(error);
    return error;
  }
};
