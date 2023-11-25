import axios from "axios";

export const deleteFeedItem = async (id, data, setData, basePath = `http://192.168.1.79/`) => {
  try {
    console.log(`Attempting to delete item ${id}...`);
    await axios.delete(basePath + stringify(id) + `/`);
    const newData = data.filter(data => data.id !== id);
    setData(newData);
    console.log(`Removed item id ${id}`);
  } catch (error) {
    console.log(error)
  }
}