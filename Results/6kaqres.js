import React from 'react';
import DetailedQuizResultScreen from '../src/features/results/DetailedQuizResultScreen';

const Qres6ka = (props) => (
  <DetailedQuizResultScreen
    {...props}
    showRetry={false}
    backBehavior="goBack"
    adOnScore
  />
);

export default Qres6ka;
