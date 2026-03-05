import React from 'react';
import ChapterActionListScreen from '../src/features/chapters/ChapterActionListScreen';

const Mathsee = (props) => (
  <ChapterActionListScreen
    {...props}
    title="Maths (English) Video Explanations"
    subtitle="Open any chapter to continue learning"
    items={[
      { label: '1 Real Numbers', screen: 'real numbers' },
      { label: '2 Sets', screen: 'sets' },
      { label: '3 Polynomials', screen: 'polynomials' },
      { label: '4 Pair of Linear Equations in Two Variables', url: 'https://youtu.be/NeMs_ydV4dY' },
      { label: '5 Quadratic Equations', url: 'https://youtu.be/zp3NZ6Fr-sE' },
      { label: '6 Progressions', url: 'https://youtu.be/gKJtrtTn49E' },
      { label: '7 Coordinate Geometry', screen: 'coordinate' },
      { label: '8 Similar Triangles', screen: 'similar' },
      { label: '9 Tangents and Secants to a Circle', screen: 'tangents' },
      { label: '10 Mensuration', url: 'https://youtu.be/AzV28RGJUlI' },
      { label: '11 Trigonometry', screen: 'trigonometry' },
      { label: '12 Applications of Trigonometry', url: 'https://youtu.be/92qg_Un-OVw' },
      { label: '13 Probability', screen: 'probability' },
      { label: '14 Statistics', screen: 'stats' },
    ]}
  />
);

export default Mathsee;
