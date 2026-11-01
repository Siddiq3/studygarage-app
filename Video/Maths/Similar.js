import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "Similar Triangle Part-1", url: "https://youtu.be/weMi7riojQ8" },
  { label: "Similar Triangle Part-2", url: "https://youtu.be/RdU15mkIZbQ" },
];

const Similar = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Mathematics (EM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Similar;
