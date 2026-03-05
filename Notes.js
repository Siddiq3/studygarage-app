import React from 'react';
import RemoteLabelHub from './src/features/hubs/RemoteLabelHub';

const Notes = ({ navigation }) => {
  const items = [
    { key: 'note10', route: 'note10' },
    { key: 'note10t', route: 'note10t' },
    { key: 'note9', route: 'note9' },
    { key: 'note9t', route: 'note9t' },
    { key: 'note8', route: 'note8' },
    { key: 'note8t', route: 'note8t' },
    { key: 'note7', route: 'note7' },
    { key: 'note7t', route: 'note7t' },
    { key: 'note6', route: 'note6' },
    { key: 'note6t', route: 'note6t' },
  ];

  return (
    <RemoteLabelHub
      navigation={navigation}
      title="Notes"
      subtitle="Choose class and medium notes"
      dataUrl="https://siddiq3.github.io/Api/notes.json"
      items={items}
    />
  );
};

export default Notes;
