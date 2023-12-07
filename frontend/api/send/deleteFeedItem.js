import axios from "axios";

import { getReverseFilteredFoodItems } from "../../utils/Others";

export const deleteFeedItem = async (
  id,
  data,
  setData,
  basePath = "http://192.168.1.79:8000/"
) => {
  try {
    console.log(
      `Attempting to delete item ${id} from ${
        basePath + "api/feeditem/" + String(id) + "/"
      }...`
    );
    await axios.delete(basePath + "api/feeditem/" + String(id) + "/");
    const newData = data.filter((data) => data.id !== id);
    setData(newData);
    console.log(`Removed item id ${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const clearHistory = async (
  data2delete,
  setData2delete,
  basePath = "http://192.168.1.79:8000/"
) => {
  try {
    console.log(
      `Attempting to clear history from ${basePath + "api/feeditem/"}...`
    );
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
    console.log(error);
  }
};
