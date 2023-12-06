import React from "react";
import { View } from "react-native";
import { Svg } from "react-native-svg";
import Defs from "react-native-svg";
import ClipPath from "react-native-svg";
import Polygon from "react-native-svg";

const HexagonMask = ({ size }) => {
  const hexagonWidth = size;
  const hexagonHeight = (Math.sqrt(3) * hexagonWidth) / 2;

  const points = [
    `${hexagonWidth / 2},0`,
    `${hexagonWidth}, ${hexagonHeight / 4}`,
    `${hexagonWidth}, ${(hexagonHeight * 3) / 4}`,
    `${hexagonWidth / 2}, ${hexagonHeight}`,
    `0, ${(hexagonHeight * 3) / 4}`,
    `0, ${hexagonHeight / 4}`,
  ];
  console.log(points.join(" "));

  return (
    <View>
      <Svg height={hexagonHeight} width={hexagonWidth}>
        <Defs>
          <ClipPath id="hexagonClip">
            <Polygon points={points.join(" ")} fill="black" />
          </ClipPath>
        </Defs>
        <Polygon points={points.join(" ")} fill="#fff" />
      </Svg>
    </View>
  );
};

export default HexagonMask;
