import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "Coordination", url: "https://youtu.be/ccG5cRzrBnc" },
  { label: "Responding in Stimuli", url: "https://youtu.be/P22FyYg432E" },
  { label: "Integrating pathways-Nervous", url: "https://youtu.be/iNAlZZhL96o" },
  { label: "Central Nervous System(CNS)", url: "https://youtu.be/VReqS33NE6Y" },
  { label: "Coordination without Nerves", url: "https://youtu.be/7B11Bhh3Brg" },
  { label: "Other Chemical Coordinators", url: "https://youtu.be/xfUEGZ2ebog" },
  { label: "Endocrine Glands", url: "https://youtu.be/0YdB0zCS5l4" },
  { label: "Autonomous Nervous System", url: "https://youtu.be/-4zv2eyyDf8" },
  { label: "Control Mechanisms in Plants", url: "https://youtu.be/gt4P1DPjIU8" },
  { label: "Tropic and Nastic Movements in Plants", url: "https://youtu.be/WPmh9jnCvVw" },
];

const Coordination = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Biology (EM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Coordination;
