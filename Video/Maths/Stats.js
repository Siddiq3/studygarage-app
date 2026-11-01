import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "Statistics Part-1", url: "https://youtu.be/0PFQw9-qvZU" },
  { label: "Statistics Part-2", url: "https://youtu.be/sFFRHSGoCWo" },
];

const Stats = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Mathematics (EM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Stats;
