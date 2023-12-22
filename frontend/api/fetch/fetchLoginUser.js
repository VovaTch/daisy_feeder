import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchLoginUser = async (
  usernameQuery,
  passwordQuery,
  setError,
  basePath = "http://192.168.1.79/"
) => {
  try {
    console.log(`User ${usernameQuery} is attempting to log in`);
    const response = await axios.post(basePath + "api/login/", {
      username: usernameQuery,
      password: passwordQuery,
    });

    // Storing the token in async storage
    await AsyncStorage.setItem(`token`, response.data.token);
    console.log(`User ${usernameQuery} has a token`);
    return response.data; // Explicitly return the response data
  } catch (error) {
    setError(
      `User ${usernameQuery} failed to log in, either the user doesn't exist or the password is incorrect`
    );
    throw error;
  }
};
