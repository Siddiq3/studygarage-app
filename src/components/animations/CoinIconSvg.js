import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export default function CoinIconSvg({ size = 20 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="11" fill="#FACF39" stroke="#FFB800" strokeWidth="1.4" />
      <Circle cx="12" cy="12" r="7.5" fill="#FFE07A" opacity="0.7" />
      <Path
        d="M9.25 8.75h4.9a2.35 2.35 0 0 1 0 4.7H10.4a2.35 2.35 0 0 0 0 4.7h4.35"
        stroke="#8A5E00"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path d="M12 7.5v9" stroke="#8A5E00" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  );
}
