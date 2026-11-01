import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "పరమాణు నిర్మాణం -1", url: "https://youtu.be/Q34ESPAJpWo" },
  { label: "పరమాణు నిర్మాణం -1", url: "https://youtu.be/rEsLnVMM_CI" },
  { label: "పరమాణు నిర్మాణం -1", url: "https://youtu.be/_pefWesqcbc" },
  { label: "పరమాణు నిర్మాణం -1", url: "https://youtu.be/ToTY38tzMkc" },
];

const Param = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Physics (TM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Param;
