import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Stpfts = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/prefinal.json'
      resultIndex={0}
      resultPath='Stpfts'
      screenName='stpfts'
    />
  );
};

export default Stpfts;
