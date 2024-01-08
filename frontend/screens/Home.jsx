import React, { useState, useContext, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  SafeAreaView,
  ImageBackground,
  StatusBar,
} from "react-native";

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
import { imageStyles } from "../styles/image.jsx";
import { statusBarStyles } from "../styles/statusBar.jsx";

/**
 * Welcome to the Home Screen component, where the magic happens!
 *
 * This screen showcases your food items, manages friend requests, and lets you add items with a sprinkle of fun.
 * It's like a feast for your eyes, or as Daisy the cat would say, a purr-fect experience!
 *
 * @component
 * @example
 * // Just include this in your navigation stack, and voila!
 * <HomeScreen />
 *
 * @returns {JSX.Element} - A delightful rendering of your daily food adventures.
 * @throws {CatAttackError} - In case Daisy decides to playfully interrupt the rendering.
 *
 * @param {Object} props - The Home Screen props (not as exciting as Daisy, but necessary).
 * @param {boolean} props.submissionVisible - Flag indicating the visibility of the invisible feed item form.
 * @param {Function} props.setSubmissionVisible - Function to toggle the visibility of the invisible feed item form.
 *
 * @version 1.0.0
 * @since Daisy-licious Update
 * @author Dvovivov
 */
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
    screenBackgroundImage,
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
    <ImageBackground
      source={screenBackgroundImage}
      style={imageStyles.backgroundImage}
    >
      <SafeAreaView style={containerStyles.highLevelContainers}>
        <StatusBar
          backgroundColor={statusBarStyles.backgroundColor}
          barStyle={statusBarStyles.barStyle}
        />
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
    </ImageBackground>
  );
}
