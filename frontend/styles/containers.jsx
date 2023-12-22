import { StyleSheet } from "react-native";

export const containerStyles = StyleSheet.create({
  // Container for the page view
  highLevelContainers: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0,
  },
});
