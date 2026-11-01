import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "బహుపధులు | నిర్వచనం, పరిమాణం , శూన్యాలు.", url: "https://youtu.be/KkIW3ivSHWY" },
  { label: "బహుపధులు | అభ్యాసం 3.1 | మొత్తం ప్రాబ్లమ్స్", url: "https://youtu.be/2KKx19zASzE" },
  { label: "బహుపధుల రేఖా చిత్రాలు", url: "https://youtu.be/RHKarjnsEPA" },
  { label: "బహుపధులు | అభ్యాసం 3.2 | మొత్తం ప్రాబ్లమ్స్.", url: "https://youtu.be/NkH7bYt89_c" },
  { label: "అభ్యాసం 3.3 | Q.No.1", url: "https://youtu.be/gHR41AwnaOs" },
  { label: "అభ్యాసం 3.3 | Q.No.2", url: "https://youtu.be/kVnIhx4eOVM" },
  { label: "అభ్యాసం 3.3 | Q.No.3,4", url: "https://youtu.be/8zS4--kIuDQ" },
  { label: "వర్గ బహుపధులు | గ్రాఫ్స్ (GRAPHS)", url: "https://youtu.be/YDad5f9EJLw" },
  { label: "బహుపధుల భాగాహారం | అభ్యాసం 3.4 | మొత్తం ప్రాబ్లమ్స్", url: "https://youtu.be/SwNUaiOogWc" },
];

const Thr = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Mathematics (TM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Thr;
