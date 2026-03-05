import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Petsb = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Petsb'
      screenName='petsb'
    />
  );
};

export default Petsb;
