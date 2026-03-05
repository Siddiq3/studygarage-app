import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Engt = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/impquestion.json'
      resultIndex={0}
      resultPath='telugut'
      screenName='engt'
    />
  );
};

export default Engt;
