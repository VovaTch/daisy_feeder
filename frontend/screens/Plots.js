import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory-native";

import { fetchFeedItem } from "../api/fetch/fetchFeedItem";
import { BASE_PATH_DEVELOPMENT } from "../api/proxy/settings";

export default function PlotScreen() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFeedItem(setData, setIsLoading, BASE_PATH_DEVELOPMENT);
  }, []);

  return (
    <ScrollView>
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
            data={data}
            x="datetime"
            y="amount"
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc" },
            }}
          />
        </VictoryChart>
      </View>
    </ScrollView>
  );
}
