import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "./context/global";
import { StackNavigator } from "./navigation/navigators";
import { highLevelStyles } from "./styles/highLevel";
import { statusBarStyles } from "./styles/statusBar";
import { StatusBar } from "react-native";

// const Drawer = createDrawerNavigator();

/**
 * Welcome to the Daisy Cat App - the purr-fect companion for Daisy, the most sophisticated feline in town!
 *
 * This app is not just your ordinary feline-friendly application; it's designed to cater to Daisy's every whim,
 * from tracking her daily feeding routine to providing historical insights into her culinary adventures.
 *
 * Features:
 * --------
 * - **Today's Feeding:** Keep track of Daisy's daily meals. Is it fish or chicken today? The app knows!
 * - **History:** Dive into the rich history of Daisy's gastronomic experiences. It's a cat's culinary diary!
 * - **Plots:** Discover visually stunning plots that showcase Daisy's eating patterns. Who knew data could be this cute?
 * - **Settings:** Tailor the app to Daisy's preferences. Maybe she prefers a darker theme? The choice is hers!
 *
 * And don't forget the custom drawer, specially designed with Daisy in mind. It's not just an app; it's a lifestyle,
 * a digital playground for Daisy to explore her culinary curiosities.
 *
 * So, buckle up for a whimsical journey through Daisy's world. Paws and whiskers, this app is the cat's meow!
 *
 * @component
 */
export default function App() {
  return (
    <Provider>
      <NavigationContainer style={highLevelStyles.container}>
        <StatusBar
          backgroundColor={statusBarStyles.backgroundColor}
          barStyle={statusBarStyles.barStyle}
        />
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
}
