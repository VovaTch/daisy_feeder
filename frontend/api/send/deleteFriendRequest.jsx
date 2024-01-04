import axios from "axios";

export const deleteFriendRequest = async (
  friendRequestId,
  friendRequests,
  setFriendRequests,
  basePath
) => {
  try {
    console.log(`Attempting to remove friend request ID ${friendRequestId}...`);
    axios.delete(`${basePath}api/friend-requests/${friendRequestId}/`);
    const updatedFriendRequests = friendRequests.filter(
      (item) => item.id !== friendRequestId
    );
    setFriendRequests(updatedFriendRequests);
    console.log(`Removed friend request ID ${friendRequestId}`);
  } catch (error) {
    console.log(`Failed to remove friend request ID ${friendRequestId}.`);
  }
};

export const deleteAnsweredFriendRequests = async (
  activeUser,
  friendRequests,
  setFriendRequests,
  basePath
) => {
  try {
    console.log(
      `Attempting to remove all answered friend requests from user ID ${activeUser.id}`
    );
    const answeredFriendRequests = friendRequests.filter(
      (item) => !item.pending && item.from_user === activeUser.id
    );
    const numAnsweredFriendRequests = answeredFriendRequests.length;
    for (let idx = 0; idx < numAnsweredFriendRequests; idx++) {
      deleteFriendRequest(
        answeredFriendRequests[idx].id,
        friendRequests,
        setFriendRequests,
        basePath
      );
    }
    console.log(
      `Removed all ${numAnsweredFriendRequests} answered friend requests.`
    );
  } catch (error) {
    console.log(`Failed to remove answered friend requests.`);
  }
};
