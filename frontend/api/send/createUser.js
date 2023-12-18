import axios from "axios";

export const createUser = async (
  data,
  setMinUsers,
  basePath = "http://192.168.1.79/"
) => {
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
    throw error;
  }
};
