import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "త్రికోణమితి అనువర్తనాలు | ఊర్థ్వ మరియు నిమ్న కోణాలు", url: "https://youtu.be/dMrTryyTS18" },
  { label: "త్రికోణమితి అనువర్తనాలు | అభ్యాసం 12.1 | మొత్తం ప్రాబ్లమ్స్", url: "త్రికోణమితి అనువర్తనాలు | అభ్యాసం 12.1 | మొత్తం ప్రాబ్లమ్స్" },
];

const Twve = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Mathematics (TM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Twve;
