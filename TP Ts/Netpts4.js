import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Netpts4 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/testpapers.json'
      resultIndex={0}
      resultPath='Netp4ts'
      screenName='netpts4'
    />
  );
};

export default Netpts4;
