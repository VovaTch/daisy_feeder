import axios from "axios";

export const deleteFeedItem = async (id, data, setData, basePath = `http://192.168.1.79:8000/`) => {
  try {
    console.log(`Attempting to delete item ${id} from ${basePath + `api/feeditem/` + String(id) + `/`}...`);
    await axios.delete(basePath + `api/feeditem/` + String(id) + `/`);
    console.log()
    const newData = data.filter(data => data.id !== id);
    setData(newData);
    console.log(`Removed item id ${id}`);
  } catch (error) {
    console.log(error)
  }
}