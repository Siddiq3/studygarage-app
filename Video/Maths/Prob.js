import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "Probability Part-1", url: "https://youtu.be/R-kOgTUxRVk" },
  { label: "Probability Part-2", url: "https://youtu.be/ltNnEherDks" },
];

const Prob = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Mathematics (EM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Prob;
