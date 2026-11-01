import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "వర్గ సమీకరణాలు | అభ్యాసం 5.1 | మొత్తం ప్రాబ్లమ్స్", url: "https://youtu.be/Zr4QqzQdKnc" },
  { label: "వర్గ సమీకరణాలు | అభ్యాసం 5.2 | మొత్తం ప్రాబ్లమ్స్", url: "https://youtu.be/urh52q5xMtQ" },
  { label: "వర్గ సమీకరణాలు | అభ్యాసం 5.3 | మొత్తం ప్రాబ్లమ్స్", url: "https://youtu.be/QMESznH2NSY" },
  { label: "వర్గ సమీకరణాలు | అభ్యాసం 5.4 | మొత్తం ప్రాబ్లమ్స్", url: "https://youtu.be/on3NofiI6cw" },
];

const Five = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Mathematics (TM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Five;
