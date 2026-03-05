import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Ntapb = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Ntapb'
      screenName='ntapb'
    />
  );
};

export default Ntapb;
