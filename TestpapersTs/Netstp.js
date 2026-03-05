import React from 'react';
import StaticRouteListScreen from '../src/features/lists/StaticRouteListScreen';

const Netpts = ({ navigation }) => {
  return (
    <StaticRouteListScreen
      navigation={navigation}
      title='Test Papers'
      subtitle='Open a paper set to continue practice'
      items={[
        { label: 'TestPaper-1', screen: 'nsem ts tp1' },
        { label: 'TestPaper-2', screen: 'nsem ts tp2' },
        { label: 'TestPaper-3', screen: 'nsem ts tp3' },
        { label: 'TestPaper-4', screen: 'nsem ts tp4' },
      ]}
    />
  );
};

export default Netpts;
