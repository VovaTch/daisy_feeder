import axios from "axios";

export const removeFriend = async (
  userId,
  activeUser,
  setActiveUser,
  basePath
) => {
  try {
    console.log(
      `Attempting to remove user ID ${userId} from ${activeUser.username}'s friends list...`
    );
    const updateFriendsList = activeUser.profile.friends.filter(
      (item) => item !== userId
    );
    await axios.patch(`${basePath}api/profile/${activeUser.id}/`, {
      friends: updateFriendsList,
    });
    const updatedActiveUser = {
      ...activeUser,
      profile: { id: activeUser.profile.id, friends: updateFriendsList },
    };
    setActiveUser(updatedActiveUser);
    console.log(
      `Removed user ID ${userId} from ${activeUser.username}'s friends list.`
    );
  } catch (error) {
    console.log(`Failed to remove ID ${userId} from friends list, ${error}`);
  }
};
