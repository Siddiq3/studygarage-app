import React from 'react';
import ModernContentWebView from '../../../../components/ModernContentWebView';

const Mate10 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/Nmmssm.json'
      resultIndex={0}
      resultPath='Mate10'
      screenName='mate10'
    />
  );
};

export default Mate10;
