import React from 'react';
import RemoteLabelHub from '../../src/features/hubs/RemoteLabelHub';

const Nmmssot = ({ navigation }) => {
  const items = [
    { key: 'nmmssot1', route: 'nmmssot1' },
    { key: 'nmmssot2', route: 'nmmssot2' },
    { key: 'nmmssot3', route: 'nmmssot3' },
    { key: 'nmmssot4', route: 'nmmssot4' },
    { key: 'nmmssot5', route: 'nmmssot5' },
    { key: 'nmmssot6', route: 'nmmssot6' },
    { key: 'nmmssot7', route: 'nmmssot7' },
    { key: 'nmmssot8', route: 'nmmssot8' },
    { key: 'nmmssot9', route: 'nmmssot9' },
    { key: 'nmmssot10', route: 'nmmssot10' },
  ];

  return (
    <RemoteLabelHub
      navigation={navigation}
      title="NMMS Social TM"
      subtitle="Topic-wise learning modules"
      dataUrl="https://siddiq3.github.io/Api/nmms.json"
      items={items}
    />
  );
};

export default Nmmssot;
