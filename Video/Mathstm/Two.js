import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "సమితులు", url: "https://youtu.be/VEh9d5AwxSQ" },
  { label: "సమితులు అభ్యాసం 2.1 | Q.No. 1 to 4", url: "https://youtu.be/Y4lzAcdcBos" },
  { label: "సమితులు  అభ్యాసం 2.1 | Q.No. 5 to 8", url: "https://youtu.be/uChF5W2nOrQ" },
  { label: "సమితులు అభ్యాసం 2.2 | మొత్తం ప్రాబ్లమ్స్", url: "https://youtu.be/Uo7f7bHAay0" },
  { label: "సమితులు వెన్ చిత్రాలు", url: "https://youtu.be/YkJpj6cHr24" },
  { label: "సమితులు అభ్యాసం 2.3 | మొత్తం ప్రాబ్లమ్స్", url: "https://youtu.be/Hv1_6p6I9Qs" },
  { label: "సమితులు అభ్యాసం 2.4 | మొత్తం ప్రాబ్లమ్స్", url: "https://youtu.be/Wp-KLodfQ8o" },
];

const Two = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Mathematics (TM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Two;
