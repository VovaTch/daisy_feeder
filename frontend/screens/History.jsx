import "react-native-gesture-handler";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ActivityIndicator,
  SafeAreaView,
  ImageBackground,
  StatusBar,
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
import { Table } from "../components/Table";
import { context } from "../context/global";
import { fetchFeedItem } from "../api/fetch/fetchFeedItem";
import { fetchMinUsers } from "../api/fetch/fetchMinimalUser.jsx";
import { containerStyles } from "../styles/containers.jsx";
import { tableStyles } from "../styles/table.jsx";
import { imageStyles } from "../styles/image.jsx";
import { statusBarStyles } from "../styles/statusBar.jsx";

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
    screenBackgroundImage,
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
    <SafeAreaView style={containerStyles.highLevelContainers}>
      <ImageBackground
        source={screenBackgroundImage}
        style={imageStyles.backgroundImage}
      >
        <StatusBar
          backgroundColor={statusBarStyles.backgroundColor}
          barStyle={statusBarStyles.barStyle}
        />
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
            <View style={tableStyles.table}>
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
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
}
