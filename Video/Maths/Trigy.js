import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "Trigonometry Part-1", url: "https://youtu.be/523pD5Yl-sc" },
  { label: "Trigonometry Part-2", url: "https://youtu.be/pWubM5nGpxw" },
  { label: "Trigonometry Part-3", url: "https://youtu.be/FNc4ol3mQro" },
  { label: "Trigonometry Part-4", url: "https://youtu.be/kTq7bWJNx_8" },
];

const Trigy = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Mathematics (EM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Trigy;
