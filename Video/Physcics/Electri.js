import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "Electricity - 1 [ INTRODUCTION ]", url: "https://youtu.be/qEzjCdLcVDg" },
  { label: "Electricity - 2 [ potential difference ]", url: "https://youtu.be/mYTWcyXc5f8" },
  { label: "Electricity - 3 { బ్యాటరీ ఎలా పనిచేస్తుంది}", url: "https://youtu.be/ZBpO9LQ6NGk" },
  { label: "Electricity - 4 [ ohms law ](TM)", url: "https://youtu.be/lyejdKoQTiE" },
  { label: "Electricity - 5 [ Limitations of ohms law ](TM)", url: "https://youtu.be/4e0knmGySW0" },
  { label: "Electricity - 6 [ factors effecting resistance ](TM)", url: "https://youtu.be/o0DLpW8Z6o4" },
  { label: "Electricity - 7 [ factors effecting resistance - 2 (TM)", url: "https://youtu.be/oE1RRquw0m0" },
  { label: "Electricity - 8 [ series connection of resistances (TM)", url: "https://youtu.be/UUVF2i_0my8" },
  { label: "Electricity - 9 (TM)| parallel connections of resistances", url: "https://youtu.be/TEXCkKfn-j8" },
  { label: "Electricity - 10 |10th PS(TM) | Kirchhoffs circuit Laws in  telugu", url: "https://youtu.be/uzesYd7r_vg" },
  { label: "Electricity - 11 (TM)", url: "https://youtu.be/bT_hqQYJyG8" },
  { label: "Electricity - 12 (TM) | Electric power", url: "https://youtu.be/ht2ONhcktaE" },
  { label: "Electricity - 13 (TM) | Over lode", url: "https://youtu.be/QKnTDBCvQKw" },
];

const Electri = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Physics (TM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Electri;
