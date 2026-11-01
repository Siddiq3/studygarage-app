import React from 'react';
import { Image, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import useInterstitialAd from '../../../InterstitialAdComponent';
import MrecAdComponent from '../../../MrecAdComponent';
import ScreenLayoutContainer from '../../design-system/components/ScreenLayoutContainer';
import ScreenHeader from '../../design-system/components/ScreenHeader';
import SGButton from '../../design-system/components/SGButton';

const SUCCESS_BANNER = 'https://cdni.iconscout.com/illustration/premium/thumb/men-celebrating-victory-4587301-3856211.png';
const FAILURE_BANNER = 'https://cdni.iconscout.com/illustration/free/thumb/concept-about-business-failure-1862195-1580189.png';

export default function SimpleScoreResultScreen({
  route,
  navigation,
  title = 'Results',
  homeRoute = '10th class',
  answersRoute,
  threshold = 30,
  homeButtonLabel = 'Go to home',
  answersButtonLabel = 'See the answers',
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
    <ScreenLayoutContainer variant="board" contentClassName="px-4 pb-6" scroll>
      <ScreenHeader board eyebrow="Result summary" title={title} className="mb-6" />

      <Animated.View className="mb-5">
        <Text className="text-[13px] font-sg-semibold text-[#B5C6BB]">Score</Text>
        <Text className="text-[72px] leading-[78px] font-sg-display tracking-[-2px] text-[#F2B632]" style={{ fontVariant: ['tabular-nums'] }}>
          {score}
        </Text>
      </Animated.View>

      <Animated.View className="mb-5 items-center rounded-[18px] bg-[#FFFCF5] py-4">
        <Image source={{ uri: resultBanner }} className="h-[200px] w-[200px]" resizeMode="contain" accessibilityLabel="Result illustration" />
      </Animated.View>

      <Animated.View className="mb-5 gap-2.5">
        <SGButton label={homeButtonLabel} variant="board" onPress={() => handleNavigate(homeRoute)} />
        {answersRoute ? <SGButton label={answersButtonLabel} variant="boardGhost" onPress={() => handleNavigate(answersRoute)} /> : null}
      </Animated.View>

      <View className="mb-4">
        <MrecAdComponent />
      </View>
    </ScreenLayoutContainer>
  );
}
