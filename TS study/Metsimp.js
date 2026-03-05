import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Metssm = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Metssm'
      screenName='metssm'
    />
  );
};

export default Metssm;
