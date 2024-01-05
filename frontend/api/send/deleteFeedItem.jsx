import axios from "axios";

import { getReverseFilteredFoodItems } from "../../utils/Others";

/**
 * Sends a request to delete a feeding item from the database. Daisy is sad :(.
 * @param {number} id Item ID number to delete
 * @param {*} data Data container to delete from
 * @param {*} setData Data setter
 * @param {*} basePath Base path for the API
 */
export const deleteFeedItem = async (id, data, setData, basePath) => {
  try {
    console.log(`Attempting to delete item ${id}...`);
    await axios.delete(basePath + "api/feeditem/" + String(id) + "/");
    const newData = data.filter((data) => data.id !== id);
    setData(newData);
    console.log(`Removed item id ${id}`);
  } catch (error) {
    console.log(`Error in deleting item id ${id}: ${error}`);
  }
};

/**
 * Deletes all feeding history up to today for the user and for all friends. Daisy is REALLLLLLY
 * sad :(.
 * @param {*} data2delete Data container to delete from
 * @param {*} setData2delete Data setter
 * @param {*} basePath Base path for the API
 */
export const clearHistory = async (
  data2delete,
  setData2delete,
  basePath = "http://192.168.1.79:8000/"
) => {
  try {
    console.log(`Attempting to clear history...`);
    const todayDate = new Date().toISOString().split("T")[0];
    const filteredData = getReverseFilteredFoodItems(data2delete, todayDate);
    for (let idx = 0; idx < filteredData.length; idx++) {
      deleteFeedItem(
        filteredData[idx].id,
        data2delete,
        setData2delete,
        basePath
      );
    }
    console.log("Cleared feeding history up to today.");
  } catch (error) {
    console.log(`Failed to clear history: ${error}`);
  }
};
