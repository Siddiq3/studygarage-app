import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "త్రికోణమితి | అభ్యాసం 11.1 | మొత్తం ప్రాబ్లమ్స్", url: "https://youtu.be/4cCm64kgiIo" },
  { label: "త్రికోణమితి () | అభ్యాసం 11.2 | మొత్తం ప్రాబ్లమ్స్", url: "https://youtu.be/vvbUy8tsXg0" },
  { label: "త్రికోణమితి () | అభ్యాసం 11.3| మొత్తం ప్రాబ్లమ్స్", url: "https://youtu.be/l8OBrsswdIE" },
  { label: "త్రికోణమితి () | అభ్యాసం 11.4 | మొత్తం ప్రాబ్లమ్స్", url: "https://youtu.be/Xvsx1f-4uhk" },
];

const Leve = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Mathematics (TM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Leve;
