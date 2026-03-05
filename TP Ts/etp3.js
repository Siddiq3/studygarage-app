import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Etpts3 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/testpapers.json'
      resultIndex={0}
      resultPath='etp3ts'
      screenName='etpts3'
    />
  );
};

export default Etpts3;
