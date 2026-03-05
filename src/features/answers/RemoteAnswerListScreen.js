import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import useInterstitialAd from "../../../InterstitialAdComponent";
import MrecAdComponent from "../../../MrecAdComponent";
import ScreenLayoutContainer from "../../design-system/components/ScreenLayoutContainer";
import SGCard from "../../design-system/components/SGCard";
import SGButton from "../../design-system/components/SGButton";
import ShimmerSkeleton from "../../components/ui/ShimmerSkeleton";

const decodeText = (value) => {
  try {
    return decodeURIComponent(value || "");
  } catch (_error) {
    return value || "";
  }
};

export default function RemoteAnswerListScreen({
  navigation,
  fetchUrl,
  homeRoute = "10th class",
  title = "Answer Key",
  subtitle = "Review question-wise correct answers",
}) {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showAd } = useInterstitialAd();

  useEffect(() => {
    let mounted = true;

    const getQuiz = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(fetchUrl);
        const data = await res.json();
        if (mounted) {
          setQuestions(data?.results || []);
        }
      } catch (error) {
        console.error(error);
        if (mounted) {
          setQuestions([]);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    getQuiz();

    return () => {
      mounted = false;
    };
  }, [fetchUrl]);

  const handleHome = () => {
    showAd();
    navigation.navigate(homeRoute);
  };

  return (
    <ScreenLayoutContainer variant="home" contentClassName="px-4 pb-6" scroll>
      <Animated.View entering={FadeInDown.duration(220)}>
        <SGCard className="mb-4">
          <Text className="text-[11px] font-bold uppercase tracking-[1.1px] text-sg-muted dark:text-sgd-muted">
            Quiz Review
          </Text>
          <Text className="mt-1 text-[28px] font-extrabold leading-[32px] text-sg-text dark:text-sgd-text">
            {title}
          </Text>
          <Text className="mt-1 text-[13px] font-medium text-sg-muted dark:text-sgd-muted">
            {subtitle}
          </Text>
        </SGCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(60).duration(220)}>
        <SGCard className="mb-4">
          {isLoading ? (
            <View className="py-4">
              {[0, 1, 2, 3].map((idx) => (
                <View
                  key={`answer-loader-${idx}`}
                  className="mb-3 rounded-[18px] border border-sg-border bg-sg-surface/88 p-4 dark:border-sgd-border dark:bg-sgd-surface/88"
                >
                  <ShimmerSkeleton height={16} borderRadius={8} />
                  <ShimmerSkeleton
                    height={14}
                    borderRadius={8}
                    className="mt-2"
                  />
                </View>
              ))}
            </View>
          ) : (
            <FlatList
              data={questions}
              scrollEnabled={false}
              keyExtractor={(_, index) => `answer-${index}`}
              renderItem={({ item }) => (
                <View className="mb-3 rounded-[18px] border border-sg-border bg-sg-surface/88 px-4 py-4 dark:border-sgd-border dark:bg-sgd-surface/88">
                  <Text className="text-[15px] font-bold leading-[22px] text-sg-text dark:text-sgd-text">
                    Q. {decodeText(item?.question)}
                  </Text>
                  <Text className="mt-2 text-[14px] font-semibold leading-[20px] text-[#00D48A]">
                    Ans: {decodeText(item?.correct_answer)}
                  </Text>
                </View>
              )}
              ListEmptyComponent={
                <View className="rounded-[18px] border border-sg-border bg-sg-surface/86 px-4 py-6 dark:border-sgd-border dark:bg-sgd-surface/86">
                  <Text className="text-center text-[14px] font-semibold text-sg-muted dark:text-sgd-muted">
                    No answers available
                  </Text>
                </View>
              }
            />
          )}
        </SGCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(120).duration(220)}>
        <SGCard className="mb-4">
          <SGButton label="Go To Home" onPress={handleHome} />
        </SGCard>
      </Animated.View>

      <View className="mb-4">
        <MrecAdComponent />
      </View>
    </ScreenLayoutContainer>
  );
}
