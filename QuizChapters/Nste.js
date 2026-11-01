import React from 'react';
import StaticRouteListScreen from '../src/features/lists/StaticRouteListScreen';

const items = [
  { label: "పోషణ – ఆహార సరఫరా వ్యవస్థ", screen: "Nt1" },
  { label: "శ్వాసక్రియ –శక్తి ఉత్పాదక వ్యవస్థ", screen: "Nt2" },
  { label: "ప్రసరణ –పదార్థ రవాణా వ్యవస్థ", screen: "Nt3" },
  { label: "విసర్జన –వ్యర్థాల తొలగింపు వ్యవస్థ", screen: "Nt4" },
  { label: "నియంత్రణ –సమన్వయ వ్యవస్థ", screen: "Nt5" },
  { label: "ప్రత్యుత్పత్తి –పునరుత్పాదక వ్యవస్థ", screen: "Nt6" },
  { label: "జీవక్రియలలో సమన్వయం", screen: "Nt7" },
];

const Nste1 = ({ navigation }) => (
  <StaticRouteListScreen navigation={navigation} title={"Biology (TM)"} subtitle="Choose a chapter to start the quiz" items={items} />
);

export default Nste1;
