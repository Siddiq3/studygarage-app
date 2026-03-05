import React from 'react';
import StaticRouteListScreen from '../src/features/lists/StaticRouteListScreen';

const Phyttpts = ({ navigation }) => {
  return (
    <StaticRouteListScreen
      navigation={navigation}
      title='Test Papers'
      subtitle='Open a paper set to continue practice'
      items={[
    { label: 'TestPaper-1', screen: 'phytm ts tp1' },
    { label: 'TestPaper-2', screen: 'phytm ts tp2' },
    { label: 'TestPaper-3', screen: 'phytm ts tp3' },
    { label: 'TestPaper-4', screen: 'phytm ts tp4' },
      ]}
    />
  );
};

export default Phyttpts;
