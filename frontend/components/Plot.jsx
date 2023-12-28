import React from "react";
import { View } from "react-native";
import {
  VictoryChart,
  VictoryAxis,
  VictoryLine,
  VictoryLabel,
} from "victory-native";

import { plotStyles } from "../styles/plots";

export const TimeLinePlot = ({ data, foodType = "none" }) => {
  return (
    <View>
      <VictoryChart width={350} height={350}>
        <VictoryAxis
          dependentAxis
          tickFormat={(tick) => `${tick}`}
          style={plotStyles.victoryAxisStyle}
          label="Amount (grams)"
        />
        <VictoryAxis
          tickLabelComponent={<VictoryLabel angle={"90"} />}
          tickFormat={(x) =>
            "   " +
            new Date(x).getDate() +
            "-" +
            String(Number(new Date(x).getMonth()) + 1)
          }
          style={plotStyles.victoryAxisStyle}
          label="Date"
        />
        <VictoryLine
          data={accumulatePerDate(data, foodType)}
          x="date"
          y="accumulatedAmount"
          style={getLineStyle(foodType)}
        />
      </VictoryChart>
    </View>
  );
};

const filterFoodType = (data, foodType) => {
  return data.filter((item) => item.food_choice === foodType);
};

/**
 * Function that return an array of objects, where each object has a date field, and an amount field, corresponding
 * to the feeding amount that was done that day, whether all food, dry, or wet food.
 * @param {feedItem} data Feeding data
 * @param {string} foodType Food type: 'none', 'dry', 'wet'
 * @returns
 */
const accumulatePerDate = (data, foodType) => {
  const filteredData =
    foodType === "none" ? data : filterFoodType(data, foodType);

  // Extracting the range of dates
  // const dates = filteredData.map((item) => item.datetime.split("T")[0]);
  const dates = data.map((item) => new Date(item.datetime).getTime());
  const minDate = Math.min(...dates);
  const maxDate = Math.max(...dates);

  // Generating an array with all dates in the range
  const allDatesInRange = [];
  let currentDate = new Date(minDate);

  while (currentDate <= new Date(maxDate)) {
    allDatesInRange.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Creating the result array with accumulated amounts, filling in missing dates with amount 0
  const resultArray = allDatesInRange.map((date) => {
    const matchingItems = filteredData.filter(
      (item) => item.datetime.split("T")[0] === date
    );
    const accumulatedAmount = matchingItems.reduce(
      (sum, item) => sum + item.amount,
      0
    );
    return { date: date, accumulatedAmount: accumulatedAmount };
  });

  return resultArray;
};

const getLineStyle = (foodType) => {
  switch (foodType) {
    case "none":
      return plotStyles.victoryTotalLine;
    case "dry":
      return plotStyles.victoryDryLine;
    case "wet":
      return plotStyles.victoryWetLine;
  }
};
