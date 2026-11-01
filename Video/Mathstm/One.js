import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "వాస్తవ సంఖ్యలు మొత్తం అభ్యాసం 1.1", url: "https://youtu.be/B48dmS6gIWQ" },
  { label: "వాస్తవ సంఖ్యలు మొత్తం అభ్యాసం 1.2", url: "https://youtu.be/gXa3Ua2kne4" },
  { label: "వాస్తవ సంఖ్యలు మొత్తం అభ్యాసం 1.3", url: "https://youtu.be/ScIgeCvPgrY" },
  { label: "వాస్తవ సంఖ్యలు మొత్తం అభ్యాసం 1.4", url: "https://youtu.be/3tSWy34cdLU" },
  { label: "వాస్తవ సంఖ్యలు మొత్తం అభ్యాసం 1.5", url: "https://youtu.be/dyIzJfzymo8" },
];

const One = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Mathematics (TM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default One;
