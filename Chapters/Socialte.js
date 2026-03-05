import React from 'react';
import ChapterActionListScreen from '../src/features/chapters/ChapterActionListScreen';

const Socialte = (props) => (
  <ChapterActionListScreen
    {...props}
    title="Social (Telugu) Video Explanations"
    subtitle="Open a chapter to continue"
    items={[
      { label: '1 భారతదేశం: భౌగోళిక స్వరూపాలు', url: 'https://youtu.be/XQ6wjGneIwo' },
      { label: '2 అభివృద్ధి భావనలు', url: 'https://youtu.be/voI6qAvIjKY' },
      { label: '3 ఉత్పత్తి, ఉపాధి', url: 'https://youtu.be/3IM1p513zT4' },
    ]}
  />
);

export default Socialte;
