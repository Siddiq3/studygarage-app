import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Socitt = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/impquestion.json'
      resultIndex={0}
      resultPath='socitt'
      screenName='socitt'
    />
  );
};

export default Socitt;
