import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "Coordinate Geometry Part-1", url: "https://youtu.be/gfzTWvs-7Hc" },
  { label: "Coordinate Geometry Part-2", url: "https://youtu.be/83ZD8CDKGqk" },
];

const Coord = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Mathematics (EM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Coord;
