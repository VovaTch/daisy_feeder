import { StyleSheet } from "react-native";

export const buttonStyles = StyleSheet.create({
  standardButton: {
    backgroundColor: "#884400",
    padding: 15,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
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
});
