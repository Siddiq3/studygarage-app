import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "LEAST DISTANCE OF DISTINCT VISION", url: "https://youtu.be/3YqtlNgYGZI" },
  { label: "STRUCTURE OF HUMAN EYE", url: "https://youtu.be/PjmFFEBuP6Y" },
  { label: "MYOPIA - EYE DEFECT", url: "https://youtu.be/C1Kv2eXEVZI" },
  { label: "HYPERMETROPIA - PRESBYOPIA", url: "https://youtu.be/Srtj5n4ykO4" },
  { label: "REFRACTIVE INDEX OF A PRISM", url: "https://youtu.be/ZrsmNiLBcyE" },
  { label: "DISPERSION OF LIGHT THROUGH A PRISM", url: "https://youtu.be/5ROQXdAvv_I" },
  { label: "RAINBOW FORMATION", url: "https://youtu.be/NHY6HvUh120" },
  { label: "SCATTERING OF LIGHT", url: "https://youtu.be/wvxqh0imjuA" },
];

const Eye = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Physics (EM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Eye;
