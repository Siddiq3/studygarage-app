import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Solutiondataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thsolutionska.json'
      destinationRoute='solutionPageka'
    />
  );
};

export default Solutiondataka;
