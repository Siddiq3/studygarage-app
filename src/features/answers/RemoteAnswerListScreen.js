import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import useInterstitialAd from "../../../InterstitialAdComponent";
import MrecAdComponent from "../../../MrecAdComponent";
import ScreenLayoutContainer from "../../design-system/components/ScreenLayoutContainer";
import ScreenHeader from "../../design-system/components/ScreenHeader";
import SGEmptyState from "../../design-system/components/SGEmptyState";
import Ionicons from "@expo/vector-icons/Ionicons";
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
      <ScreenHeader tone="board" icon="checkmark-circle" eyebrow="Quiz review" title={title} subtitle={subtitle} />
      <Animated.View>
        {isLoading ? (
          <View className="gap-2.5">
            {[0, 1, 2, 3].map((idx) => (
              <ShimmerSkeleton key={`answer-loader-${idx}`} height={84} borderRadius={16} />
            ))}
          </View>
        ) : (
          <FlatList
            data={questions}
            scrollEnabled={false}
            keyExtractor={(_, index) => `answer-${index}`}
            renderItem={({ item, index }) => (
              <View className="mb-2.5 rounded-[16px] border border-sg-border bg-sg-surface px-4 py-3.5">
                <Text className="text-[15px] leading-[22px] font-sg-semibold text-sg-text">
                  {index + 1}. {decodeText(item?.question)}
                </Text>
                <View className="mt-2 flex-row items-start">
                  <Ionicons name="checkmark-circle" size={17} color="#1C7C55" style={{ marginTop: 1 }} />
                  <Text className="ml-1.5 flex-1 text-[14px] leading-[20px] font-sg-bold text-sg-success">
                    {decodeText(item?.correct_answer)}
                  </Text>
                </View>
              </View>
            )}
            ListEmptyComponent={<SGEmptyState title="No answers available" subtitle="Check back after the next quiz." />}
          />
        )}
      </Animated.View>

      <SGButton label="Go to home" onPress={handleHome} className="mb-4 mt-2" />

      <View className="mb-4">
        <MrecAdComponent />
      </View>
    </ScreenLayoutContainer>
  );
}
