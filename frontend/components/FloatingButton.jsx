import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { buttonStyles } from "../styles/buttons";

export const FloatingButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={buttonStyles.floatingAddButton} onPress={onPress}>
      <Text style={buttonStyles.addButtonText}>+</Text>
    </TouchableOpacity>
  );
};
