import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Meapb = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Meapb'
      screenName='meapb'
    />
  );
};

export default Meapb;
