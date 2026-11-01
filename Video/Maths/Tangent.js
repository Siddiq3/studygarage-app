import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "Tangent and Secants to a Triangle Part-1", url: "https://youtu.be/20_D27hQjIc" },
  { label: "Tangent and Secants to a Triangle Part-2", url: "https://youtu.be/tRfrVIH50K4" },
];

const Tangent = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Mathematics (EM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Tangent;
