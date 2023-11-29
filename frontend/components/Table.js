import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";

import { deleteFeedItem } from "../api/send/deleteFeedItem";

BASE_PATH_DEVELOPMENT = `http://192.168.1.79:8000/`


export const Table = ({ foodItems, setFoodItems, requiredDate }) => {

  filteredFoodItems = foodItems.filter(item => {
    const itemDate = new Date(item.datetime).toISOString().split('T')[0];
    return itemDate === requiredDate
  })

  return (
    <ScrollView style={styles.table} >
      {/* Fields, loop with map */}
      {
        filteredFoodItems.map((foodItem, idx) => (
          <View key={`box-container-${idx}`} style={styles.container} >
            <View key={`left-side-${idx}`} style={styles.leftColumn}>
              <Text
                key={`time-${idx}`}
                style={styles.innerText} >
                Time: {new Date(foodItem.datetime).toLocaleTimeString()}</Text>
              <Text key={`feeder-${idx}`} style={styles.innerText}>Feeder: {foodItem.feeder}</Text>
              <Text key={`type-${idx}`} style={styles.innerText}>Type: {foodItem.food_choice}</Text>
            </View>
            <View key={`middle-${idx}`} style={styles.rightColumn}>
              <Text
                key={`amount-${idx}`}
                style={foodItem.food_choice === "wet" ? styles.amount_wet : styles.amount_dry}>{foodItem.amount}
              </Text>

            </View>
            <View key={`right-${idx}`} style={styles.rightColumn}>
              <TouchableOpacity style={{ alignContent: "center", padding: 10 }}
                key={`delete-${idx}`}
                onPress={() => { deleteFeedItem(foodItem.id, foodItems, setFoodItems); }}><Feather
                  name="delete"
                  color={"black"}
                  size={24}
                /></TouchableOpacity></View>
          </View>
        ))
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Row layout to create two columns
    justifyContent: 'space-between', // Space evenly between columns
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5
  },
  innerText: {
    textAlign: "center",
    fontSize: 18,
  },
  leftColumn: {
    color: "red",
    padding: 10,
    alignItems: 'flex-start',
  },
  rightColumn: {
    padding: 10,
    alignItems: 'center', // Align the text to the right
  },
  amount_wet: {
    fontSize: 50,
    color: "blue",
    fontWeight: "bold",
  },
  amount_dry: {
    fontSize: 50,
    color: "red",
    fontWeight: "bold",
  },
});
