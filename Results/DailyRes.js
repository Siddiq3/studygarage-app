import React from 'react';
import DetailedQuizResultScreen from '../src/features/results/DetailedQuizResultScreen';

const DailyResult = (props) => (
  <DetailedQuizResultScreen
    {...props}
    retryTarget="SubjectDataPage"
    backBehavior="goBack"
    adOnScore
    showRetry
  />
);

export default DailyResult;
