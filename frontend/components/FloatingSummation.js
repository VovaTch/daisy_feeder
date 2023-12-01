import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export const FloatingSumView = ({ data }) => {
  return (
    <View style={styles.floatingView}>
      <Text style={styles.auxText}>Total wet: <WetSum data={data} /> dry: <DrySum data={data} /></Text>
    </View>
  )
}

const WetSum = ({ data }) => {
  return (
    <Text style={styles.wetText}>{extractAmountIntoArray(data, 'wet')}</Text>
  )
}

const DrySum = ({ data }) => {
  return (
    <Text style={styles.dryText}>{extractAmountIntoArray(data, 'dry')}</Text>
  )
}

function extractAmountIntoArray (data, foodType) {
  const filteredByFoodType = data.filter(dataItem => dataItem.food_choice === foodType)
  let summedAmount = 0
  for (let idx = 0; idx < filteredByFoodType.length; idx++) {
    summedAmount += filteredByFoodType[idx].amount
  }
  return summedAmount
}

const styles = StyleSheet.create({
  floatingView: {
    position: 'absolute',
    bottom: '5%',
    left: '15%',
    right: '15%',
    borderColor: '#ccc'
    // borderWidth: 1,
    // borderRadius: 5,
  },
  auxText: {
    fontSize: 18
  },
  wetText: {
    fontSize: 30,
    color: 'blue',
    fontWeight: 'bold'
  },
  dryText: {
    fontSize: 30,
    color: 'red',
    fontWeight: 'bold'
  }
})
