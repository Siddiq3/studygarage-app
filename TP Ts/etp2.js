import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Etpts2 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/testpapers.json'
      resultIndex={0}
      resultPath='etp2ts'
      screenName='etpts2'
    />
  );
};

export default Etpts2;
