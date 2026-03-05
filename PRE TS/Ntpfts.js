import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Ntpfts = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/prefinal.json'
      resultIndex={0}
      resultPath='Ntpfts'
      screenName='ntpfts'
    />
  );
};

export default Ntpfts;
