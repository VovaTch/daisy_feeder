import { StyleSheet } from "react-native";

export const textInputStyles = StyleSheet.create({
  textInput: {
    width: "100%",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0,
  },

  eyeIcon: {
    position: "absolute",
    right: 14,
    top: 8,
    borderLeftWidth: 1,
    paddingLeft: 10,
    borderColor: "#cecece",
  },

  label: {
    color: "white",
    marginTop: 10,
  },

  textInputLarge: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    color: "black",
    backgroundColor: "white",
    width: "100%",
  },
  loginErrorText: {
    color: "#8d0000",
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
