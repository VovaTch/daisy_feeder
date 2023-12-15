import React, { useEffect, useContext } from "react";
import {
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
} from "react-native";

import { TimeLinePlot } from "../components/Plot";
import { context } from "../context/global";
import { fetchFeedItem } from "../api/fetch/fetchFeedItem";
import { getUserFilteredFoodItems } from "../utils/Others";

export default function PlotScreen() {
  // context
  const globalContext = useContext(context);
  const {
    domain,
    feedItems,
    setFeedItems,
    setIsLoading,
    isLoading,
    activeUser,
  } = globalContext;

  // const [feedItems, setFeedItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFeedItem(setFeedItems, setIsLoading, domain);
  }, []);

  return (
    <ScrollView style={styles.totalView}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#884400" />
      ) : (
        <View>
          <PlotCard
            data={getUserFilteredFoodItems(feedItems, activeUser)}
            foodType="none"
            titleText="Accumulated Feeding Amount"
          />
          <PlotCard
            data={getUserFilteredFoodItems(feedItems, activeUser)}
            foodType="dry"
            titleText="Accumulated Dry Food Amount"
          />
          <PlotCard
            data={getUserFilteredFoodItems(feedItems, activeUser)}
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
    backgroundColor: "orange",
  },
  plotCard: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderColor: "#eee",
    borderWidth: 0,
    borderRadius: 10,
    margin: 15,
  },
  title: {
    fontSize: 18,
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});
