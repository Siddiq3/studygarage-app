import React from 'react';
import SimpleSubjectHub from './src/features/hubs/SimpleSubjectHub';

const Testpapers = ({ navigation }) => {
  const items = [
    { label: 'TELUGU', route: 'telugu testpapers' },
    { label: 'HINDI', route: 'hindi testpapers' },
    { label: 'ENGLISH', route: 'english testpapers' },
    { label: 'MATHEMATICS-EM', route: 'maths em testpapers' },
    { label: 'MATHEMATICS-TM', route: 'maths tm testpapers' },
    { label: 'PS & NS-EM', route: 'physics em testpapers' },
    { label: 'PS & NS-TM', route: 'physics tm testpapers' },
    { label: 'SOCIAL-TM', route: 'social tm testpapers' },
    { label: 'SOCIAL-EM', route: 'social em testpapers' },
  ];

  return (
    <SimpleSubjectHub
      navigation={navigation}
      title="Test Papers"
      subtitle="Practice timed subject tests"
      items={items}
    />
  );
};

export default Testpapers;
