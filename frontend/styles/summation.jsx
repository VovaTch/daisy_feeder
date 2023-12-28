import { StyleSheet } from "react-native";

export const summationStyles = StyleSheet.create({
  floatingView: {
    position: "absolute",
    bottom: "5%",
    left: "10%",
    right: "15%",
    borderColor: "#ccc",
  },
  auxText: {
    fontSize: 18,
  },
  wetText: {
    fontSize: 30,
    color: "blue",
    fontWeight: "bold",
  },
  dryText: {
    fontSize: 30,
    color: "red",
    fontWeight: "bold",
  },
});
