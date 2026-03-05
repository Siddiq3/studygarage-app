import React from 'react';
import StaticRouteListScreen from './src/features/lists/StaticRouteListScreen';

const Rivision = ({ navigation }) => {
  return (
    <StaticRouteListScreen
      navigation={navigation}
      title='Revision Test Papers'
      subtitle='Open a revision set and practice'
      items={[
        { label: 'Revision Test-1', screen: 'rivisiontest11' },
        { label: 'Revision Test-2', screen: 'rivisiontest21' },
        { label: 'Revision Test-3', screen: 'rivisiontest31' },
        { label: 'Revision Test-4', screen: 'rivisiontest41' },
      ]}
    />
  );
};

export default Rivision;
