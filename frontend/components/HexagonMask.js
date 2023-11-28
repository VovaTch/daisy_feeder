import React from 'react';
import { View, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import MaskedView from '@react-native-masked-view/masked-view';

export const HexagonMask = ({ imageSource, size, cornerRadius }) => {

  const roundedHexagonPath = `
    M${size / 2} 0
    Q${size} ${size / 8} ${size} ${size / 4}
    L${size} ${(3 / 4) * size}
    Q${size} ${(7 / 8) * size} ${size / 2} ${size}
    L0 ${(3 / 4) * size}
    Q0 ${(5 / 8) * size} 0 ${(3 / 4) * size / 2}
    Z
  `;

  console.log(imageSource);

  return (
    <MaskedView
      style={{ flex: 1 }}
      maskElement={
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Svg height={size} width={size}>
            <Path d={roundedHexagonPath} fill="#ffffff" />
          </Svg>
        </View>
      }
    >
      <Image
        source={imageSource}
        style={{ width: size, height: size, resizeMode: 'cover', borderRadius: cornerRadius }}
      />
    </MaskedView>
  );
};
