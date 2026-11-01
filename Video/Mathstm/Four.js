import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "రెండు చరరాశులలో రెఖీయ సమీకరణాల జత | Introduction", url: "https://youtu.be/gF1W6juT4hQ" },
  { label: "రరెండు చరరాశులలో రెఖీయ సమీకరణాల జత | అభ్యాసం 4.1", url: "https://youtu.be/Xp8pOFeCQO0" },
  { label: "రెండు చరరాశులలో రెఖీయ సమీకరణాల జత | అభ్యాసం 4.1 | Q.No.3", url: "https://youtu.be/ASIjnluKk8A" },
];

const Four = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Mathematics (TM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Four;
