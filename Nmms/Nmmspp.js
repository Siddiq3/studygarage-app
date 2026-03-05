import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import RemoteLabelHub from '../src/features/hubs/RemoteLabelHub';

const Nmmspp = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const items = [
    { key: 'nmms2023em', route: 'nmms2023em' },
    { key: 'nmms2023tm', route: 'nmms2023tm' },
    { key: 'nmms2022em', route: 'nmms2022em' },
    { key: 'nmms2022tm', route: 'nmms2022tm' },
    { key: 'nmms2019em1', route: 'nmms2019em1' },
    { key: 'nmms2019em2', route: 'nmms2019em2' },
    { key: 'nmms2019em3', route: 'nmms2019em3' },
    { key: 'nmms2019em4', route: 'nmms2019em4' },
    { key: 'nmms2019tm1', route: 'nmms2019tm1' },
    { key: 'nmms2019tm2', route: 'nmms2019tm2' },
    { key: 'nmms2019tm3', route: 'nmms2019tm3' },
    { key: 'nmms2019tm4', route: 'nmms2019tm4' },
    { key: 'nmms2018em1', route: 'nmms2018em1' },
    { key: 'nmms2018em2', route: 'nmms2018em2' },
    { key: 'nmms2018em3', route: 'nmms2018em3' },
    { key: 'nmms2018em4', route: 'nmms2018em4' },
    { key: 'nmms2018tm1', route: 'nmms2018tm1' },
    { key: 'nmms2018tm2', route: 'nmms2018tm2' },
    { key: 'nmms2018tm3', route: 'nmms2018tm3' },
    { key: 'nmms2018tm4', route: 'nmms2018tm4' },
    { key: 'nmms2017em', route: 'nmms2017em' },
    { key: 'nmms2017tm', route: 'nmms2017tm' },
    { key: 'nmms2016em', route: 'nmms2016em' },
    { key: 'nmms2016tm', route: 'nmms2016tm' },
    { key: 'nmms2015em', route: 'nmms2015em' },
    { key: 'nmms2015tm', route: 'nmms2015tm' },
    { key: 'nmms2014em', route: 'nmms2014em' },
    { key: 'nmms2014tm', route: 'nmms2014tm' },
  ];

  return (
    <RemoteLabelHub
      navigation={navigation}
      title="NMMS Previous Papers"
      subtitle="Year-wise papers in English and Telugu mediums"
      dataUrl="https://siddiq3.github.io/Api/nmms.json"
      items={items}
    />
  );
};

export default Nmmspp;
