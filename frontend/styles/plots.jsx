import { StyleSheet } from "react-native";

export const plotStyles = StyleSheet.create({
  container: {
    // backgroundColor: "orange"
  },
  plotCard: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderColor: "#eee",
    borderWidth: 0,
    borderRadius: 10,
    margin: 15,
  },
  victoryAxisStyle: {
    axis: { stroke: "#756f6a" },
    ticks: { stroke: "grey", size: 5 },
    tickLabels: { fontSize: 10, padding: 5 },
    axisLabel: { padding: 30 },
  },
  victoryTotalLine: {
    data: { stroke: "#0d6623", strokeWidth: 5 },
    parent: { border: "3px solid #ccc" },
  },
  victoryDryLine: {
    data: { stroke: "#660d0d", strokeWidth: 5 },
    parent: { border: "3px solid #ccc" },
  },
  victoryWetLine: {
    data: { stroke: "#031ca7", strokeWidth: 5 },
    parent: { border: "3px solid #ccc" },
  },
});
