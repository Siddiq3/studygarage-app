import React from 'react';
import StaticRouteListScreen from '../src/features/lists/StaticRouteListScreen';

const Socetpts = ({ navigation }) => {
  return (
    <StaticRouteListScreen
      navigation={navigation}
      title='Test Papers'
      subtitle='Open a paper set to continue practice'
      items={[
    { label: 'TestPaper-1', screen: 'socialem ts tp1' },
    { label: 'TestPaper-2', screen: 'socialem ts tp2' },
    { label: 'TestPaper-3', screen: 'socialem ts tp3' },
    { label: 'TestPaper-4', screen: 'socialem ts tp4' },
      ]}
    />
  );
};

export default Socetpts;
