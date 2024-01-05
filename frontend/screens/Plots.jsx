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

/**
 * Renders the PlotScreen component, which displays various plots related to Daisy the cat's feeding amounts.
 *
 * @component
 * @returns {JSX.Element} The rendered PlotScreen component.
 *
 * @example
 * // Usage
 * import PlotScreen from './screens/Plots';
 *
 * function App() {
 *   return (
 *     <PlotScreen />
 *   );
 * }
 *
 * @description
 * The PlotScreen component is responsible for rendering plots that show the accumulated feeding amounts of Daisy the cat.
 * It fetches the feed items from the server and displays loading indicator until the data is loaded.
 * Once the data is loaded, it renders three PlotCard components, each showing the accumulated feeding amounts for different food types.
 *
 * @see {@link PlotCard}
 * @see {@link getUserFilteredFoodItems}
 * @see {@link fetchFeedItem}
 */
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

/**
 * A component that renders a plot card for Daisy the cat's feeding data.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.data - The feeding data for the plot.
 * @param {string} props.foodType - The type of food Daisy is fed.
 * @param {string} props.titleText - The title text to display on the plot card.
 * @returns {JSX.Element} The rendered plot card component.
 */
const PlotCard = ({ data, foodType, titleText }) => {
  return (
    <View style={plotStyles.plotCard}>
      <Text style={highLevelStyles.title}>{titleText}</Text>
      <TimeLinePlot data={data} foodType={foodType} />
    </View>
  );
};
