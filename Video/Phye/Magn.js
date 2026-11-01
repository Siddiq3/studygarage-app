import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "OERSTEDS EXPERIMENT", url: "https://youtu.be/uHBdiPx_1EA" },
  { label: "Magnetic Field- field", url: "https://youtu.be/yqV8EXhzoRs" },
  { label: "Magnetic Flux and Magnetic Flux density", url: "https://youtu.be/oPE5RjLzZSI" },
  { label: "Magnetic Field Due To Current Carrying Long St. Wire", url: "https://youtu.be/wwu1UdPVTjg" },
  { label: "Magnetic Field Due to Current Carrying Circular Coil", url: "https://youtu.be/sMs3jBAacIA" },
  { label: "Solenoid", url: "https://youtu.be/QO6SvUB40pA" },
  { label: "RIGHT HAND RULE", url: "https://youtu.be/2Gg1Phu0_dc" },
];

const Magn = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Physics (EM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Magn;
