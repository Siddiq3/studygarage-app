import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Htssm = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Htssm'
      screenName='htssm'
    />
  );
};

export default Htssm;
