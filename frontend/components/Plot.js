import React from "react";

function getDataForPlot(data) {
  return data.map((item) => ({
    x: item.datetime,
    y: item.amount,
  }));
}

export const TimeLinePlot = ({ data }) => {};
