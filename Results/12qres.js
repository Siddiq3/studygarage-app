import React from 'react';
import SimpleScoreResultScreen from '../src/features/results/SimpleScoreResultScreen';

const Qres12 = (props) => (
  <SimpleScoreResultScreen
    {...props}
    threshold={30}
    homeRoute="10th class"
    answersRoute="11thToday Answer"
  />
);

export default Qres12;
