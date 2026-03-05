import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Phytt = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/impquestion.json'
      resultIndex={0}
      resultPath='phytt'
      screenName='phytt'
    />
  );
};

export default Phytt;
