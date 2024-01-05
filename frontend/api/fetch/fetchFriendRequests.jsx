import axios from "axios";

/**
 * Fetches pending friend requests from the server.
 * Meow! This function fetches the pending friend requests for Daisy the cat.
 * It sets the friend requests and loading state using the provided functions.
 * The base path for the API can be optionally specified.
 *
 * @param {Function} setFriendRequests - The function to set the fetched friend requests.
 * @param {Function} setIsLoading - The function to set the loading state.
 * @param {string} [basePath="http://192.168.1.79/"] - The base path for the API.
 * @returns {Promise<Error|undefined>} - An error object if there was an error fetching the friend requests, otherwise undefined.
 */
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
    return error;
  }
};

/**
 * Fetches friend requests from the server.
 * This function sends a GET request to the specified API endpoint to retrieve friend requests.
 * It updates the state with the fetched friend requests and handles loading state.
 *
 * @param {Function} setFriendRequests - A function to update the state with the fetched friend requests.
 * @param {Function} setIsLoading - A function to update the loading state.
 * @param {string} basePath - The base path for the API endpoint.
 * @returns {Promise<void>} - A promise that resolves when the friend requests are fetched successfully.
 *
 * @example
 * // Fetch friend requests
 * fetchFriendRequests(setFriendRequests, setIsLoading, '/api/');
 *
 * @see Daisy the cat 🐱 - She loves making new friends!
 */
export const fetchFriendRequests = async (
  setFriendRequests,
  setIsLoading,
  basePath
) => {
  try {
    console.log(`Fetching friend requests...`);
    const response = await axios.get(basePath + `api/friend-requests/`);
    const allFriendRequests = response.data;
    setIsLoading(false);
    setFriendRequests(allFriendRequests);
    console.log(`Fetched ${allFriendRequests.length} friend requests`);
  } catch (error) {
    console.log(`Error fetching friend requests, ${error}.`);
  }
};
