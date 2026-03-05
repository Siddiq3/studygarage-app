import React from 'react';
import SimpleScoreResultScreen from '../src/features/results/SimpleScoreResultScreen';

const WeekResult = (props) => (
  <SimpleScoreResultScreen
    {...props}
    threshold={60}
    homeRoute="10th class"
    answersRoute="Weekly Answer"
  />
);

export default WeekResult;
