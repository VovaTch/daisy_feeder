import * as SecureStore from "expo-secure-store";

/**
 * Retrieves data from SecureStorage
 * @param {*} key String key for retrieval
 */
export const retrieveData = async (key) => {
  try {
    const storedAuthToken = await SecureStore.getItemAsync(key);
    if (storedAuthToken !== null) {
      console.log(`Retrieved key: ${key}`);
    } else {
      console.log("Key not found in SecureStorage");
    }
  } catch (error) {
    console.error("Error retrieving key:", error);
  }
};

/**
 * Removes data from SecureStorage based on key
 * @param {*} key String key for removal
 */
export const removeData = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log(`Data from key ${key} removed successfully`);
  } catch (error) {
    console.error("Error removing from key:", error);
    return error;
  }
};
