import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Epfts = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/prefinal.json'
      resultIndex={0}
      resultPath='Epfts'
      screenName='epfts'
    />
  );
};

export default Epfts;
