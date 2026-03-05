import React from 'react';
import StaticRouteListScreen from '../src/features/lists/StaticRouteListScreen';

const Hintpts = ({ navigation }) => {
  return (
    <StaticRouteListScreen
      navigation={navigation}
      title='Test Papers'
      subtitle='Open a paper set to continue practice'
      items={[
        { label: 'TestPaper-1', screen: 'hindi ts tp1' },
        { label: 'TestPaper-2', screen: 'hindi ts tp2' },
        { label: 'TestPaper-3', screen: 'hindi ts tp3' },
        { label: 'TestPaper-4', screen: 'hindi ts tp4' },
      ]}
    />
  );
};

export default Hintpts;
