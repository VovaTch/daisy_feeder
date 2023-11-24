import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Table } from './components/Table';
import { FloatingButton } from './components/FloatingButton';

DUMMY_DATA = [
  { id: "asd", feeder: "Vova", amount: 30, datetime: "10.10.2023", food_choice: "Dry" },
  { id: "dsa", feeder: "Vova", amount: 30, datetime: "10.10.2023", food_choice: "Dry" }
]

export default function App() {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState("True")

  useEffect(() => { fetchData(); }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get("http://192.168.1.79:8000/api/feeditem/");
      //const response = await axios.get("http://127.0.0.1:8000/api/feeditem/");
      setData(response.data);
      setIsLoading(False);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Table foodItems={data} />
      <FloatingButton onPress={() => { fetchData() }} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
