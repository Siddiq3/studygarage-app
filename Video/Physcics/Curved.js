import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "1. refraction of light through curved surfaces–1(TM)", url: "https://youtu.be/2_6MbwmOBmc" },
  { label: "2. refraction of light through curved surfaces –2 (TM)", url: "https://youtu.be/gM4_ajvCBIU" },
  { label: "2. refraction of light through curved surfaces – 3 (TM)", url: "https://youtu.be/9uuTKHH_270" },
  { label: "కటకాలపై కాంతి కిరణాల ప్రవర్తన", url: "https://youtu.be/L0RjcZiGExw" },
  { label: "Types of lenses", url: "https://youtu.be/k7B4VhuITuA" },
  { label: "Image by curved surfaces - refraction formula for curved surfaces (TM )R", url: "https://youtu.be/dqI6degWm2U" },
  { label: "Ray diagrams of lenses కటకాల కిరణ చిత్రాలు", url: "https://youtu.be/5jAuz71E9p4" },
];

const Curved = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Physics (TM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Curved;
