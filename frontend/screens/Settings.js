import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { SettingsClearComponent } from "../components/SettingsClear";
import { fetchFeedItem } from "../api/fetch/fetchFeedItem";
import { BASE_PATH_DEVELOPMENT } from "../api/proxy/settings";
import { ActivityIndicator } from "react-native";

export default function SettingsScreen() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFeedItem(setData, setIsLoading, BASE_PATH_DEVELOPMENT);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#884400" />
      ) : (
        <SettingsClearComponent foodItems={data} setFoodItems={setData} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
