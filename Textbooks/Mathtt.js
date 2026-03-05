import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Mathtt = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/impquestion.json'
      resultIndex={0}
      resultPath='mathstt'
      screenName='mathtt'
    />
  );
};

export default Mathtt;
