import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "Sets Part-1", url: "https://youtu.be/ro0qq_VI36I" },
  { label: "Sets Part-2", url: "https://youtu.be/Wf9BzWLfC5U" },
  { label: "Real Numbers Part-3", url: "https://youtu.be/8Kp8okXG5XU" },
];

const Sets = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Mathematics (EM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Sets;
