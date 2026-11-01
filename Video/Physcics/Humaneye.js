import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "మానవుని కన్ను రంగుల ప్రపంచం -1", url: "https://youtu.be/Q34ESPAJpWo" },
  { label: "మానవుని కన్ను రంగుల ప్రపంచం -2", url: "https://youtu.be/z6Y3PmITH8U" },
  { label: "మానవుని కన్ను రంగుల ప్రపంచం -3", url: "https://youtu.be/StMfJHw1bfE" },
  { label: "మానవుని కన్ను రంగుల ప్రపంచం -4", url: "https://youtu.be/QfTz0QmVFz8" },
  { label: "మానవుని కన్ను రంగుల ప్రపంచం -5", url: "https://youtu.be/AdHNlgylk4E" },
  { label: "మానవుని కన్ను రంగుల ప్రపంచం Problmes-1", url: "https://youtu.be/Rwz-ICUWScQ" },
  { label: "మానవుని కన్ను రంగుల ప్రపంచం Problmes-2", url: "https://youtu.be/3Q9TIXViqi4" },
];

const Human = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Physics (TM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Human;
