import axios from "axios";

import { retrieveData } from "../fetch/fetchFromSecureStorage";

/**
 * Updates the friend list of the active user.
 * @param {*} activeUser Active user
 * @param {*} setActiveUser Active user setter
 * @param {*} friendRequests All friend requests
 * @param {*} basePath Base path for the API
 */
export const updateFriendStatus = async (
  activeUser,
  setActiveUser,
  friendRequests,
  basePath
) => {
  try {
    console.log(`Updating friends list...`);
    const activeUserFriends = activeUser.profile.friends;

    const potentialFriends = friendRequests
      .filter((item) => !item.pending)
      .flatMap((item) =>
        item.to_user === activeUser.id &&
        !activeUserFriends.includes(item.from_user)
          ? [item.from_user]
          : item.from_user === activeUser.id &&
            !activeUserFriends.includes(item.to_user)
          ? [item.to_user]
          : []
      );
    console.log(`potentialFriends: ${potentialFriends}`);

    const combinedFriendsArray = Array.from(
      new Set([...potentialFriends, ...activeUserFriends])
    );

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
  }
};

/**
 * Updates the friend request status to approved or denied.
 * @param {*} requestId Friend request ID number
 * @param {*} friendRequests All friend requests
 * @param {*} setFriendRequests Friend request setter
 * @param {*} activeUser All active users
 * @param {*} setActiveUser Active user setter
 * @param {*} approved Boolean value for approved or denied
 * @param {*} basePath Base path for the API
 */
export const updateFriendRequestStatus = async (
  requestId,
  friendRequests,
  setFriendRequests,
  activeUser,
  setActiveUser,
  approved,
  basePath
) => {
  try {
    console.log(
      `Updating friend request ID ${requestId} to status ${
        approved ? `approved` : `denied`
      }...`
    );
    const token = await retrieveData("token");
    await axios.post(
      `${basePath}api/friend-request-response/${requestId}/`,
      {
        approved: approved,
      },
      {
        headers: { Authorization: `Token ${token}` },
      }
    );

    const updatedFriendRequests = friendRequests.map((item) =>
      item.id === requestId
        ? { ...item, approved: approved, pending: false }
        : item
    );
    setFriendRequests(updatedFriendRequests);

    const updatedFriendRequest = updatedFriendRequests.find(
      (item) => item.id === requestId
    );
    const updatedActiveUser = {
      ...activeUser,
      profile: {
        ...activeUser.profile,
        friends: approved
          ? [...activeUser.profile.friends, updatedFriendRequest.from_user]
          : activeUser.profile.friends,
      },
    };
    setActiveUser(updatedActiveUser);
    console.log(
      `Updated friend request ID ${requestId} to status ${approved}, updated active user's ${activeUser.username} friends list...`
    );
  } catch (error) {
    console.log(`Failed to update friend request ID ${requestId}: ${error}`);
  }
};
