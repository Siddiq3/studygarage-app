import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Etpts4 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/testpapers.json'
      resultIndex={0}
      resultPath='etp4ts'
      screenName='etpts4'
    />
  );
};

export default Etpts4;
