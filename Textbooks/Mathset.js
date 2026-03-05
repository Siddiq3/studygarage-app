import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Mathset = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/impquestion.json'
      resultIndex={0}
      resultPath='mathset'
      screenName='mathset'
    />
  );
};

export default Mathset;
