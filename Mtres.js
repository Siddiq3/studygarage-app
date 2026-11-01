import React from 'react';
import { Image, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ScreenLayoutContainer from './src/design-system/components/ScreenLayoutContainer';
import SGButton from './src/design-system/components/SGButton';

const Mtres = ({ navigation, route }) => {
  const { score } = route.params;

  const resultBanner =
    score >= 60
      ? 'https://cdni.iconscout.com/illustration/premium/thumb/men-celebrating-victory-4587301-3856211.png'
      : 'https://cdni.iconscout.com/illustration/free/thumb/concept-about-business-failure-1862195-1580189.png';

  return (
    <ScreenLayoutContainer variant="board" contentClassName="px-4" scroll>
      <View className="flex-1 pt-10">
        <Text className="text-[16px] font-sg-semibold text-[#B5C6BB]">Mock test score</Text>
        <Text
          className="font-sg-display text-[#F2B632]"
          style={{ fontSize: 120, lineHeight: 128, letterSpacing: -4, fontVariant: ['tabular-nums'] }}
        >
          {score}
        </Text>
        <Text className="text-[32px] leading-[36px] font-sg-display text-[#F4EFE2]">
          {score >= 60 ? 'You crushed it.' : 'Run it back.'}
        </Text>
        <View className="mt-6 items-center rounded-[18px] bg-[#FFFCF5] py-3">
          <Image source={{ uri: resultBanner }} className="h-[200px] w-[200px]" resizeMode="contain" accessibilityLabel="Result illustration" />
        </View>
        <SGButton label="Go to home" variant="board" onPress={() => navigation.navigate('SecondPage')} className="mt-5" />
      </View>
    </ScreenLayoutContainer>
  );
};

export default Mtres;
