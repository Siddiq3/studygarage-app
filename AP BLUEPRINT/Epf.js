import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Eapb = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Eapb'
      screenName='eapb'
    />
  );
};

export default Eapb;
