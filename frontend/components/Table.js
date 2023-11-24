import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Table = ({ foodItems, isLoading }) => {

  return (
    < View style={styles.table} >
      {/* Header */}
      < View style={styles.tableRow} >
        <Text style={styles.tableHeaderCell}>Time</Text>
        <Text style={styles.tableHeaderCell}>Feeder</Text>
        <Text style={styles.tableHeaderCell}>Amount</Text>
        <Text style={styles.tableHeaderCell}>Type</Text>
      </View >
      {/* Fields, loop with map */}
      {
        foodItems.map((foodItem, index) => (
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{foodItem.datetime}</Text>
            <Text style={styles.tableCell}>{foodItem.feeder}</Text>
            <Text style={styles.tableCell}>{foodItem.amount}</Text>
            <Text style={styles.tableCell}>{foodItem.food_choice}</Text>
          </View>
        ))
      }
    </View >
  )
}

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: '#000',
    margin: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  tableHeaderCell: {
    padding: 10,
    fontWeight: 'bold',
  },
  tableCell: {
    padding: 10,
  },
});