import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Etsism = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Etssm'
      screenName='etsism'
    />
  );
};

export default Etsism;
