import React from 'react';
import DetailedQuizResultScreen from '../src/features/results/DetailedQuizResultScreen';

const Qres10ts = (props) => (
  <DetailedQuizResultScreen
    {...props}
    retryTarget="SubjectDataPage"
    backBehavior="goBack"
    adOnScore
    showRetry
  />
);

export default Qres10ts;
