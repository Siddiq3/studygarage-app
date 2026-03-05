import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated';
import Coin from './Coin';

export default function WalletPill({
  balance = 50,
  popToken = 0,
  deltaToken = 0,
  deltaAmount = 50,
  showClaimed = false,
}) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (!popToken) return;

    scale.value = withSequence(
      withSpring(1.08, { damping: 10, stiffness: 260 }),
      withSpring(1, { damping: 12, stiffness: 240 })
    );
  }, [popToken, scale]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View className="items-end">
      <Animated.View
        style={[
          style,
          {
            shadowColor: '#A68A3B',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.12,
            shadowRadius: 9,
            elevation: 3,
          },
        ]}
        className="rounded-full border border-white/15 bg-white/8 px-3 py-2"
      >
        <View className="flex-row items-center gap-2">
          <Ionicons name="wallet-outline" size={16} color="#FFFFFF" />
          <Coin size={16} compact />
          <Text className="text-[13px] font-black text-white">{balance}</Text>
        </View>
      </Animated.View>

      {deltaToken ? (
        <MotiView
          key={`wallet-delta-${deltaToken}`}
          from={{ opacity: 0, translateY: 2, scale: 0.92 }}
          animate={{ opacity: 1, translateY: -20, scale: 1 }}
          transition={{ type: 'timing', duration: 680 }}
          className="absolute -right-1 -top-4 rounded-full border border-[#FACF39]/35 bg-[#2A2516]/70 px-2 py-0.5"
        >
          <Text className="text-[11px] font-extrabold text-[#FFE38A]">+{deltaAmount}</Text>
        </MotiView>
      ) : null}

      {showClaimed ? (
        <MotiView
          from={{ opacity: 0, translateY: -6, scale: 0.92 }}
          animate={{ opacity: 1, translateY: 0, scale: 1 }}
          transition={{ type: 'timing', duration: 260 }}
          className="mt-1.5 rounded-full border border-[#3AD69F]/45 bg-[#133727] px-2.5 py-1"
        >
          <Text className="text-[10px] font-extrabold text-[#9AF3CF]">Claimed ✅</Text>
        </MotiView>
      ) : null}
    </View>
  );
}
