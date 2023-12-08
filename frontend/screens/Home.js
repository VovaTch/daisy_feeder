import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { Table } from "../components/Table";
import { FeedItemForm } from "../components/FeedItemForm";
import { FloatingSumView } from "../components/FloatingSummation";
import { getFilteredFoodItems } from "../utils/Others";
import { FloatingButton } from "../components/FloatingButton";
import { context } from "../context/global";
import { fetchFeedItem } from "../api/fetch/fetchFeedItem";

export default function HomeScreen() {
  // context
  const globalContext = useContext(context);
  const {
    isLoggedIn,
    domain,
    feedItems,
    setFeedItems,
    isLoading,
    setIsLoading,
  } = globalContext;

  // const [feedItems, setFeedItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // Submission form related flag whether is visible
  const [submissionVisible, setSubmissionVisible] = useState(false);

  // Set today's date to display
  const todayDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchFeedItem(setFeedItems, setIsLoading, domain);
  }, [submissionVisible]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Show loading screen */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#884400" />
      ) : (
        <View style={styles.table}>
          <Table
            foodItems={feedItems}
            setFoodItems={setFeedItems}
            requiredDate={todayDate}
          />
        </View>
      )}

      {/* Invisible feed item form */}
      <FeedItemForm
        isVisible={submissionVisible}
        onClose={() => {
          setSubmissionVisible(false);
        }}
        onSubmit={() => {
          setSubmissionVisible(false);
        }}
      />

      {/* Add item floating button */}
      <FloatingButton
        onPress={() => {
          setSubmissionVisible(true);
        }}
      />
      <FloatingSumView data={getFilteredFoodItems(feedItems, todayDate)} />
      <StatusBar style="auto" />
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
