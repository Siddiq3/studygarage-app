import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "ఉష్ణం - ఉష్ణోగ్రత -1", url: "https://youtu.be/Bte-lkclZWk" },
  { label: "ఉష్ణం -ఉష్ణోగ్రత -2", url: " https://youtu.be/RwCr2vkUwh8" },
  { label: "ఉష్ణం 3 ఉష్ణ బదిలీ, ఉష్ణ సమతాస్ధితి", url: "https://youtu.be/D7tXPd11rEM " },
  { label: "విశిష్టోష్ణం", url: "https://youtu.be/tiHQBk_0Nqg" },
  { label: "ఘన పదార్థాల విశిష్టోష్ణం", url: " https://youtu.be/4xYXCw6UIfE" },
  { label: "విశిష్టోష్ణం అనువర్తనాలు", url: " https://youtu.be/VgTYAUIOxuY" },
  { label: "మిశ్రమాల పద్దతి  సూత్రం", url: "https://youtu.be/1wp1ZcIQxPc" },
  { label: "భాష్పీభవనము", url: "https://youtu.be/5ZUfi74MsXM" },
  { label: "భాష్పీభవనం పై గాలి ప్రభావం –కృత్యం", url: "https://youtu.be/PkCFR4U4stc" },
  { label: "సాంద్రీకరణము", url: "https://youtu.be/Ej0o_JEv27Y" },
  { label: "మరగడం", url: "https://youtu.be/ikrg_pCVAHY" },
  { label: "ద్రవీభవనం ఘనీభవనం", url: "https://youtu.be/gRdPXolCai0" },
];

const Heat = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Physics (TM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Heat;
