import React from 'react';
import { Image, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import useInterstitialAd from '../../../InterstitialAdComponent';
import MrecAdComponent from '../../../MrecAdComponent';
import ScreenLayoutContainer from '../../design-system/components/ScreenLayoutContainer';
import SGCard from '../../design-system/components/SGCard';
import SGButton from '../../design-system/components/SGButton';

const SUCCESS_BANNER = 'https://cdni.iconscout.com/illustration/premium/thumb/men-celebrating-victory-4587301-3856211.png';
const FAILURE_BANNER = 'https://cdni.iconscout.com/illustration/free/thumb/concept-about-business-failure-1862195-1580189.png';

export default function SimpleScoreResultScreen({
  route,
  navigation,
  title = 'RESULTS',
  homeRoute = '10th class',
  answersRoute,
  threshold = 30,
  homeButtonLabel = 'GO TO HOME',
  answersButtonLabel = 'Click Here for Answers',
}) {
  const score = Number(route?.params?.score || 0);
  const { showAd } = useInterstitialAd();

  const handleNavigate = (screen) => {
    if (!screen) return;
    showAd();
    navigation.navigate(screen);
  };

  const resultBanner = score >= threshold ? SUCCESS_BANNER : FAILURE_BANNER;

  return (
    <ScreenLayoutContainer variant="home" contentClassName="px-4 pb-6" scroll>
      <Animated.View entering={FadeInDown.duration(220)}>
        <SGCard className="mb-4 items-center">
          <Text className="text-[11px] font-bold uppercase tracking-[1.1px] text-sg-muted dark:text-sgd-muted">Result Summary</Text>
          <Text className="mt-1 text-[30px] font-black text-sg-text dark:text-sgd-text">{title}</Text>
          <Text className="mt-3 text-[46px] font-black text-[#00D48A]">{score}</Text>
        </SGCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(70).duration(220)}>
        <SGCard className="mb-4 items-center py-5">
          <Image source={{ uri: resultBanner }} className="h-[260px] w-[260px]" resizeMode="contain" />
        </SGCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(120).duration(220)}>
        <SGCard className="mb-4 gap-3">
          <SGButton label={homeButtonLabel} onPress={() => handleNavigate(homeRoute)} />
          {answersRoute ? <SGButton label={answersButtonLabel} variant="ghost" onPress={() => handleNavigate(answersRoute)} /> : null}
        </SGCard>
      </Animated.View>

      <View className="mb-4">
        <MrecAdComponent />
      </View>
    </ScreenLayoutContainer>
  );
}
