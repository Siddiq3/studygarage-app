import React from 'react';
import StaticRouteListScreen from './src/features/lists/StaticRouteListScreen';

const items = [
  { label: 'Biology (TM)', screen: 'Biology tmq' },
  { label: 'Physical Science (TM)', screen: 'Physics tmq' },
  { label: 'Physical Science (EM)', screen: 'Physics emq' },
  { label: 'Social (TM)', screen: 'Social tmq' },
];

const Quiz = ({ navigation }) => (
  <StaticRouteListScreen
    navigation={navigation}
    title="Chapter quizzes"
    subtitle="Remaining subjects are coming soon"
    items={items}
  />
);

export default Quiz;
