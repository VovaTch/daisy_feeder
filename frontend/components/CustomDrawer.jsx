import React, { useContext } from "react";
import { View, Image, Text, ImageBackground } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { drawerStyles } from "../styles/drawer";
import { imageStyles } from "../styles/image";
import { context } from "../context/global";

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
