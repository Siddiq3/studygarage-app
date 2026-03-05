import React, { useEffect } from 'react';
import { BackHandler, View } from 'react-native';
import MrecAdComponent from '../MrecAdComponent';
import SimpleSubjectHub from '../src/features/hubs/SimpleSubjectHub';
import SGCard from '../src/design-system/components/SGCard';

const Tspoly = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const items = [
    { label: '2022 Papers', route: 'poly2022t' },
    { label: '2021 Papers', route: 'poly2021t' },
    { label: '2020 Papers', route: 'poly2020t' },
    { label: '2019 Papers', route: 'poly2019t' },
    { label: '2018 Papers', route: 'poly2018t' },
    { label: '2017 Papers', route: 'poly2017t' },
    { label: '2016 Papers', route: 'poly2016t' },
  ];

  const footer = (
    <View className="pb-3">
      <SGCard className="items-center">
        <MrecAdComponent />
      </SGCard>
    </View>
  );

  return (
    <SimpleSubjectHub
      navigation={navigation}
      title="TS Polycet"
      subtitle="Year-wise previous papers"
      items={items}
      footer={footer}
    />
  );
};

export default Tspoly;
