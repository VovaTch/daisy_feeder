import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Retrieves data from AsyncStorage
 * @param {*} key String key for retrieval
 */
export const retrieveData = async (key) => {
  try {
    const storedAuthToken = await AsyncStorage.getItem(key);
    if (storedAuthToken !== null) {
      console.log(`Retrieved key: ${key}`);
    } else {
      console.log("Key not found in AsyncStorage");
    }
  } catch (error) {
    console.error("Error retrieving key:", error);
  }
};

/**
 * Removes data from AsyncStorage based on key
 * @param {*} key String key for removal
 */
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Data from key ${key} removed successfully`);
  } catch (error) {
    console.error("Error removing from key:", error);
  }
};

/**
 * Removes all data from AsyncStorage
 */
export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    console.log("AsyncStorage cleared successfully");
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error);
  }
};
