import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "REFRACTION OF LIGHT AT CURVED SURFACES PART-1", url: "https://youtu.be/dvOhSlKUOD8" },
  { label: "REFRACTION OF LIGHT AT CURVED SURFACES PART-2", url: "https://youtu.be/q4c5Ll118no" },
  { label: "REFRACTION OF LIGHT AT CURVED SURFACES PART-3", url: "https://youtu.be/s-i1TKd9vQE" },
  { label: "REFRACTION OF LIGHT AT CURVED SURFACES PART-4", url: "https://youtu.be/s-i1TKd9vQE" },
  { label: "REFRACTION OF LIGHT AT CURVED SURFACES PART-5", url: "https://youtu.be/I3hFJqFmV2Q" },
  { label: "REFRACTION OF LIGHT AT CURVED SURFACES PART-6", url: "https://youtu.be/IhFYqR-zttY" },
  { label: "REFRACTION OF LIGHT AT CURVED SURFACES PART-7", url: "https://youtu.be/36S5Laul7RI" },
  { label: "REFRACTION OF LIGHT AT CURVED SURFACES PART-8", url: "https://youtu.be/MhDtm93utfk" },
  { label: "REFRACTION OF LIGHT AT CURVED SURFACES PART-9", url: "https://youtu.be/PxLD15N7A08" },
  { label: "REFRACTION OF LIGHT AT CURVED SURFACES PART-10", url: "https://youtu.be/Oo6smi4LyF4" },
];

const Refraction = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Physics (EM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Refraction;
