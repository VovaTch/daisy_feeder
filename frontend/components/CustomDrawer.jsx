import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

export const CustomDrawerHeader = () => {
  return (
    <View style={styles.drawerHeader}>
      {/* <HexagonMask size={100} /> */}
      <Image
        source={require("../assets/daisy_navigator.jpeg")} // Replace with the actual path
        style={styles.logo}
      />
      <Text style={styles.drawerHeaderText}>Daisy{"\n"}Feeder</Text>
    </View>
  );
};

export const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <CustomDrawerHeader />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  drawerHeaderText: {
    fontSize: 24,
    color: "rgb(100, 60, 0)",
    fontWeight: "bold",
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 20,
    marginRight: 12,
  },
  imageHex: {},
});
