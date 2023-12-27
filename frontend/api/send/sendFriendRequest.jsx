import axios from "axios";

export const sendFriendRequest = async (
  data,
  basePath = "http://192.168.1.79:8000/"
) => {
  try {
    console.log(
      `Sending friend request from ID ${data.from_user} to ID ${data.to_user} to domain ${basePath}...`
    );
    console.log(data);
    await axios.post(basePath + `api/friend-requests/`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(`Sent friend request.`);
  } catch (error) {
    console.log(`Could not send friend request.`);
    throw error;
  }
};
