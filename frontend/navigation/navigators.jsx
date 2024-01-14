import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CustomDrawerContent } from "../components/CustomDrawer";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/Home";
import HistoryScreen from "../screens/History";
import PlotScreen from "../screens/Plots";
import SettingsScreen from "../screens/Settings";
import LandingScreen from "../screens/Landing";
import SignUpScreen from "../screens/SignUp";
import { context } from "../context/global";
import { drawerStyles } from "../styles/drawer";
import { removeData } from "../api/fetch/fetchFromSecureStorage";

const Drawer = createDrawerNavigator();
const stack = createStackNavigator();

const drawerProps = {
  drawerActiveBackgroundColor: drawerStyles.itemFocused.backgroundColor,
  drawerActiveTintColor: drawerStyles.itemFocused.color,
  drawerInactiveTintColor: drawerStyles.itemNotFocused.color,
};
const headerStyle = {
  headerStyle: { backgroundColor: drawerStyles.itemFocused.backgroundColor },
  headerTitleStyle: { color: drawerStyles.itemFocused.color },
  headerTintColor: drawerStyles.itemFocused.color,
};

/**
 * DrawerNavigator is the side drawer navigation component.
 * It provides access to various screens like Today's Feeding, History, Plots, and Settings.
 * Users can also log out gracefully, leaving Daisy the cat in charge for a while. 🐱
 *
 * @component
 * @param {object} props - The component props.
 * @param {object} props.navigation - The navigation object to facilitate screen transitions.
 * @returns {React.Component} The Drawer Navigator component.
 */
export function DrawerNavigator({ navigation }) {
  // load context
  const globalContext = useContext(context);
  const { activeUser } = globalContext;

  // Asynchronous function to remove token from SecureStorage after logging out
  const handleLogout = async () => {
    try {
      console.log("Logging out");
      await removeData("token");
    } catch (error) {
      console.error(`Cannot remove token from SecureStorage: ${error}`);
      return error;
    }
    navigation.navigate("Landing");
  };

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={headerStyle}
      drawerContent={(props) => {
        return (
          <CustomDrawerContent
            {...props}
            style={drawerStyles.drawerHeaderText}
          />
        );
      }}
    >
      {activeUser ? (
        <>
          <Drawer.Screen
            name="Today's Feeding"
            component={HomeScreen}
            options={{
              drawerIcon: () => (
                <Ionicons name="home" style={drawerStyles.iconFocused} />
              ),
              ...drawerProps,
            }}
          />
          <Drawer.Screen
            name="History"
            component={HistoryScreen}
            options={{
              drawerIcon: () => (
                <Ionicons name="book" style={drawerStyles.iconFocused} />
              ),
              ...drawerProps,
            }}
          />
          <Drawer.Screen
            name="Plots"
            component={PlotScreen}
            options={{
              drawerIcon: () => (
                <Ionicons name="stats-chart" style={drawerStyles.iconFocused} />
              ),
              ...drawerProps,
            }}
          />
          <Drawer.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              drawerIcon: () => (
                <Ionicons name="settings" style={drawerStyles.iconFocused} />
              ),
              ...drawerProps,
            }}
          />
          <Drawer.Screen
            name="Log Out"
            component={StackNavigator}
            options={{
              drawerIcon: () => (
                <Ionicons name="log-out" style={drawerStyles.iconFocused} />
              ),
              ...drawerProps,
            }}
            listeners={{
              drawerItemPress: (e) => {
                e.preventDefault();
                handleLogout();
              },
            }}
          ></Drawer.Screen>
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

/**
 * StackNavigator is the stack-based navigation component.
 * It handles the transition between the Landing screen, Sign Up screen, and the Drawer Navigator.
 * Daisy the cat might secretly navigate through these screens when nobody's watching. 🕵️‍♀️
 *
 * @component
 * @returns {React.Component} The Stack Navigator component.
 */
export function StackNavigator() {
  return (
    <stack.Navigator initialRouteName="Landing" screenOptions={headerStyle}>
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
