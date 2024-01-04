import { StyleSheet } from "react-native";

/**
 * Styles for the table component
 */
export const tableStyles = StyleSheet.create({
  table: {
    flex: 1,
    marginTop: 15,
    marginBottom: 100,
    marginLeft: 10,
    marginRight: 10,
    width: 350,
    borderColor: "#eee",
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  innerText: {
    textAlign: "center",
    fontSize: 16,
    // fontFamily: "notoserif",
  },
  amount_wet: {
    fontSize: 40,
    color: "blue",
    fontWeight: "bold",
    // fontFamily: "notoserif",
  },
  amount_dry: {
    fontSize: 40,
    color: "red",
    fontWeight: "bold",
  },
  leftColumn: {
    color: "red",
    padding: 10,
    alignItems: "flex-start",
  },
  rightColumn: {
    padding: 10,
    alignItems: "center", // Align the text to the right
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
