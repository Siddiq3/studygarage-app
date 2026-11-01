import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "Electric Current -1", url: "https://youtu.be/5pYJsiTA0xc" },
  { label: "Electric Current -1", url: "https://youtu.be/sp7HKJnPCOc" },
  { label: "Electric Current -1", url: "https://youtu.be/8J-VXT8z_Ic" },
  { label: "Electric Current -1", url: "https://youtu.be/MjEePoBxjMM" },
];

const Curent = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Physics (EM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Curent;
