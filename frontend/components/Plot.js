import React from "react";
import { View } from "@ant-design/react-native";

import { VictoryChart, VictoryAxis, VictoryLine } from "victory-native";

export const TimeLinePlot = ({ data, foodType = "none" }) => {
  return (
    <View>
      <VictoryChart width={350} height={350}>
        <VictoryAxis
          dependentAxis
          tickFormat={(tick) => `${tick}`}
          style={{
            axis: { stroke: "#756f6a" },
            ticks: { stroke: "grey", size: 5 },
            tickLabels: { fontSize: 10, padding: 5 },
          }}
        />
        <VictoryAxis
          tickFormat={(tick) => new Date(tick).toLocaleDateString()}
          style={{
            axis: { stroke: "#756f6a" },
            ticks: { stroke: "grey", size: 5 },
            tickLabels: { fontSize: 10, padding: 5 },
          }}
        />
        <VictoryLine
          data={data ? foodType === "none" : filterFoodType(data, foodType)}
          x="datetime"
          y="amount"
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc" },
          }}
        />
      </VictoryChart>
    </View>
  );
};

const filterFoodType = (data, foodType) => {
  return data.filter((item) => item.food_choice === foodType);
};
