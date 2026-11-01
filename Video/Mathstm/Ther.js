import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "సంభావ్యత (Probability) | Introduction", url: "https://youtu.be/ji67SexJ_jo" },
  { label: "సంభావ్యత(PROBABILITY) | అభ్యాసం 13.1 | మొత్తం ప్రాబ్లమ్స్", url: "https://youtu.be/z8dYahQGkns" },
  { label: "సంభావ్యత(PROBABILITY) | అభ్యాసం 13.2 | మొత్తం ప్రాబ్లమ్స్", url: "https://youtu.be/fRrhHGyOht8" },
];

const Thre = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Mathematics (TM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Thre;
