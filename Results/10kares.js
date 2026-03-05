import React from 'react';
import DetailedQuizResultScreen from '../src/features/results/DetailedQuizResultScreen';

const Qres10ka = (props) => (
  <DetailedQuizResultScreen
    {...props}
    retryTarget="SubjectDataPage"
    backBehavior="confirmHome"
    adOnScore
    showRetry
  />
);

export default Qres10ka;
