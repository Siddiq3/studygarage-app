import React from 'react';
import { Image, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ScreenLayoutContainer from './src/design-system/components/ScreenLayoutContainer';
import SGCard from './src/design-system/components/SGCard';
import SGButton from './src/design-system/components/SGButton';

const Mtres = ({ navigation, route }) => {
  const { score } = route.params;

  const resultBanner =
    score >= 60
      ? 'https://cdni.iconscout.com/illustration/premium/thumb/men-celebrating-victory-4587301-3856211.png'
      : 'https://cdni.iconscout.com/illustration/free/thumb/concept-about-business-failure-1862195-1580189.png';

  return (
    <ScreenLayoutContainer variant="reward" contentClassName="px-4" scroll>
      <Animated.View entering={FadeInDown.duration(240)}>
        <SGCard className="mb-4 items-center">
          <Text className="text-[12px] font-sg-bold text-sg-muted">Mock Test</Text>
          <Text className="mt-1 text-[30px] font-sg-display leading-[34px] text-sg-text">Results</Text>
          <Text className="mt-1 text-[48px] font-sg-display text-[#1C7C55]">{score}</Text>

          <Image
            source={{ uri: resultBanner }}
            className="mt-1 h-[280px] w-[280px]"
            resizeMode="contain"
          />

          <View className="w-full pt-2">
            <SGButton
              label="Go To Home"
              onPress={() => navigation.navigate('Ap10th class')}
            />
          </View>
        </SGCard>
      </Animated.View>
    </ScreenLayoutContainer>
  );
};

export default Mtres;
