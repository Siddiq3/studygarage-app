import React, { useEffect } from 'react';
import { BackHandler, View } from 'react-native';
import BannerAdComponent from './BannerAd';
import MrecAdComponent from './MrecAdComponent';
import useInterstitialAd from './InterstitialAdComponent';
import SimpleSubjectHub from './src/features/hubs/SimpleSubjectHub';
import SGCard from './src/design-system/components/SGCard';

const Home = ({ navigation }) => {
  const { showAd } = useInterstitialAd();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const handleNavigate = (screen) => {
    showAd();
    navigation.navigate(screen);
  };

  const items = [
    { id: 'telugu', label: 'TELUGU', onPress: () => handleNavigate('telugu') },
    { id: 'hindi', label: 'HINDI', onPress: () => handleNavigate('hindi') },
    { id: 'english', label: 'ENGLISH', onPress: () => handleNavigate('english') },
    { id: 'maths-em', label: 'MATHEMATICS-EM', onPress: () => handleNavigate('maths em') },
    { id: 'maths-tm', label: 'MATHEMATICS-TM', onPress: () => handleNavigate('maths tm') },
    { id: 'bio-em', label: 'BIOLOGY-EM', onPress: () => handleNavigate('biology em') },
    { id: 'bio-tm', label: 'BIOLOGY-TM', onPress: () => handleNavigate('biology tm') },
    { id: 'phy-em', label: 'PHYSICAL SCIENCE-EM', onPress: () => handleNavigate('physics em') },
    { id: 'phy-tm', label: 'PHYSICAL SCIENCE-TM', onPress: () => handleNavigate('physics tm') },
    { id: 'social-tm', label: 'SOCIAL-TM', onPress: () => handleNavigate('social tm') },
    { id: 'social-em', label: 'SOCIAL-EM', onPress: () => handleNavigate('social em') },
  ];

  const footer = (
    <View className="pb-3">
      <SGCard className="mb-3 items-center">
        <BannerAdComponent />
      </SGCard>
      <SGCard className="items-center">
        <MrecAdComponent />
      </SGCard>
    </View>
  );

  return (
    <SimpleSubjectHub
      navigation={navigation}
      title="Previous Year Question Papers"
      subtitle="Open subject-wise AP 10th previous papers"
      items={items}
      footer={footer}
      variant="home"
    />
  );
};

export default Home;
