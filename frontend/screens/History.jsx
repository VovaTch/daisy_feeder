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

/**
 * Renders the History screen component.
 *
 * @returns {JSX.Element} The rendered History screen component.
 *
 * @description
 * This component displays the history of feed items for Daisy the cat, the most sophisticated and finicky feline in the neighborhood.
 * It fetches data from the server and elegantly renders the content based on the fetched data, leaving no room for any "cat"-astrophes.
 * The component includes a dropdown to select a specific date, a table to display the feed items for the selected date,
 * and a floating sum view to show the total amount of food consumed on the selected date, because Daisy deserves nothing but the best.
 *
 * @example
 * // Usage
 * <HistoryScreen />
 */
/**
 * Renders the History screen component.
 *
 * @returns {JSX.Element} The rendered History screen component.
 *
 * @description
 * This component displays the history of feed items for Daisy the cat.
 * It fetches data from the server and renders the content based on the fetched data.
 * The component includes a dropdown to select a specific date, a table to display the feed items for the selected date,
 * and a floating sum view to show the total amount of food consumed on the selected date.
 */
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
    <ImageBackground
      source={screenBackgroundImage}
      style={imageStyles.backgroundImage}
    >
      <SafeAreaView style={containerStyles.highLevelContainers}>
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
      </SafeAreaView>
    </ImageBackground>
  );
}
