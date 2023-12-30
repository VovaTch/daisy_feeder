import { StyleSheet } from "react-native";

export const drawerStyles = StyleSheet.create({
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  drawerHeaderText: {
    fontSize: 24,
    color: "rgb(100, 60, 0)",
    fontWeight: "bold",
  },
  drawerContentContainer: {
    flex: 1,
    paddingTop: 16,
    // backgroundColor: "#d1c2a3",
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 20,
    marginRight: 12,
  },
  imageHex: {},
  iconFocused: {
    color: "white",
    fontSize: 24,
  },
  iconNotFocused: {
    color: "#383838",
    fontSize: 24,
  },
  itemFocused: {
    backgroundColor: "#383838",
    color: "white",
    fontSize: 24,
  },
  itemNotFocused: {
    color: "#383838",
    fontSize: 24,
  },
});
