import React, { useState, useContext, useEffect } from "react";
import { View, ActivityIndicator, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

import { Table } from "../components/Table";
import { FeedItemForm } from "../components/FeedItemForm";
import { FloatingSumView } from "../components/FloatingSummation";
import {
  getDateFilteredFoodItems,
  getUserFilteredFoodItems,
} from "../utils/Others";
import { FloatingButton } from "../components/FloatingButton";
import { context } from "../context/global";
import { fetchFeedItem } from "../api/fetch/fetchFeedItem";
import { fetchMinUsers } from "../api/fetch/fetchMinimalUser.jsx";
import { updateFriendStatus } from "../api/send/updateFriendRequestStatus";
import { deleteAnsweredFriendRequests } from "../api/send/deleteFriendRequest";
import { containerStyles } from "../styles/containers";
import { tableStyles } from "../styles/table.jsx";

export default function HomeScreen() {
  // context
  const globalContext = useContext(context);
  const {
    domain,
    feedItems,
    setFeedItems,
    isLoading,
    setIsLoading,
    friendRequests,
    setFriendRequests,
    minUsers,
    setMinUsers,
    activeUser,
    setActiveUser,
  } = globalContext;

  // Submission form related flag whether is visible
  const [submissionVisible, setSubmissionVisible] = useState(false);

  // Set today's date to display
  const todayDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchFeedItem(setFeedItems, setIsLoading, domain);
    fetchMinUsers(setMinUsers, setIsLoading, domain);
    updateFriendStatus(activeUser, setActiveUser, friendRequests, domain);
    deleteAnsweredFriendRequests(
      activeUser,
      friendRequests,
      setFriendRequests,
      domain
    );
  }, [submissionVisible]);

  return (
    <SafeAreaView style={containerStyles.highLevelContainers}>
      {/* Show loading screen */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#884400" />
      ) : (
        <View style={tableStyles.table}>
          <Table
            foodItems={getUserFilteredFoodItems(feedItems, activeUser)}
            setFoodItems={setFeedItems}
            minUsers={minUsers}
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
      <FloatingSumView
        data={getDateFilteredFoodItems(
          getUserFilteredFoodItems(feedItems, activeUser),
          todayDate
        )}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
