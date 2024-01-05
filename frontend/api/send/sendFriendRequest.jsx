import axios from "axios";

export const sendFriendRequest = async (data, basePath) => {
  try {
    console.log(
      `Sending friend request from ID ${data.from_user} to ID ${data.to_user}...`
    );
    await axios.post(basePath + `api/friend-requests/`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(`Sent friend request.`);
  } catch (error) {
    console.log(`Could not send friend request.`);
  }
};
