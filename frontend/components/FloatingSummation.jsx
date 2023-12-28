import React from "react";
import { Text, View } from "react-native";

import { summationStyles } from "../styles/summation";

export const FloatingSumView = ({ data }) => {
  return (
    <View style={summationStyles.floatingView}>
      <Text style={summationStyles.auxText}>
        Total wet: <WetSum data={data} /> dry: <DrySum data={data} />
      </Text>
    </View>
  );
};

const WetSum = ({ data }) => {
  return (
    <Text style={summationStyles.wetText}>
      {extractAmountIntoArray(data, "wet")}
    </Text>
  );
};

const DrySum = ({ data }) => {
  return (
    <Text style={summationStyles.dryText}>
      {extractAmountIntoArray(data, "dry")}
    </Text>
  );
};

function extractAmountIntoArray(data, foodType) {
  const filteredByFoodType = data.filter(
    (dataItem) => dataItem.food_choice === foodType
  );
  let summedAmount = 0;
  for (let idx = 0; idx < filteredByFoodType.length; idx++) {
    summedAmount += filteredByFoodType[idx].amount;
  }
  return summedAmount;
}
