import axios from "axios";

import { putData } from "./fetchFromSecureStorage";

export const fetchLoginUser = async (
  usernameQuery,
  passwordQuery,
  setError,
  basePath
) => {
  try {
    console.log(`User ${usernameQuery} is attempting to log in`);
    const response = await axios.post(basePath + "api/login/", {
      username: usernameQuery,
      password: passwordQuery,
    });

    // Storing the token in async storage
    await putData(`token`, response.data.token);
    console.log(`User ${usernameQuery} has a token`);
    return response.data; // Explicitly return the response data
  } catch (error) {
    setError(
      `User ${usernameQuery} failed to log in, either the user doesn't exist or the password is incorrect`
    );
    console.log(`User ${usernameQuery} failed to log in, ${error}`);
  }
};
