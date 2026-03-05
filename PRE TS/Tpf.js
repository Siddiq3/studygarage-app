import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Tpfts = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/prefinal.json'
      resultIndex={0}
      resultPath='Tpfts'
      screenName='tpfts'
    />
  );
};

export default Tpfts;
