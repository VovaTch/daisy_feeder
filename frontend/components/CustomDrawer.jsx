import React from "react";
import { View, Image, Text } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { drawerStyles } from "../styles/drawer";

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
  return (
    <View style={drawerStyles.drawerContentContainer}>
      <DrawerContentScrollView {...props}>
        <CustomDrawerHeader />
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};
