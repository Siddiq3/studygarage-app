import React from 'react';
import RemoteLabelHub from '../../src/features/hubs/RemoteLabelHub';

const Nmmsme = ({ navigation }) => {
  const items = [
    { key: 'nmmsme1', route: 'nmmsme1' },
    { key: 'nmmsme2', route: 'nmmsme2' },
    { key: 'nmmsme3', route: 'nmmsme3' },
    { key: 'nmmsme4', route: 'nmmsme4' },
    { key: 'nmmsme5', route: 'nmmsme5' },
    { key: 'nmmsme6', route: 'nmmsme6' },
    { key: 'nmmsme7', route: 'nmmsme7' },
    { key: 'nmmsme8', route: 'nmmsme8' },
    { key: 'nmmsme9', route: 'nmmsme9' },
    { key: 'nmmsme10', route: 'nmmsme10' },
  ];

  return (
    <RemoteLabelHub
      navigation={navigation}
      title="NMMS Maths EM"
      subtitle="Topic-wise learning modules"
      dataUrl="https://siddiq3.github.io/Api/nmms.json"
      items={items}
    />
  );
};

export default Nmmsme;
