import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Etpts1 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/testpapers.json'
      resultIndex={0}
      resultPath='etp1ts'
      screenName='etpts1'
    />
  );
};

export default Etpts1;
