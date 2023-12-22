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
});