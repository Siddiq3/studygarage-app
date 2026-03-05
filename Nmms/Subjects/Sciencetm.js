import React from 'react';
import RemoteLabelHub from '../../src/features/hubs/RemoteLabelHub';

const Nmmssit = ({ navigation }) => {
  const items = [
    { key: 'nmmssit1', route: 'nmmssit1' },
    { key: 'nmmssit2', route: 'nmmssit2' },
    { key: 'nmmssit3', route: 'nmmssit3' },
    { key: 'nmmssit4', route: 'nmmssit4' },
  ];

  return (
    <RemoteLabelHub
      navigation={navigation}
      title="NMMS Science TM"
      subtitle="Topic-wise learning modules"
      dataUrl="https://siddiq3.github.io/Api/nmms.json"
      items={items}
    />
  );
};

export default Nmmssit;
