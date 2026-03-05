import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Peapb = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Peapb'
      screenName='peapb'
    />
  );
};

export default Peapb;
