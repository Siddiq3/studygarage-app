import React from 'react';
import ChapterActionListScreen from '../src/features/chapters/ChapterActionListScreen';

const Physicse = (props) => (
  <ChapterActionListScreen
    {...props}
    title="Physical Science (English) Video Explanations"
    subtitle="Open any chapter to continue learning"
    items={[
      { label: '1. Heat', screen: 'Heat' },
      { label: '2. Acids, Bases and Salts', url: 'https://youtu.be/-HdLhWJo90Y' },
      { label: '3. Refraction of Light at Plane Surfaces', screen: 'plane' },
      { label: '4. Refraction of Light at Curved Surfaces', screen: 'curved' },
      { label: '5. Human Eye and Colourful World', screen: 'eye' },
      { label: '6. Structure of Atom', screen: 'atom' },
      { label: '7. Classification of Elements - The Periodic Table', url: 'https://youtu.be/BgUgbdiNUUQ' },
      { label: '8. Chemical Bonding', screen: 'chemical' },
      { label: '9. Electric Current', screen: 'current' },
      { label: '10. Electromagnetism', screen: 'electro' },
      { label: '11. Principles of Metallurgy', url: 'https://youtu.be/R7xPGLV3FB0' },
      { label: '12. Carbon and its Compounds', url: 'https://youtu.be/1HaE_37dWU0' },
    ]}
  />
);

export default Physicse;
