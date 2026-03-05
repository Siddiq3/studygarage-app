import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Netpts3 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/testpapers.json'
      resultIndex={0}
      resultPath='Netp3ts'
      screenName='netpts3'
    />
  );
};

export default Netpts3;
