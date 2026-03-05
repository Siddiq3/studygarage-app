import React from 'react';
import ChapterActionListScreen from '../src/features/chapters/ChapterActionListScreen';

const Nste = (props) => (
  <ChapterActionListScreen
    {...props}
    title="Biology (Telugu) Video Explanations"
    subtitle="Open any chapter to continue learning"
    items={[
      { label: '1. పోషణ – ఆహార సరఫరా వ్యవస్థ', url: 'https://youtu.be/EahhWsJU7uI' },
      { label: '2. శ్వాసక్రియ –శక్తి ఉత్పాదక వ్యవస్థ', url: 'https://youtu.be/WNq8teiva98' },
      { label: '3. ప్రసరణ –పదార్థ రవాణా వ్యవస్థ', url: 'https://youtu.be/L9RcaInYJxQ' },
      { label: '4. విసర్జన –వ్యర్థాల తొలగింపు వ్యవస్థ', screen: 'Chapter4' },
      { label: '5. నియంత్రణ –సమన్వయ వ్యవస్థ', screen: 'Chapter5' },
      { label: '6. ప్రత్యుత్పత్తి –పునరుత్పాదక వ్యవస్థ', url: 'https://youtu.be/Arrg1wvXWgI' },
      { label: '7. జీవక్రియలలో సమన్వయం', screen: 'Chapter7' },
      { label: '8. అనువంశికత –తరతరాలలో వైవిధ్యాలు', screen: 'Chapter8' },
      { label: '9. మన పర్యావరణం –మన బాధ్యత', screen: 'Chapter9' },
      { label: '10. సహజ వనరులు', screen: 'Chapter10' },
    ]}
  />
);

export default Nste;
