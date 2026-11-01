import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "Polynomial Part-1", url: "https://youtu.be/r-fMQWOt5SU" },
  { label: "Polynomial Part-2", url: "https://youtu.be/l2h0Lm2DvuQ" },
];

const Poly = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Mathematics (EM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Poly;
