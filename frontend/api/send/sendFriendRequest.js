import axios from "axios";

export const sendFriendRequest = async (
  data,
  basePath = "http://192.168.1.79/"
) => {
  try {
    console.log(
      `Sending friend request from ID ${data.from_user} to ID ${data.to_user}...`
    );
    await axios.post(`${basePath}api/friend-requests/`, data);
    console.log(`Sent friend request.`);
  } catch (error) {
    console.log(`Could not send friend request.`);
    throw error;
  }
};
