import axios from "axios";

export const updateFriendStatus = async (
  activeUser,
  setActiveUser,
  friendRequests,
  basePath = "http://192.168.1.79:8000/"
) => {
  try {
    console.log(`Updating friends list...`);
    console.log(friendRequests[activeUser.id]);
    const activeUserFriends = activeUser.profile.friends;
    const filteredFriendRequestsToActive = friendRequests.filter(
      (item) =>
        item.to_user === activeUser.id &&
        !item.pending &&
        !activeUserFriends.includes(item.from_user)
    );

    const potentialFriendsToActive = filteredFriendRequestsToActive.map(
      (item) => item.from_user
    );
    const filteredFriendRequestsFromActive = friendRequests.filter(
      (item) =>
        item.from_user === activeUser.id &&
        !item.pending &&
        !activeUserFriends.includes(item.to_user)
    );

    const potentialFriendsFromActive = filteredFriendRequestsFromActive.map(
      (item) => item.to_user
    );
    const combinedFriendsSet = new Set([
      ...potentialFriendsToActive,
      ...potentialFriendsFromActive,
      ...activeUserFriends,
    ]);
    const combinedFriendsArray = Array.from(combinedFriendsSet);
    console.log(combinedFriendsArray);
    await axios.patch(basePath + `api/profile/${activeUser.profile.id}/`, {
      friends: combinedFriendsArray,
    });
    const updatedActiveUser = {
      ...activeUser,
      profile: { id: activeUser.profile.id, friends: combinedFriendsArray },
    };
    setActiveUser(updatedActiveUser);
    console.log(
      `Updated the friend list of ${activeUser.username} to include ${activeUser.profile.friends.length} friends`
    );
  } catch (error) {
    console.log(
      `Could not update friend list for ${activeUser.username}: ${error}`
    );
    throw error;
  }
};

export const updateRequestStatus = async (
  friendRequestId,
  friendRequests,
  setFriendRequests,
  approvedReq,
  basePath = "http://192.168.1.79:8000/"
) => {
  try {
    console.log(
      `Updating friend request status with ${
        approvedReq ? "approved" : "denied"
      }`
    );
    await axios.patch(`${basePath}api/friend-requests/${friendRequestId}/`, {
      approved: approvedReq,
      pending: false,
    });
    console.log(
      `Updated the friend request with ${approvedReq ? "approved" : "denied"}`
    );

    // Update the friend request state
    const updatedFriendRequests = friendRequests.map((item) =>
      item.id === friendRequestId
        ? { ...item, approved: approvedReq, pending: false }
        : item
    );
    setFriendRequests(updatedFriendRequests);
  } catch (error) {
    console.log(`Could not update friend request.`);
    throw error;
  }
};

export const updateRequestAndAddFriend = async (
  friendRequestId,
  friendRequests,
  setFriendRequests,
  activeUser,
  setActiveUser,
  approvedReq,
  basePath = "http://192.168.1.79:8000/"
) => {
  try {
    // Update friend request status
    await axios.patch(`${basePath}api/friend-requests/${friendRequestId}/`, {
      approved: approvedReq,
      pending: false,
    });

    // Update friend request state
    const updatedFriendRequests = friendRequests.map((item) =>
      item.id === friendRequestId
        ? { ...item, approved: approvedReq, pending: false }
        : item
    );
    setFriendRequests(updatedFriendRequests);

    // Update active user's friends list
    const activeUserFriends = activeUser.profile.friends;
    const filteredRequestsToActive = friendRequests.filter(
      (item) =>
        item.to_user === activeUser.id &&
        !item.pending &&
        !activeUserFriends.includes(item.from_user)
    );
    const filteredRequestsFromActive = friendRequests.filter(
      (item) =>
        item.from_user === activeUser.id &&
        !item.pending &&
        !activeUserFriends.includes(item.to_user)
    );

    const combinedFriendsSet = new Set([
      ...filteredRequestsToActive.map((item) => item.from_user),
      ...filteredRequestsFromActive.map((item) => item.to_user),
      ...activeUserFriends,
    ]);

    const combinedFriendsArray = Array.from(combinedFriendsSet);

    // Update active user's profile
    await axios.patch(`${basePath}api/profile/${activeUser.profile.id}/`, {
      friends: combinedFriendsArray,
    });

    const updatedActiveUser = {
      ...activeUser,
      profile: { ...activeUser.profile, friends: combinedFriendsArray },
    };
    setActiveUser(updatedActiveUser);

    console.log(
      `Updated friend request and friend list for ${activeUser.username}. Total friends: ${combinedFriendsArray.length}`
    );
  } catch (error) {
    console.log(`Could not update friend request. Error: ${error.message}`);
    throw error;
  }
};
