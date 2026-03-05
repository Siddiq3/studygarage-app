import React from 'react';
import RemoteLabelHub from '../../src/features/hubs/RemoteLabelHub';

const Nmmssoe = ({ navigation }) => {
  const items = [
    { key: 'nmmssoe1', route: 'nmmssoe1' },
    { key: 'nmmssoe2', route: 'nmmssoe2' },
    { key: 'nmmssoe3', route: 'nmmssoe3' },
    { key: 'nmmssoe4', route: 'nmmssoe4' },
    { key: 'nmmssoe5', route: 'nmmssoe5' },
    { key: 'nmmssoe6', route: 'nmmssoe6' },
    { key: 'nmmssoe7', route: 'nmmssoe7' },
    { key: 'nmmssoe8', route: 'nmmssoe8' },
    { key: 'nmmssoe9', route: 'nmmssoe9' },
    { key: 'nmmssoe10', route: 'nmmssoe10' },
  ];

  return (
    <RemoteLabelHub
      navigation={navigation}
      title="NMMS Social EM"
      subtitle="Topic-wise learning modules"
      dataUrl="https://siddiq3.github.io/Api/nmms.json"
      items={items}
    />
  );
};

export default Nmmssoe;
