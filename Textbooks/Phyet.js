import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Phyet = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/impquestion.json'
      resultIndex={0}
      resultPath='phyet'
      screenName='phyet'
    />
  );
};

export default Phyet;
