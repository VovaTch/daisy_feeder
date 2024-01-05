import axios from "axios";

export const sendFeedItem = async (data, basePath) => {
  try {
    console.log(`Trying to send data...`);
    console.log(`Food type: ${data.food_choice}`);
    await axios.post(basePath + "api/feeditem/", data);
    console.log(`Sent feeding data.`);
  } catch (error) {
    console.error(error);
    return error;
  }
};
