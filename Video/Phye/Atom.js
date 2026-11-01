import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "Structure of Atom-1", url: "https://youtu.be/vdGtbBbtbRI" },
  { label: "Structure of Atom-2", url: "https://youtu.be/Mepat5glTMU" },
  { label: "Structure of Atom-3", url: "https://youtu.be/Qv2RvBpkOx0" },
  { label: "Structure of Atom-4", url: "https://youtu.be/Is5ckLj-hWA" },
  { label: "Structure of Atom-5", url: "https://youtu.be/sTE0YU8ntnY" },
  { label: "Structure of Atom-1", url: "https://youtu.be/QjEB6R-VPxc" },
  { label: "Structure of Atom-1", url: "https://youtu.be/_2-0NUQ_dCM" },
];

const Atom = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Physics (EM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Atom;
