import React, { useState, useEffect } from "react";
import {
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
} from "react-native";

import { fetchFeedItem } from "../api/fetch/fetchFeedItem";
import { BASE_PATH_DEVELOPMENT } from "../api/proxy/settings";
import { TimeLinePlot } from "../components/Plot";

export default function PlotScreen() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFeedItem(setData, setIsLoading, BASE_PATH_DEVELOPMENT);
  }, []);

  return (
    <ScrollView style={styles.totalView}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#884400" />
      ) : (
        <View>
          <PlotCard
            data={data}
            foodType="none"
            titleText="Accumulated Feeding Amount"
          />
          <PlotCard
            data={data}
            foodType="dry"
            titleText="Accumulated Dry Food Amount"
          />
          <PlotCard
            data={data}
            foodType="wet"
            titleText="Accumulated Wet Food Amount"
          />
        </View>
      )}
    </ScrollView>
  );
}

const PlotCard = ({ data, foodType, titleText }) => {
  return (
    <View style={styles.plotCard}>
      <Text style={styles.title}>{titleText}</Text>
      <TimeLinePlot data={data} foodType={foodType} />
    </View>
  );
};

const styles = StyleSheet.create({
  totalView: {
    backgroundColor: "white",
  },
  plotCard: {
    backgroundColor: "white",
    borderColor: "#eee",
    borderWidth: 1,
    borderRadius: 5,
    margin: 15,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});
