import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "our environment -1", url: "https://youtu.be/tmt7pt7ALMo" },
  { label: "our environment -2", url: "https://youtu.be/VjCI2eZSkxE" },
];

const Envi = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Biology (EM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Envi;
