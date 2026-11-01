import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "1. Electromagnetism - 1 | Oersted experiment", url: "https://youtu.be/wai3u_KF8Mo" },
  { label: "Electromagnetism - 2", url: "https://youtu.be/R2ip2nfJzhc" },
  { label: "Electromagnetism - 3", url: "https://youtu.be/C2hxqVy70XA" },
  { label: "Electromagnetism - 4", url: "https://youtu.be/DdJLvTEpK18" },
  { label: "Electromagnetism -5", url: "https://youtu.be/QsIyecP_980" },
  { label: "Electromagnetism - 6", url: "https://youtu.be/5UyHDRN-iSo" },
];

const Electro = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Physics (TM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Electro;
