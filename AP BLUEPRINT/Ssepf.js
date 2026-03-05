import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Seapb = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Seapb'
      screenName='seapb'
    />
  );
};

export default Seapb;
