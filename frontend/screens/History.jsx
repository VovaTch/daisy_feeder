import "react-native-gesture-handler";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";

import {
  getDateArray,
  getUniqueDateArray,
  getDateDropdownData,
  getDateFilteredFoodItems,
  getUserFilteredFoodItems,
} from "../utils/Others";
import DropdownComponent from "../components/DropDown";
import { FloatingSumView } from "../components/FloatingSummation";
import { StatusBar } from "expo-status-bar";
import { Table } from "../components/Table";
import { context } from "../context/global";
import { fetchFeedItem } from "../api/fetch/fetchFeedItem";
import { fetchMinUsers } from "../api/fetch/fetchMinimalUser.jsx";

export default function HistoryScreen() {
  // context
  const globalContext = useContext(context);
  const {
    domain,
    feedItems,
    setFeedItems,
    isLoading,
    setIsLoading,
    minUsers,
    setMinUsers,
    activeUser,
  } = globalContext;

  // const [feedItems, setFeedItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [dateSelected, setDateSelected] = useState("");

  const getDropdownUniqueDates = (originalData) => {
    const dateArray = getDateArray(originalData);
    const uniqueDataArray = getUniqueDateArray(dateArray);
    return getDateDropdownData(uniqueDataArray);
  };

  useEffect(() => {
    fetchMinUsers(setMinUsers, setIsLoading, domain);
    fetchFeedItem(setFeedItems, setIsLoading, domain);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        // Display a spinner while data is loading
        <ActivityIndicator size="large" color="#884400" />
      ) : (
        // Render content based on the fetched data
        <View>
          <DropdownComponent
            dateData={getDropdownUniqueDates(
              getUserFilteredFoodItems(feedItems, activeUser)
            )}
            setDateSelected={setDateSelected}
          />
          <View style={styles.table}>
            <Table
              foodItems={getUserFilteredFoodItems(feedItems, activeUser)}
              setFoodItems={setFeedItems}
              minUsers={minUsers}
              requiredDate={dateSelected}
            />
          </View>
          <FloatingSumView
            data={getDateFilteredFoodItems(
              getUserFilteredFoodItems(feedItems, activeUser),
              dateSelected
            )}
          />
          <StatusBar style="auto" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  table: {
    flex: 1,
    marginTop: 15,
    marginBottom: 100,
    marginLeft: 10,
    marginRight: 10,
    width: 350,
    borderColor: "#eee",
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
});
