import axios from "axios";

export const fetchPendingFriendRequests = async (
  setFriendRequests,
  setIsLoading,
  basePath = "http://192.168.1.79/"
) => {
  try {
    console.log(`Fetching pending friend requests...`);
    const response = await axios.get(basePath + `api/friend-requests/`);
    const pendingFriendRequests = response.data.filter((item) => item.pending);
    setIsLoading(false);
    setFriendRequests(pendingFriendRequests);
    console.log(`Fetched ${pendingFriendRequests.length} friend requests`);
  } catch (error) {
    console.log("Error fetching pending friend requests.");
    throw error;
  }
};

export const fetchFriendRequests = async (
  setFriendRequests,
  setIsLoading,
  basePath = "http://192.168.1.79/"
) => {
  try {
    console.log(`Fetching friend requests...`);
    const response = await axios.get(basePath + `api/friend-requests/`);
    const allFriendRequests = response.data;
    setIsLoading(false);
    setFriendRequests(allFriendRequests);
    console.log(`Fetched ${allFriendRequests.length} friend requests`);
  } catch (error) {
    console.log("Error fetching friend requests.");
    throw error;
  }
};
