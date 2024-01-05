import React, { useContext } from "react";
import { View, Image, Text, ImageBackground } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { drawerStyles } from "../styles/drawer";
import { imageStyles } from "../styles/image";
import { context } from "../context/global";

/**
 * Renders the header component for the custom drawer.
 *
 * @returns {JSX.Element} The header component.
 * @description This component displays the header for the custom drawer in the Daisy Feeder application.
 * It includes an image of Daisy the cat, the logo of the application, and the text "Daisy Feeder".
 * The header is used to provide a visual representation of the application's branding and identity.
 */
export const CustomDrawerHeader = () => {
  return (
    <View style={drawerStyles.drawerHeader}>
      {/* <HexagonMask size={100} /> */}
      <Image
        source={require("../assets/daisy_navigator.jpeg")} // Replace with the actual path
        style={drawerStyles.logo}
      />
      <Text style={drawerStyles.drawerHeaderText}>Daisy{"\n"}Feeder</Text>
    </View>
  );
};

/**
 * Renders the custom content for the drawer component.
 *
 * @param {object} props - The props passed to the component.
 * @returns {JSX.Element} The JSX element representing the custom drawer content.
 *
 * @example
 * // Usage
 * <CustomDrawerContent />
 *
 * @description
 * This component renders the custom content for the drawer component. It uses the global context to access the drawer background image. The content includes a header component, a list of drawer items, and a background image.
 *
 * Daisy the cat approves of this custom drawer content!
 */
export const CustomDrawerContent = (props) => {
  // get context
  const globalContext = useContext(context);
  const { drawerBackgroundImage } = globalContext;

  return (
    //
    <View style={drawerStyles.drawerContentContainer}>
      <ImageBackground
        source={drawerBackgroundImage}
        style={imageStyles.backgroundImage}
      >
        <DrawerContentScrollView {...props}>
          <CustomDrawerHeader />
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </ImageBackground>
    </View>
  );
};
