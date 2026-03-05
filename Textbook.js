import React from 'react';
import SimpleSubjectHub from './src/features/hubs/SimpleSubjectHub';

const Textbook = ({ navigation }) => {
  const items = [
    { label: 'TELUGU', route: 'telugu textbook' },
    { label: 'HINDI', route: 'hindi textbook' },
    { label: 'ENGLISH', route: 'english textbook' },
    { label: 'MATHEMATICS-EM', route: 'maths em textbook' },
    { label: 'MATHEMATICS-TM', route: 'maths tm textbook' },
    { label: 'BIOLOGY-EM', route: 'biology em textbook' },
    { label: 'BIOLOGY-TM', route: 'biology tm textbook' },
    { label: 'PHYSICAL SCIENCE-EM', route: 'physics em textbook' },
    { label: 'PHYSICAL SCIENCE-TM', route: 'physics tm textbook' },
    { label: 'SOCIAL-TM', route: 'social tm textbook' },
    { label: 'SOCIAL-EM', route: 'social em textbook' },
  ];

  return (
    <SimpleSubjectHub
      navigation={navigation}
      title="Textbooks"
      subtitle="Open chapter books by subject"
      items={items}
    />
  );
};

export default Textbook;
