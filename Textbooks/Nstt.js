import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Nstt = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/impquestion.json'
      resultIndex={0}
      resultPath='nstt'
      screenName='nstt'
    />
  );
};

export default Nstt;
