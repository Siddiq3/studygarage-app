import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "Real Numbers Part-1", url: "https://youtu.be/ZuSGh0JbK3k" },
  { label: "Real Numbers Part-2", url: "https://youtu.be/9gGwNN0Pc04" },
  { label: "Real Numbers Part-3", url: "https://youtu.be/8Kp8okXG5XU" },
];

const Real = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Mathematics (EM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Real;
