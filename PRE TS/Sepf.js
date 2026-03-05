import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Sepfts = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/prefinal.json'
      resultIndex={0}
      resultPath='Sepfts'
      screenName='sepfts'
    />
  );
};

export default Sepfts;
