import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Netssm = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Netssm'
      screenName='netssm'
    />
  );
};

export default Netssm;
