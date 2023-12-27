import React, { useEffect, useContext } from "react";
import { ScrollView, ActivityIndicator, View, Text } from "react-native";

import { TimeLinePlot } from "../components/Plot";
import { context } from "../context/global";
import { fetchFeedItem } from "../api/fetch/fetchFeedItem";
import { getUserFilteredFoodItems } from "../utils/Others";
import { highLevelStyle } from "../styles/highLevel";
import { plotStyles } from "../styles/plots";

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
    <ScrollView contentContainerStyle={plotStyles.container}>
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
    <View style={plotStyles.plotCard}>
      <Text style={highLevelStyle.title}>{titleText}</Text>
      <TimeLinePlot data={data} foodType={foodType} />
    </View>
  );
};
