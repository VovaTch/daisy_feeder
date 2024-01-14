import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

/**
 * Retrieves data from SecureStorage
 * @param {*} key String key for retrieval
 */
const retrieveDataMobile = async (key) => {
  try {
    const storedAuthToken = await SecureStore.getItemAsync(key);
    if (storedAuthToken !== null) {
      console.log(`Retrieved key: ${key}`);
      return storedAuthToken;
    } else {
      console.log("Key not found in SecureStorage");
    }
  } catch (error) {
    console.log("Error retrieving key (mobile):", error);
  }
};

const retrieveDataWeb = async (key) => {
  try {
    const storedAuthToken = await AsyncStorage.getItem(key);
    if (storedAuthToken !== null) {
      console.log(`Retrieved key: ${key}`);
      return storedAuthToken;
    } else {
      console.log("Key not found in SecureStorage");
    }
  } catch (error) {
    console.log("Error retrieving key (web):", error);
  }
};

const putDataMobile = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log(`Stored key: ${key}`);
  } catch (error) {
    console.log("Error storing key (mobile):", error);
    return error;
  }
};

const putDataWeb = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log(`Stored key: ${key}`);
  } catch (error) {
    console.log("Error storing key (web):", error);
    return error;
  }
};

/**
 * Removes data from SecureStorage based on key
 * @param {*} key String key for removal
 */
const removeDataMobile = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log(`Data from key ${key} removed successfully`);
  } catch (error) {
    console.log("Error removing from key (mobile):", error);
    return error;
  }
};

const removeDataWeb = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Data from key ${key} removed successfully`);
  } catch (error) {
    console.log("Error removing from key (web):", error);
    return error;
  }
};

export const retrieveData = async (key) => {
  try {
    if (Platform.OS === "web") {
      const retrievedData = await retrieveDataWeb(key);
      return retrievedData;
    } else {
      const retrievedData = await retrieveDataMobile(key);
      return retrievedData;
    }
  } catch (error) {
    console.log("Error retrieving key:", error);
  }
};

export const putData = async (key, value) => {
  try {
    if (Platform.OS === "web") {
      await putDataWeb(key, value);
    } else {
      await putDataMobile(key, value);
    }
  } catch (error) {
    console.log("Error storing key:", error);
  }
};

export const removeData = async (key) => {
  try {
    if (Platform.OS === "web") {
      await removeDataWeb(key);
    } else {
      await removeDataMobile(key);
    }
  } catch (error) {
    console.log("Error removing from key:", error);
  }
};
