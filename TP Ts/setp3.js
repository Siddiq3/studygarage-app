import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Setpts3 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/testpapers.json'
      resultIndex={0}
      resultPath='Setp3ts'
      screenName='setpts3'
    />
  );
};

export default Setpts3;
