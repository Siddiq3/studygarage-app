import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Sttpts2 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/testpapers.json'
      resultIndex={0}
      resultPath='Sttp2ts'
      screenName='sttpts2'
    />
  );
};

export default Sttpts2;
