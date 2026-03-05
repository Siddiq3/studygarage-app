import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Ptapb = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Ptapb'
      screenName='ptapb'
    />
  );
};

export default Ptapb;
