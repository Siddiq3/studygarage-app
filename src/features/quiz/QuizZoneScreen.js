import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, { FadeInDown } from "react-native-reanimated";
import axios from "axios";
import Snackbar from "react-native-snackbar";
import ScreenLayoutContainer from "../../design-system/components/ScreenLayoutContainer";
import SGCard from "../../design-system/components/SGCard";
import SGEmptyState from "../../design-system/components/SGEmptyState";
import AnimatedActionCard from "../../design-system/components/AnimatedActionCard";
import PressableScale from "../../components/ui/PressableScale";
import { buildQuizSubjectsUrl } from "../../utils/quizDataUrl";
import { useStreak } from "../../services/streak/useStreak";

function QuizListSkeleton() {
  return (
    <View>
      {[0, 1, 2, 3].map((idx) => (
        <View
          key={`quiz-list-skeleton-${idx}`}
          className="mb-3 h-[72px] rounded-[18px] border border-white/10 bg-white/7"
        />
      ))}
    </View>
  );
}

export default function QuizZoneScreen({ navigation, route }) {
  const params = route?.params || {};
  const stateBoard = params?.stateBoard || "Andhra Pradesh";
  const classValue = params?.classValue || "10thClass";
  const { markDailyQuizCompleted } = useStreak();

  const [loading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState([]);

  const fetchQuizData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        buildQuizSubjectsUrl({ stateBoard, classValue })
      );

      const uniqueNames = new Set();
      const uniqueData = (response?.data?.results || []).filter((item) => {
        if (!uniqueNames.has(item?.name)) {
          uniqueNames.add(item?.name);
          return true;
        }
        return false;
      });

      setQuizData(uniqueData);
    } catch (error) {
      console.error("Error fetching quiz subjects:", error);
      setQuizData([]);
    } finally {
      setLoading(false);
    }
  }, [classValue, stateBoard]);

  useEffect(() => {
    fetchQuizData();
  }, [fetchQuizData]);

  const titleLabel = useMemo(() => `${classValue} Quiz Zone`, [classValue]);

  const openSubjectQuiz = useCallback(
    async (subject) => {
      if (!subject) return;

      const becameDone = await markDailyQuizCompleted();
      if (becameDone) {
        Snackbar.show({
          text: "Quiz done ✅ 1/2 for streak",
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: "#0F1728",
          textColor: "#D6E1FF",
        });
      }

      navigation.navigate("ChapterDetails", {
        stateBoard,
        classValue,
        subject,
      });
    },
    [classValue, markDailyQuizCompleted, navigation, stateBoard]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <AnimatedActionCard
        className="mb-3"
        onPress={() => openSubjectQuiz(item?.subject)}
      >
        <View className="rounded-[20px] border border-sg-border bg-sg-surface/85 px-4 py-4 dark:border-sgd-border dark:bg-sgd-surface/85">
          <View className="flex-row items-center justify-between">
            <Text className="flex-1 text-[16px] font-bold text-sg-text dark:text-sgd-text">
              {item?.subject || "Quiz Subject"}
            </Text>
            <View className="ml-3 rounded-full border border-sg-border px-3 py-1 dark:border-sgd-border">
              <Text className="text-[12px] font-bold text-sg-muted dark:text-sgd-muted">
                Open
              </Text>
            </View>
          </View>
        </View>
      </AnimatedActionCard>
    ),
    [openSubjectQuiz]
  );

  return (
    <ScreenLayoutContainer variant="reward" contentClassName="px-4 pb-8" scroll>
      <Animated.View entering={FadeInDown.duration(220)}>
        <SGCard className="mb-4 border-white/12">
          <View className="mb-1 flex-row items-center justify-between">
            <View>
              <Text className="text-[11px] font-bold uppercase tracking-[1.2px] text-sg-muted dark:text-sgd-muted">
                Daily Practice
              </Text>
              <Text className="mt-1 text-[30px] font-extrabold leading-[34px] text-sg-text dark:text-sgd-text">
                Quiz Zone
              </Text>
              <Text className="mt-1 text-[13px] font-semibold text-sg-muted dark:text-sgd-muted">
                {titleLabel}
              </Text>
            </View>

            <PressableScale
              onPress={() => navigation.goBack()}
              activeScale={0.95}
              className="h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-white/8"
            >
              <Ionicons name="close" size={18} color="#C7D1E6" />
            </PressableScale>
          </View>
        </SGCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(70).duration(220)}>
        {loading ? (
          <QuizListSkeleton />
        ) : quizData.length === 0 ? (
          <SGEmptyState
            title="Quiz lane is warming up"
            subtitle="We are preparing your quiz subjects. Try refreshing in a moment."
            actionLabel="Retry"
            onActionPress={fetchQuizData}
            badgeLabel="QUIZ EMPTY"
          />
        ) : (
          <FlatList
            data={quizData}
            keyExtractor={(item, index) =>
              `${item?.subject || "quiz"}-${index}`
            }
            renderItem={renderItem}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        )}
      </Animated.View>
    </ScreenLayoutContainer>
  );
}
