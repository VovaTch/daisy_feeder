import React, { useContext, useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";

import { SettingsClearComponent } from "../components/SettingsClear";
import { ActivityIndicator } from "react-native";
import { context } from "../context/global";
import { fetchFeedItem } from "../api/fetch/fetchFeedItem";

export default function SettingsScreen() {
  // context
  const globalContext = useContext(context);
  const {
    isLoggedIn,
    domain,
    isLoading,
    feedItems,
    setFeedItems,
    setIsLoading,
  } = globalContext;

  // const [feedItems, setFeedItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFeedItem(setFeedItems, setIsLoading, domain);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#884400" />
      ) : (
        <SettingsClearComponent
          foodItems={feedItems}
          setFoodItems={setFeedItems}
        />
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
