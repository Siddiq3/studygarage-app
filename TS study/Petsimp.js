import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Petssm = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Petssm'
      screenName='petssm'
    />
  );
};

export default Petssm;
