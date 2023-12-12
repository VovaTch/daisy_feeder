import React, { useContext, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CustomDrawerContent } from "../components/CustomDrawer";
import { StyleSheet } from "react-native";

import HomeScreen from "../screens/Home";
import HistoryScreen from "../screens/History";
import PlotScreen from "../screens/Plots";
import SettingsScreen from "../screens/Settings";
import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "../screens/Landing";
import SignUpScreen from "../screens/SignUp";
import { context } from "../context/global";

const Drawer = createDrawerNavigator();
const stack = createStackNavigator();

export function DrawerNavigator() {
  // load context
  const globalContext = useContext(context);
  const { isLoggedIn, token } = globalContext;

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => {
        return (
          <CustomDrawerContent {...props} style={styles.drawerHeaderText} />
        );
      }}
    >
      {isLoggedIn && token ? (
        <>
          <Drawer.Screen name="Today's Feeding" component={HomeScreen} />
          <Drawer.Screen name="History" component={HistoryScreen} />
          <Drawer.Screen name="Plots" component={PlotScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
          <Drawer.Screen
            name="Log Out"
            component={StackNavigator}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export function StackNavigator() {
  // const globalContext = useContext(context);
  // const { isLoggedIn, token, setIsLoggedIn } = globalContext;

  return (
    <stack.Navigator initialRouteName="Landing">
      <stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{ headerShown: false }}
      />
      <stack.Screen
        name="Sign Up"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />

      <stack.Screen
        name="Home"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
    </stack.Navigator>
  );
}
