import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Netpts2 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/testpapers.json'
      resultIndex={0}
      resultPath='Netp2ts'
      screenName='netpts2'
    />
  );
};

export default Netpts2;
