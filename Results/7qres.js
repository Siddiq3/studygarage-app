import React from 'react';
import DetailedQuizResultScreen from '../src/features/results/DetailedQuizResultScreen';

const Qres7 = (props) => (
  <DetailedQuizResultScreen
    {...props}
    showRetry={false}
    backBehavior="confirmHome"
    adOnScore
  />
);

export default Qres7;
