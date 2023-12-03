import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import {
  getDateArray,
  getUniqueDateArray,
  getDateDropdownData,
  getFilteredFoodItems,
} from "../utils/Others";
import { fetchFeedItem } from "../api/fetch/fetchFeedItem";
import DropdownComponent from "../components/DropDown";
import { FloatingSumView } from "../components/FloatingSummation";
import { StatusBar } from "expo-status-bar";
import { Table } from "../components/Table";
import { BASE_PATH_DEVELOPMENT } from "../api/proxy/settings";

export default function HistoryScreen() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateSelected, setDateSelected] = useState("");

  const getDropdownUniqueDates = (originalData) => {
    console.log(originalData);
    const dateArray = getDateArray(originalData);
    const uniqueDataArray = getUniqueDateArray(dateArray);
    return getDateDropdownData(uniqueDataArray);
  };

  useEffect(() => {
    fetchFeedItem(setData, setIsLoading, BASE_PATH_DEVELOPMENT);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        // Display a spinner while data is loading
        <ActivityIndicator size="large" color="#884400" />
      ) : (
        // Render content based on the fetched data
        <View>
          <DropdownComponent
            dateData={getDropdownUniqueDates(data)}
            setDateSelected={setDateSelected}
          />
          <View style={styles.table}>
            <Table
              foodItems={data}
              setFoodItems={setData}
              requiredDate={dateSelected}
            />
          </View>
          <FloatingSumView data={getFilteredFoodItems(data, dateSelected)} />
          <StatusBar style="auto" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  table: {
    flex: 1,
    marginTop: "15%",
    marginBottom: "25%",
    borderColor: "#eee",
    borderWidth: 1,
    borderRadius: 10,
  },
});
