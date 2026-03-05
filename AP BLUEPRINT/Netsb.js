import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Neapb = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Neapb'
      screenName='neapb'
    />
  );
};

export default Neapb;
