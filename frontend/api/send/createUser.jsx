import axios from "axios";

/**
 * Creates a user in the database for Daisy the magnificent
 * @param {*} data Data to send to the API
 * @param {*} setMinUsers Function to set the minimal users
 * @param {*} basePath Base path for the API
 */
export const createUser = async (data, setMinUsers, basePath) => {
  try {
    console.log(
      `Creating user ${data.username} in ${basePath + "api/signup/"}...`
    );
    await axios.post(basePath + "api/signup/", data);
    console.log(`Fetching minimal users...`);
    const minUsers = await axios.get(basePath + "api/minimal-user/");
    setMinUsers(minUsers.data);
    console.log(`Created user ${data.username}, fetched minimal users.`);
  } catch (error) {
    console.log(`Error in creating user: ${error}`);
  }
};
