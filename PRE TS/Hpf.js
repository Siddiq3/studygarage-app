import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Hpfts = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/prefinal.json'
      resultIndex={0}
      resultPath='Hpfts'
      screenName='hpfts'
    />
  );
};

export default Hpfts;
