import React from 'react';
import StaticRouteListScreen from '../src/features/lists/StaticRouteListScreen';

const Matetpts = ({ navigation }) => {
  return (
    <StaticRouteListScreen
      navigation={navigation}
      title='Test Papers'
      subtitle='Open a paper set to continue practice'
      items={[
        { label: 'TestPaper-1', screen: 'mathsem ts tp1' },
        { label: 'TestPaper-2', screen: 'mathsem ts tp2' },
        { label: 'TestPaper-3', screen: 'mathsem tstp3' },
        { label: 'TestPaper-4', screen: 'mathsem ts tp4' },
      ]}
    />
  );
};

export default Matetpts;
