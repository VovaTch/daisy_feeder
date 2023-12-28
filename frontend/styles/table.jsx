import { StyleSheet } from "react-native";

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
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  innerText: {
    textAlign: "center",
    fontSize: 18,
  },
  amount_wet: {
    fontSize: 50,
    color: "blue",
    fontWeight: "bold",
  },
  amount_dry: {
    fontSize: 50,
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
});
