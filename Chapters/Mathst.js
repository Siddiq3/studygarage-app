import React from 'react';
import ChapterActionListScreen from '../src/features/chapters/ChapterActionListScreen';

const Mathste = (props) => (
  <ChapterActionListScreen
    {...props}
    title="Maths (Telugu) Video Explanations"
    subtitle="Open any chapter to continue learning"
    items={[
      { label: '1 వాస్తవ సంఖ్యలు', screen: 'chapter1' },
      { label: '2 సమితులు', screen: 'chapter2' },
      { label: '3 బహుపదులు', screen: 'chapter3' },
      { label: '4 రెండు చరరాశులలో రేఖీయ సమీకరణాల జత', screen: 'chapter4' },
      { label: '5 వర్గ సమీకరణాలు', screen: 'chapter5' },
      { label: '6 శ్రేఢులు', screen: 'chapter6' },
      { label: '7 నిరూపక రేఖాగణితం', screen: 'chapter7' },
      { label: '8 సరూప త్రిభుజాలు', screen: 'chapter8' },
      { label: '9 వృత్తాలకు స్పర్శరేఖలు మరియు ఛేదనరేఖలు', screen: 'chapter9' },
      { label: '10 క్షేత్రమితి', screen: 'chapter10' },
      { label: '11 త్రికోణమితి', screen: 'chapter11' },
      { label: '12 త్రికోణమితి అనువర్తనాలు', screen: 'chapter12' },
      { label: '13 సంభావ్యత', screen: 'chapter13' },
      { label: '14 సాంఖ్యకశాస్త్రం', screen: 'chapter14' },
    ]}
  />
);

export default Mathste;
