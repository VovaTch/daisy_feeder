import { StyleSheet } from "react-native";

export const drawerStyles = StyleSheet.create({
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  drawerHeaderText: {
    fontSize: 24,
    color: "white",
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
    borderRadius: 60,
    marginRight: 12,
    marginLeft: 12,
  },
  imageHex: {},
  iconFocused: {
    color: "white",
    fontSize: 24,
  },
  iconNotFocused: {
    color: "white",
    fontSize: 24,
  },
  itemFocused: {
    backgroundColor: "#1b1b1b",
    color: "white",
    fontSize: 24,
  },
  itemNotFocused: {
    color: "white",
    fontSize: 24,
  },
});
