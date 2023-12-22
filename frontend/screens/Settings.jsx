import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
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
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#884400" />
      ) : (
        <View>
          <SettingsClearComponent
            foodItems={getUserFilteredFoodItems(feedItems, activeUser)}
            setFoodItems={setFeedItems}
            style={styles.button}
          />
          <TouchableOpacity onPress={handleOpenPopup} style={styles.button}>
            <Text style={styles.buttonText}>Create Friend Request</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#884400",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: "15%",
    marginVertical: "1.5%",
    width: "100%",
  },
});
