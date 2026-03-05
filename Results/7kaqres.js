import React from 'react';
import DetailedQuizResultScreen from '../src/features/results/DetailedQuizResultScreen';

const Qres7ka = (props) => (
  <DetailedQuizResultScreen
    {...props}
    retryTarget="ChapterDetails"
    backBehavior="goBack"
    adOnScore
    showRetry
  />
);

export default Qres7ka;
