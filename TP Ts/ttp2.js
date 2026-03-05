import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Ttpts2 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/testpapers.json'
      resultIndex={0}
      resultPath='Ttp2ts'
      screenName='ttpts2'
    />
  );
};

export default Ttpts2;
