import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { SettingsClearComponent } from "../components/SettingsClear";
import { ActivityIndicator } from "react-native";
import { context } from "../context/global";
import { fetchFeedItem } from "../api/fetch/fetchFeedItem";
import { FriendRequestView } from "../components/OpenFriendRequestWindow";
import { fetchMinUsers } from "../api/fetch/fetchMinimalUser.jsx";
import { fetchFriendRequests } from "../api/fetch/fetchFriendRequests";
import { getUserFilteredFoodItems } from "../utils/Others";
import {
  updateFriendRequestStatus,
  updateFriendStatus,
} from "../api/send/updateFriendRequestStatus";
import { FriendListView } from "../components/FriendsList";
import { SendFriendRequestPopup } from "../components/CreateFriendRequestPopup";
import { containerStyles } from "../styles/containers.jsx";
import { buttonStyles } from "../styles/buttons.jsx";
import { Ionicons } from "@expo/vector-icons";
import { imageStyles } from "../styles/image.jsx";
import { StatusBar } from "react-native";
import { statusBarStyles } from "../styles/statusBar.jsx";

/**
 * Daisy's Settings Screen.
 * This screen allows users to manage their settings and interact with friends.
 *
 * @component
 * @example
 * // Usage
 * import SettingsScreen from './screens/Settings';
 *
 * function App() {
 *   return (
 *     <SettingsScreen />
 *   );
 * }
 *
 * @returns {JSX.Element} The rendered Settings screen.
 *
 * @fires SettingsScreen#onFriendRequestAccept
 * @fires SettingsScreen#onFriendRequestReject
 *
 */
export default function SettingsScreen() {
  const [createRequestVisible, setCreateRequestVisible] = useState(false);

  // context
  const globalContext = useContext(context);
  const {
    domain,
    isLoading,
    feedItems,
    setFeedItems,
    setIsLoading,
    minUsers,
    setMinUsers,
    activeUser,
    setActiveUser,
    friendRequests,
    setFriendRequests,
    screenBackgroundImage,
  } = globalContext;

  // Handle friend request window
  const handleOpenPopup = () => {
    setCreateRequestVisible(true);
  };

  const handleClosePopup = () => {
    setCreateRequestVisible(false);
  };

  // Handle status gathering
  useEffect(() => {
    fetchFeedItem(setFeedItems, setIsLoading, domain);
    fetchMinUsers(setMinUsers, setIsLoading, domain);
  }, []);

  useEffect(() => {
    updateFriendStatus(activeUser, setActiveUser, friendRequests, domain);
    fetchFriendRequests(setFriendRequests, setIsLoading, domain);
  }, []);

  const onFriendRequestAccept = (friendRequestId) => {
    updateFriendRequestStatus(
      friendRequestId,
      friendRequests,
      setFriendRequests,
      activeUser,
      setActiveUser,
      true,
      domain
    );
  };
  const onFriendRequestReject = (friendRequestId) => {
    updateFriendRequestStatus(
      friendRequestId,
      friendRequests,
      setFriendRequests,
      activeUser,
      setActiveUser,
      false,
      domain
    );
  };

  return (
    <ImageBackground
      source={screenBackgroundImage}
      style={imageStyles.backgroundImage}
    >
      <StatusBar
        backgroundColor={statusBarStyles.backgroundColor}
        barStyle={statusBarStyles.barStyle}
      />
      <SafeAreaView style={containerStyles.highLevelContainers}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#884400" />
        ) : (
          <View>
            <SettingsClearComponent
              foodItems={getUserFilteredFoodItems(feedItems, activeUser)}
              setFoodItems={setFeedItems}
              style={buttonStyles.standardButton}
            />
            <TouchableOpacity
              onPress={handleOpenPopup}
              style={buttonStyles.standardButton}
            >
              <View style={buttonStyles.buttonRowContainer}>
                <Ionicons name="person-add" style={buttonStyles.buttonIcon} />
                <Text style={buttonStyles.buttonText}>
                  Create Friend Request
                </Text>
              </View>
            </TouchableOpacity>
            <SendFriendRequestPopup
              isVisible={createRequestVisible}
              onClose={handleClosePopup}
              onSubmit={() => {}}
              minUsers={minUsers}
              activeUser={activeUser}
              domain={domain}
            />
            <FriendListView
              activeUser={activeUser}
              setActiveUser={setActiveUser}
              minUsers={minUsers}
            />
            <FriendRequestView
              activeUser={activeUser}
              minUsers={minUsers}
              friendRequests={friendRequests}
              onAccept={onFriendRequestAccept}
              onReject={onFriendRequestReject}
            />
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}
