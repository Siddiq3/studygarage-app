import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "Davys Experiment  Lewis Dot Symbols", url: "https://youtu.be/0QpAI8R_WBc" },
  { label: "Electronic Theory Of Valence | Octet Rule | Cation  Anion", url: "https://youtu.be/cJn-y6SjUCs" },
  { label: "Ionic Bond | Formation Of NaCl, MgCl2, AlCl3 , Na2O | Factors", url: "https://youtu.be/d-jHhfBGoD8" },
  { label: "Covalent Bond | Formation of F2, O2, N2, CH4, NH3 and H2O", url: "https://youtu.be/kVS2iPDhV8k" },
  { label: "VSEPR Theory", url: "https://youtu.be/81FGI-l2kDI" },
  { label: "Valence Bond Theory", url: "https://youtu.be/w3tgxAoWT1E" },
];

const Chemical = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Physics (EM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Chemical;
