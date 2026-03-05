import React from 'react';
import ModernContentWebView from '../../components/ModernContentWebView';

const Eng6tb = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/class6to9.json'
      resultIndex={0}
      resultPath='english6tb'
      screenName='eng6tb'
    />
  );
};

export default Eng6tb;
