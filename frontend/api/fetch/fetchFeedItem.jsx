import axios from "axios";

/**
 * Fetches feedItem objects from a Django backend API for a React Native frontend.
 *
 * @param {Function} setData - A function to update the state with the fetched data.
 * @param {Function} setIsLoading - A function to update the loading state.
 * @param {string} [basePath="http://192.168.1.79/"] - The base path for the backend API.
 * @returns {Promise<void>} A Promise that resolves after the data is fetched and the state is updated.
 *
 * @example
 * // Example usage:
 * fetchFeedItem(setDataFunction, setIsLoadingFunction);
 * // Or with a custom base path:
 * fetchFeedItem(setDataFunction, setIsLoadingFunction, "http://example.com/");
 */
export const fetchFeedItem = async (setData, setIsLoading, basePath) => {
  try {
    console.log("Fetching feeding items...");
    const response = await axios.get(`${basePath}api/feeditem/`);
    setData(response.data);
    setIsLoading(false);
    console.log(`Successfully fetched ${response.data.length} data-points.`);
  } catch (error) {
    console.log(`Failed to fetch data, ${error}`);
  }
};
