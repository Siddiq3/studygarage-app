import React from 'react';
import ChapterActionListScreen from '../src/features/chapters/ChapterActionListScreen';

const Nsee = (props) => (
  <ChapterActionListScreen
    {...props}
    title="Biology (English) Video Explanations"
    subtitle="Open any chapter to continue learning"
    items={[
      { label: '1 Nutrition', url: 'https://youtu.be/EjuRUvDDa0U' },
      { label: '2 Respiration', url: 'https://youtu.be/wizRGgIVdi4' },
      { label: '3 Transportation', url: 'https://youtu.be/APAIKgRSDho' },
      { label: '4 Excretion', url: 'https://youtu.be/fd-Vgc73VRQ' },
      { label: '5 Coordination', url: 'https://youtu.be/mdFM5zFCyeY' },
      { label: '6 Reproduction', url: 'https://youtu.be/Arrg1wvXWgI' },
      { label: '7 Coordination in Life Processes', screen: 'coordinations' },
      { label: '8 Heredity', url: 'https://youtu.be/CsKDXDYYwTI' },
      { label: '9 Our Environment', screen: 'environment' },
      { label: '10 Natural Resources', screen: 'natural' },
    ]}
  />
);

export default Nsee;
