import React from 'react';
import RemoteLabelHub from '../../src/features/hubs/RemoteLabelHub';

const Nmmsmt = ({ navigation }) => {
  const items = [
    { key: 'nmmsmt1', route: 'nmmsmt1' },
    { key: 'nmmsmt2', route: 'nmmsmt2' },
    { key: 'nmmsmt3', route: 'nmmsmt3' },
    { key: 'nmmsmt4', route: 'nmmsmt4' },
    { key: 'nmmsmt5', route: 'nmmsmt5' },
    { key: 'nmmsmt6', route: 'nmmsmt6' },
    { key: 'nmmsmt7', route: 'nmmsmt7' },
    { key: 'nmmsmt8', route: 'nmmsmt8' },
    { key: 'nmmsmt9', route: 'nmmsmt9' },
    { key: 'nmmsmt10', route: 'nmmsmt10' },
  ];

  return (
    <RemoteLabelHub
      navigation={navigation}
      title="NMMS Maths TM"
      subtitle="Topic-wise learning modules"
      dataUrl="https://siddiq3.github.io/Api/nmms.json"
      items={items}
    />
  );
};

export default Nmmsmt;
