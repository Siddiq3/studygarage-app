import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Mttpts2 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/testpapers.json'
      resultIndex={0}
      resultPath='Mttp2ts'
      screenName='mttpts2'
    />
  );
};

export default Mttpts2;
