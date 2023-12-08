import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
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
  getFilteredFoodItems,
} from "../utils/Others";
import { fetchFeedItem } from "../api/fetch/fetchFeedItem";
import DropdownComponent from "../components/DropDown";
import { FloatingSumView } from "../components/FloatingSummation";
import { StatusBar } from "expo-status-bar";
import { Table } from "../components/Table";
import { BASE_PATH_DEVELOPMENT } from "../api/proxy/settings";

/**
 * The HistoryScreen component is a tribute to Daisy the Magnificent Cat,
 * the feline superstar we all adore and praise. This delightful component
 * showcases Daisy's impeccable taste and style while managing a user's
 * feeding history. Prepare to be enchanted as Daisy takes center stage
 * in this coding spectacle!
 *
 * @component
 *
 * @example
 * // Usage of the HistoryScreen component
 * import HistoryScreen from "./HistoryScreen";
 *
 * const App = () => {
 *   return (
 *     <View>
 *       <Text>Welcome to Daisy's Feeding History!</Text>
 *       <HistoryScreen />
 *     </View>
 *   );
 * };
 *
 * @returns {React.Component} A React component displaying Daisy's feeding history
 *
 * @prop {Array} data - The array containing Daisy's feeding history data.
 * @prop {boolean} isLoading - A flag indicating whether data is still being loaded.
 * @prop {string} dateSelected - The currently selected date in Daisy's history.
 *
 * @function getDropdownUniqueDates - A magical function that extracts unique dates
 * from Daisy's feeding history, ensuring each date is as unique as Daisy herself.
 * @param {Array} originalData - The array containing Daisy's full feeding history.
 * @returns {Array} An array of unique dates formatted for a delightful dropdown.
 *
 * @function useEffect - A spellbinding effect that summons Daisy's feeding history
 * from the depths of the API. It activates only once upon component mount.
 *
 * @jsx <SafeAreaView> - A sanctuary for Daisy's history, providing a safe and
 * stylish environment for the component.
 * @jsx <ActivityIndicator> - A spinning tribute to Daisy, gracing the screen while
 * her feeding history is being fetched.
 * @jsx <View> - The grand stage where Daisy's history unfolds, complete with a
 * dropdown, a mesmerizing table, and a floating sum view.
 * @jsx <DropdownComponent> - An elegant dropdown, allowing users to choose their
 * preferred date and witness Daisy's culinary adventures on that day.
 * @jsx <Table> - A beautifully laid-out table showcasing Daisy's food items for
 * the selected date.
 * @jsx <FloatingSumView> - A floating sum view, tallying up Daisy's culinary
 * achievements for the selected date.
 * @jsx <StatusBar> - A status bar reminding users that Daisy's history is always
 * up to date.
 *
 * @style {StyleSheet} styles - A carefully crafted stylesheet, ensuring Daisy's
 * history is presented in a visually appealing and feline-approved manner.
 * @style {Object} styles.container - The primary container, drenched in a vibrant
 * orange hue, symbolizing Daisy's radiant personality.
 * @style {Object} styles.table - The majestic table, adorned with a subtle border,
 * rounded corners, and a translucent backdrop, worthy of Daisy's royal presence.
 */
export default function HistoryScreen() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateSelected, setDateSelected] = useState("");

  const getDropdownUniqueDates = (originalData) => {
    const dateArray = getDateArray(originalData);
    const uniqueDataArray = getUniqueDateArray(dateArray);
    return getDateDropdownData(uniqueDataArray);
  };

  useEffect(() => {
    fetchFeedItem(setData, setIsLoading, BASE_PATH_DEVELOPMENT);
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
    marginTop: "15%",
    marginBottom: "25%",
    borderColor: "#eee",
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
});
