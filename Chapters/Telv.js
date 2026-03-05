import React from 'react';
import ChapterActionListScreen from '../src/features/chapters/ChapterActionListScreen';

const Telv = (props) => (
  <ChapterActionListScreen
    {...props}
    title="Telugu Video Explanations"
    subtitle="Open a topic to continue"
    items={[
      { label: 'ప్రకృతి వికృతులు', url: 'https://youtu.be/0lQdldMIpjg' },
      { label: 'తెలుగు వ్యాకరణం | సంధులు', url: 'https://youtu.be/5a0W-tI7Ylg' },
      { label: 'grammar in Amaravathi lesson', url: 'https://youtu.be/_nocBp5Pykc' },
      { label: 'Nanarthalu', url: 'https://youtu.be/yuf5fLxtbzA' },
      { label: 'అలంకారములు', url: 'https://youtu.be/7EtMePPAp6o' },
      { label: 'సమాసాలు', url: 'https://youtu.be/CNbjMD4dtlk' },
    ]}
  />
);

export default Telv;
