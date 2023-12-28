import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";

import { deleteFeedItem } from "../api/send/deleteFeedItem";
import { getUsernameById } from "../utils/Others";
import { tableStyles } from "../styles/table";
import { containerStyles } from "../styles/containers";

export const Table = ({ foodItems, setFoodItems, minUsers, requiredDate }) => {
  const filteredFoodItems = foodItems.filter((item) => {
    const itemDate = new Date(item.datetime).toISOString().split("T")[0];
    return itemDate === requiredDate;
  });

  return (
    <ScrollView>
      {/* Fields, loop with map */}
      {filteredFoodItems.map((foodItem, idx) => (
        <View
          key={`box-container-${idx}`}
          style={containerStyles.tableContainer}
        >
          <View key={`left-side-${idx}`} style={tableStyles.leftColumn}>
            <Text key={`time-${idx}`} style={tableStyles.innerText}>
              Time: {new Date(foodItem.datetime).toLocaleTimeString()}
            </Text>
            <Text key={`feeder-${idx}`} style={tableStyles.innerText}>
              Feeder: {getUsernameById(minUsers, foodItem.feeder)}
            </Text>
            <Text key={`type-${idx}`} style={tableStyles.innerText}>
              Type: {foodItem.food_choice}
            </Text>
          </View>
          <View key={`middle-${idx}`} style={tableStyles.rightColumn}>
            <Text
              key={`amount-${idx}`}
              style={
                foodItem.food_choice === "wet"
                  ? tableStyles.amount_wet
                  : tableStyles.amount_dry
              }
            >
              {foodItem.amount}
            </Text>
          </View>
          <View key={`right-${idx}`} style={tableStyles.rightColumn}>
            <TouchableOpacity
              style={{ alignContent: "center", padding: 10 }}
              key={`delete-${idx}`}
              onPress={() => {
                deleteFeedItem(foodItem.id, foodItems, setFoodItems);
              }}
            >
              <Feather name="delete" color={"black"} size={40} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};
