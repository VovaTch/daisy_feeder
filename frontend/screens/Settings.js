import React, { useContext, useEffect } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";

import { SettingsClearComponent } from "../components/SettingsClear";
import { ActivityIndicator } from "react-native";
import { context } from "../context/global";
import { fetchFeedItem } from "../api/fetch/fetchFeedItem";
import { FriendRequestView } from "../components/OpenFriendRequestWindow";
import { fetchMinUsers } from "../api/fetch/fetchMinimalUser";
import { fetchFriendRequests } from "../api/fetch/fetchFriendRequests";
import { getUserFilteredFoodItems } from "../utils/Others";

export default function SettingsScreen() {
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
    friendRequests,
    setFriendRequests,
  } = globalContext;

  // const [feedItems, setFeedItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFeedItem(setFeedItems, setIsLoading, domain);
    fetchMinUsers(setMinUsers, setIsLoading, domain);
    fetchFriendRequests(setFriendRequests, setIsLoading, domain);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#884400" />
      ) : (
        <View>
          <SettingsClearComponent
            foodItems={getUserFilteredFoodItems(feedItems, activeUser)}
            setFoodItems={setFeedItems}
          />
          <FriendRequestView
            activeUser={activeUser}
            minUsers={minUsers}
            friendRequests={friendRequests}
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
  },
});
