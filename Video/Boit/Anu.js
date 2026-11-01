import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "Part-1", url: "https://youtu.be/bfm_WKn9wg0" },
  { label: "Part-2", url: "https://youtu.be/JgdIsQz3ZHM" },
];

const Anu = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Biology (TM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Anu;
