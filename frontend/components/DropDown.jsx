import React, { useState } from "react";
import { View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

import { dropdownStyles } from "../styles/dropdown";

const DropdownComponent = ({ dateData, setDateSelected }) => {
  const [value, setValue] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const renderItem = (item) => {
    return (
      <View style={dropdownStyles.item}>
        <Text style={dropdownStyles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={dropdownStyles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };

  return (
    <Dropdown
      style={dropdownStyles.dropdownMain}
      placeholderStyle={dropdownStyles.placeholderStyle}
      selectedTextStyle={dropdownStyles.selectedTextStyle}
      inputSearchStyle={dropdownStyles.inputSearchStyle}
      iconStyle={dropdownStyles.iconStyle}
      data={dateData}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={!isFocused ? "Select a date..." : "..."}
      searchPlaceholder="Search..."
      value={value}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onChange={(item) => {
        setValue(item.value);
        setIsFocused(false);
        setDateSelected(item.value);
      }}
      renderLeftIcon={() => (
        <AntDesign
          style={dropdownStyles.icon}
          color={isFocused ? "blue" : "black"}
          name="Safety"
          size={20}
        />
      )}
      renderItem={renderItem}
    />
  );
};

export default DropdownComponent;
