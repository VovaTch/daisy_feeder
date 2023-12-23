import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const DropdownComponent = ({ dateData, setDateSelected }) => {
  const [value, setValue] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
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
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
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
        console.log(item.value);
      }}
      renderLeftIcon={() => (
        <AntDesign
          style={styles.icon}
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

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#aaa",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    marginLeft: 150,
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
