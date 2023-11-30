import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

export const CustomDrawerHeader = () => {
  return (
    <View style={styles.drawerHeader}>
      <Image
        source={require("./assets/daisy_navigator.jpeg")} // Replace with the actual path
        style={styles.logo}
      />
      {/* <HexagonMask imageSource={'./assets/daisy_navigator.jpeg'} size={200} cornerRadius={10} /> */}
      <Text style={styles.drawerHeaderText}>Daisy Feeder</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});