import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { deleteFeedItem } from "../api/send/deleteFeedItem";

BASE_PATH_DEVELOPMENT = `http://192.168.1.79:8000/`


export const Table = ({ foodItems, setFoodItems }) => {



  return (
    <View style={styles.table} >

      {/* Fields, loop with map */}
      {
        foodItems.map((foodItem) => (
          <View style={styles.container}>
            <View style={styles.leftColumn}>
              <Text>Time: {new Date(foodItem.datetime).toLocaleTimeString()}</Text>
              <Text>Feeder: {foodItem.feeder}</Text>
              <Text>Type: {foodItem.food_choice}</Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={foodItem.food_choice === "wet" ? styles.amount_wet : styles.amount_dry}>{foodItem.amount}</Text>
              <TouchableOpacity
                onPress={() => { deleteFeedItem(foodItem.id, foodItems, setFoodItems); }}><Feather
                  name="delete"
                  color={"black"}
                  size={24}
                /></TouchableOpacity>
            </View>



          </View>
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Row layout to create two columns
    justifyContent: 'space-between', // Space evenly between columns
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  leftColumn: {
    //flex: 1, // Take up the first column
    color: "red",
  },
  rightColumn: {
    //flex: 1, // Take up the second column
    padding: 10,
    alignItems: 'flex-end', // Align the text to the right
  },
  amount_wet: {
    fontSize: 35,
    color: "blue",
  },
  amount_dry: {
    fontSize: 35,
    color: "red",
  },
});
