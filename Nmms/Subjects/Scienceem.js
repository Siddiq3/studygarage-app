import React from 'react';
import RemoteLabelHub from '../../src/features/hubs/RemoteLabelHub';

const Nmmssie = ({ navigation }) => {
  const items = [
    { key: 'nmmssie1', route: 'nmmssie1' },
    { key: 'nmmssie2', route: 'nmmssie2' },
    { key: 'nmmssie3', route: 'nmmssie3' },
    { key: 'nmmssie4', route: 'nmmssie4' },
  ];

  return (
    <RemoteLabelHub
      navigation={navigation}
      title="NMMS Science EM"
      subtitle="Topic-wise learning modules"
      dataUrl="https://siddiq3.github.io/Api/nmms.json"
      items={items}
    />
  );
};

export default Nmmssie;
