import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "నిరూపక రేఖా గణితం | అభ్యాసం 7.1  మొత్తం ప్రాబ్లమ్స్", url: "https://youtu.be/vIxGwT8l4cI" },
  { label: "నిరూపక రేఖా గణితం | అభ్యాసం 7.2 | మొత్తం ప్రాబ్లమ్స్", url: "https://youtu.be/MiBBBMNcNgY" },
  { label: "నిరూపక రేఖా గణితం | అభ్యాసం 7.3 | మొత్తం ప్రాబ్లమ్స్", url: "https://youtu.be/NjB1bpRZOPw" },
];

const Sev = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Mathematics (TM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Sev;
