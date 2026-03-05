import React from 'react';
import DetailedQuizResultScreen from '../src/features/results/DetailedQuizResultScreen';

const Qres9 = (props) => (
  <DetailedQuizResultScreen
    {...props}
    retryTarget="SubjectDataPage"
    backBehavior="goBack"
    adOnScore={false}
    showRetry
  />
);

export default Qres9;
