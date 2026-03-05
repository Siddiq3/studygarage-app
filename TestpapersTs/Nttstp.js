import React from 'react';
import StaticRouteListScreen from '../src/features/lists/StaticRouteListScreen';

const Nttpts = ({ navigation }) => {
  return (
    <StaticRouteListScreen
      navigation={navigation}
      title='Test Papers'
      subtitle='Open a paper set to continue practice'
      items={[
        { label: 'TestPaper-1', screen: 'nstm ts tp1' },
        { label: 'TestPaper-2', screen: 'nstm ts tp2' },
        { label: 'TestPaper-3', screen: 'nstm ts tp3' },
        { label: 'TestPaper-4', screen: 'nstm ts tp4' },
      ]}
    />
  );
};

export default Nttpts;
