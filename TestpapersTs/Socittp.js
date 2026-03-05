import React from 'react';
import StaticRouteListScreen from '../src/features/lists/StaticRouteListScreen';

const Socttpts = ({ navigation }) => {
  return (
    <StaticRouteListScreen
      navigation={navigation}
      title='Test Papers'
      subtitle='Open a paper set to continue practice'
      items={[
    { label: 'TestPaper-1', screen: 'socialtm ts tp1' },
    { label: 'TestPaper-2', screen: 'socialtm ts tp2' },
    { label: 'TestPaper-3', screen: 'socialtm ts tp3' },
    { label: 'TestPaper-4', screen: 'socialtm ts tp4' },
      ]}
    />
  );
};

export default Socttpts;
