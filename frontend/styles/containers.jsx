import { StyleSheet } from "react-native";

export const containerStyles = StyleSheet.create({
  // Container for the page view
  highLevelContainers: {
    flex: 1,
    // backgroundColor: "orange",
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
  formContainer: {
    width: "80%",
  },
  tableContainer: {
    flexDirection: "row", // Row layout to create two columns
    justifyContent: "space-between", // Space evenly between columns
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: "#ccc",
    borderWidth: 0,
    borderRadius: 10,
    marginTop: 5,
    margin: 5,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
  },
  settingsContainer: {
    justifyContent: "space-between", // Space evenly between columns
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: "#ccc",
    borderWidth: 0,
    borderRadius: 10,
    marginTop: 5,
    margin: 5,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  rowButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
