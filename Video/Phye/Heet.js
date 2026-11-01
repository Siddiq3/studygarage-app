import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "Thermal Equilibrium-heat and Temperature", url: "https://youtu.be/sxhkJPtWwoE" },
  { label: "Temperature and Kinetic Energy", url: "https://youtu.be/xNZrSRy27f8" },
  { label: "Applications of Specific Heat Capacity", url: "https://youtu.be/XWRgFtqkUrE" },
  { label: "Principle of Calorimeter", url: "https://youtu.be/TXDzfauOLNc" },
  { label: "Evaporation", url: "https://youtu.be/ZtShL8kNWfE" },
  { label: "Evaporation Condensation", url: "https://youtu.be/cjSXiHIoibI" },
];

const Heet = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Physics (EM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Heet;
