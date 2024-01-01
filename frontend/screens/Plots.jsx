import React, { useEffect, useContext } from "react";
import {
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  ImageBackground,
  StatusBar,
} from "react-native";

import { TimeLinePlot } from "../components/Plot";
import { context } from "../context/global";
import { fetchFeedItem } from "../api/fetch/fetchFeedItem";
import { getUserFilteredFoodItems } from "../utils/Others";
import { highLevelStyles } from "../styles/highLevel";
import { plotStyles } from "../styles/plots";
import { imageStyles } from "../styles/image";
import { statusBarStyles } from "../styles/statusBar";

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
    screenBackgroundImage,
  } = globalContext;

  // const [feedItems, setFeedItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFeedItem(setFeedItems, setIsLoading, domain);
  }, []);

  return (
    <ImageBackground
      source={screenBackgroundImage}
      style={imageStyles.backgroundImage}
    >
      <StatusBar
        backgroundColor={statusBarStyles.backgroundColor}
        barStyle={statusBarStyles.barStyle}
      />
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
    </ImageBackground>
  );
}

const PlotCard = ({ data, foodType, titleText }) => {
  return (
    <View style={plotStyles.plotCard}>
      <Text style={highLevelStyles.title}>{titleText}</Text>
      <TimeLinePlot data={data} foodType={foodType} />
    </View>
  );
};
