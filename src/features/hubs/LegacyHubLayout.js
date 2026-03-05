import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import SGCard from '../../design-system/components/SGCard';
import AnimatedActionCard from '../../design-system/components/AnimatedActionCard';
import SGEmptyState from '../../design-system/components/SGEmptyState';

const featuredGradients = {
  quiz: ['#2F6BFF', '#27CFFF', '#7C5FFF'],
  weekly: ['#8D60FF', '#4B76FF', '#34C8FF'],
  focus: ['#FF7A66', '#FACF39', '#57CBE4'],
  reward: ['#3556D8', '#2F8DFC', '#39D0E2'],
};

const detectFeaturedTone = (label = '', index = 0) => {
  const text = String(label).toLowerCase();

  if (text.includes('daily') || text.includes('today') || text.includes('quiz')) {
    return 'quiz';
  }

  if (text.includes('weekly') || text.includes('week')) {
    return 'weekly';
  }

  if (
    text.includes('new') ||
    text.includes('latest') ||
    text.includes('focus') ||
    text.includes('revision')
  ) {
    return 'focus';
  }

  if (text.includes('reward') || text.includes('earn') || text.includes('coin')) {
    return 'reward';
  }

  if ([0, 5, 10].includes(index)) {
    return 'quiz';
  }

  return null;
};

export default function LegacyHubLayout({
  title,
  subtitle,
  buttons,
  isLoading,
  onQuizPress,
  quizDisabled,
  quizTitle,
  quizQuestion,
  lockedMessage,
  remainingTime,
  showQuizLoader = false,
}) {
  const featuredIndexToneMap = useMemo(() => {
    const map = new Map();

    if (!buttons?.length) {
      return map;
    }

    const candidates = buttons
      .map((button, index) => ({
        index,
        tone: detectFeaturedTone(button?.label, index),
      }))
      .filter((item) => item.tone);

    if (!candidates.length) {
      map.set(0, 'quiz');
      if (buttons.length > 1) {
        map.set(1, 'weekly');
      }
      return map;
    }

    candidates.slice(0, 2).forEach((item) => {
      map.set(item.index, item.tone);
    });

    if (map.size === 1 && buttons.length > 1) {
      const fallbackIndex = buttons.findIndex((_, index) => !map.has(index));
      if (fallbackIndex !== -1) {
        map.set(fallbackIndex, 'weekly');
      }
    }

    return map;
  }, [buttons]);

  if (isLoading) {
    return (
      <View className="w-full py-8">
        {[0, 1, 2].map((idx) => (
          <View key={`legacy-loading-${idx}`} className="mb-3 h-[64px] rounded-[18px] border border-white/10 bg-white/8" />
        ))}
      </View>
    );
  }

  return (
    <View className="w-full">
      <Animated.View entering={FadeInDown.duration(220)}>
        <SGCard className="mb-4">
          <Text className="text-[11px] font-bold uppercase tracking-[1.1px] text-sg-muted dark:text-sgd-muted">Main Modules</Text>
          <Text className="text-[24px] font-extrabold leading-[28px] text-sg-text dark:text-sgd-text">{title}</Text>
          {subtitle ? <Text className="mt-1 text-[13px] font-semibold text-sg-muted dark:text-sgd-muted">{subtitle}</Text> : null}

          {buttons?.length ? (
            <View className="mt-4 flex-row flex-wrap justify-between">
              {buttons.map((button, index) => {
                const featuredTone = featuredIndexToneMap.get(index) || null;

                return (
                  <Animated.View key={button.id || `${button.label}-${index}`} entering={FadeInDown.delay(30 + index * 14).duration(200)} className="mb-3 w-[31.8%]">
                    <AnimatedActionCard onPress={button.onPress} className="min-h-[88px]">
                    {featuredTone ? (
                      <LinearGradient
                        colors={featuredGradients[featuredTone]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="rounded-[20px] p-[1.2px]"
                      >
                        <View className="min-h-[86px] items-center justify-center rounded-[19px] border border-white/10 bg-[#111522]/90 px-2">
                          <Text className="text-center text-[13px] font-semibold leading-[17px] text-white">{button.label}</Text>
                        </View>
                      </LinearGradient>
                    ) : (
                      <View className="min-h-[88px] items-center justify-center rounded-[20px] border border-white/10 bg-[#111318]/95 px-2">
                        <View className="absolute inset-[1px] rounded-[19px] border border-white/5" />
                        <Text className="text-center text-[13px] font-semibold leading-[17px] text-white">{button.label}</Text>
                      </View>
                    )}
                    </AnimatedActionCard>
                  </Animated.View>
                );
              })}
            </View>
          ) : (
            <View className="mt-4">
              <SGEmptyState
                title="No modules available"
                subtitle="Try again in a while."
                badgeLabel="EMPTY"
              />
            </View>
          )}
        </SGCard>
      </Animated.View>

      {/* Daily Quiz section temporarily disabled across all class hubs. */}
      {false ? (
        <Animated.View entering={FadeInDown.delay(80).duration(220)}>
          <SGCard className="mb-4">
            <Text className="text-[11px] font-bold uppercase tracking-[1.1px] text-sg-muted dark:text-sgd-muted">Daily Quiz</Text>
            <Text className="text-[22px] font-extrabold leading-[26px] text-sg-text dark:text-sgd-text">Today's Quiz Questions</Text>

            <AnimatedActionCard onPress={onQuizPress} disabled={quizDisabled} className="mt-3">
              <LinearGradient
                colors={quizDisabled ? ['#352B2B', '#4A3131'] : ['#2B1E4A', '#3F2D6A', '#164736']}
                start={{ x: 0, y: 0.3 }}
                end={{ x: 1, y: 1 }}
                className="rounded-[20px] p-[1.2px]"
              >
                <View className={`rounded-[19px] border border-white/10 px-4 py-4 ${quizDisabled ? 'bg-black/35' : 'bg-black/26'}`}>
                  {quizDisabled ? (
                    <Text className="text-[13px] font-semibold leading-[19px] text-white/95">
                      {lockedMessage}
                      {'\n'}
                      {remainingTime}
                    </Text>
                  ) : (
                    <>
                      {showQuizLoader ? <Text className="text-[18px] font-bold text-white">Loading...</Text> : null}
                      {!showQuizLoader ? <Text className="text-[24px] font-extrabold leading-[28px] text-white">{quizTitle} Quiz</Text> : null}
                      {!showQuizLoader ? <Text className="mt-1 text-[15px] font-semibold text-white/95">Q. {quizQuestion}?</Text> : null}
                      <Text className="mt-2 text-[13px] font-medium text-[#BFEFD4]">Tap to attempt now</Text>
                    </>
                  )}
                </View>
              </LinearGradient>
            </AnimatedActionCard>
          </SGCard>
        </Animated.View>
      ) : null}
    </View>
  );
}
