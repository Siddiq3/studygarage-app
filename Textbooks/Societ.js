import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Societ = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/impquestion.json'
      resultIndex={0}
      resultPath='societ'
      screenName='societ'
    />
  );
};

export default Societ;
