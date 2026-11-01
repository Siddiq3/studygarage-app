import React from 'react';
import ChapterActionListScreen from '../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "Maths Material", screen: "maths Material" },
  { label: "Real Numbers", url: "https://youtu.be/SN9oNfMLAhA" },
  { label: "Sets", url: "https://youtu.be/nylyvwSccG8" },
  { label: "Polynomial", url: "https://youtu.be/l68uX91eeJ0" },
  { label: "Pair of Linear Equations in Two Variables", url: "https://youtu.be/yqBHtw_2KwM" },
  { label: "Quadratic Equations", url: "https://youtu.be/rJKqF2iMj6k" },
  { label: "Progression", url: "https://youtu.be/mDJxHCZwunM" },
  { label: "Coordinate Geometry", url: "https://youtu.be/Mc7mAJA5lG0" },
  { label: "Trigonometry part-1", url: "https://youtu.be/e2CH7MekM0o" },
  { label: "Trigonometry part-2", url: "https://youtu.be/GgPBKRIWBvs" },
  { label: "Model Paper Explanation", url: "https://youtu.be/NsvnpvayPQo" },
];

const Mathsiiit = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Maths Video Explanation for IIIT/Polycet/NTSE"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Mathsiiit;
