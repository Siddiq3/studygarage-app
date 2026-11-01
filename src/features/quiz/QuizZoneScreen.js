import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import axios from "axios";
import Snackbar from "react-native-snackbar";
import ScreenLayoutContainer from "../../design-system/components/ScreenLayoutContainer";
import ScreenHeader from "../../design-system/components/ScreenHeader";
import ContentsList from "../../design-system/components/ContentsList";
import ShimmerSkeleton from "../../components/ui/ShimmerSkeleton";
import SGEmptyState from "../../design-system/components/SGEmptyState";
import { buildQuizSubjectsUrl } from "../../utils/quizDataUrl";
import { useStreak } from "../../services/streak/useStreak";

function QuizListSkeleton() {
  return (
    <View className="gap-2.5">
      {[0, 1, 2, 3].map((idx) => (
        <ShimmerSkeleton key={`quiz-list-skeleton-${idx}`} height={64} borderRadius={16} />
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

  const titleLabel = useMemo(() => `${String(classValue).replace("Class", " class")} subjects`, [classValue]);

  const openSubjectQuiz = useCallback(
    async (subject) => {
      if (!subject) return;

      const becameDone = await markDailyQuizCompleted();
      if (becameDone) {
        Snackbar.show({
          text: "Quiz done ✅ 1/2 for streak",
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: "#FFFCF5",
          textColor: "#17694F",
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

  return (
    <ScreenLayoutContainer variant="home" contentClassName="px-4 pb-8" scroll>
      <ScreenHeader eyebrow="Daily practice" title="Quiz zone" subtitle={titleLabel} />

      <Animated.View entering={FadeInDown.duration(220)}>
        {loading ? (
          <QuizListSkeleton />
        ) : quizData.length === 0 ? (
          <SGEmptyState
            icon="help-circle-outline"
            title="No quizzes loaded"
            subtitle="We couldn't load your subjects. Check your connection and try again."
            actionLabel="Retry"
            onActionPress={fetchQuizData}
          />
        ) : (
          <ContentsList
            getKey={(item, index) => `${item.label}-${index}`}
            items={quizData.map((item) => ({
              label: item?.subject || "Quiz subject",
              onPress: () => openSubjectQuiz(item?.subject),
            }))}
          />
        )}
      </Animated.View>
    </ScreenLayoutContainer>
  );
}
