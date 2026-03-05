import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Netpts1 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/testpapers.json'
      resultIndex={0}
      resultPath='Netp1ts'
      screenName='netpts1'
    />
  );
};

export default Netpts1;
