import { StyleSheet } from "react-native";

export const buttonStyles = StyleSheet.create({
  standardButton: {
    backgroundColor: "#884400",
    padding: 12,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
    verticalAlign: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  okButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "transparent",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    margin: 5,
  },
  floatingAddButton: {
    backgroundColor: "#682100", // Adjust the color as needed
    borderRadius: 30,
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 20,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, // Android-only: Add a subtle shadow
  },
  addButtonText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
  timeButton: {
    backgroundColor: "white",
    borderColor: "#dddddd",
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
    marginBottom: 25,
    paddingTop: 30,
    paddingBottom: 30,
    padding: 10,
  },
  buttonRowContainer: {
    flexDirection: "row", // Align children in a row
    justifyContent: "center", // Center content horizontally
    alignItems: "center", // Center content vertically
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    left: -15,
  },
  buttonIcon: {
    marginRight: 10,
    fontSize: 24,
    color: "white",
  },
});
