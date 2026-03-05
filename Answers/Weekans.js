import React from 'react';
import RemoteAnswerListScreen from '../src/features/answers/RemoteAnswerListScreen';

const Weekans = (props) => (
  <RemoteAnswerListScreen
    {...props}
    fetchUrl="https://siddiq3.github.io/Api/WeekQuizapi.json"
    title="Weekly Answer Key"
    subtitle="Review the weekly challenge answers"
  />
);

export default Weekans;
