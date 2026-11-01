import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert, BackHandler, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useQuizContext } from "./QuizContext";
import useInterstitialAd from "./InterstitialAdComponent";
import PremiumQuizTopBar from "./src/components/quiz/PremiumQuizTopBar";
import PremiumAnswerCard from "./src/components/quiz/PremiumAnswerCard";
import QuizLoadingSkeleton from "./src/components/quiz/QuizLoadingSkeleton";
import SGEmptyState from "./src/design-system/components/SGEmptyState";
import { buildQuizQuestionsUrl } from "./src/utils/quizDataUrl";
import useRemoteConfig from "./src/hooks/useRemoteConfig";
import { defaultConfig } from "./src/config/remoteConfig";
import {
  getTodayQuizReward,
  recordTodayQuizReward,
} from "./src/services/rewards/quizDailyRewardCap";
import BannerAdComponent from "./BannerAd";

const TARGET_CORRECT = 7;
const CORRECT_ANSWER_REVIEW_SECONDS = 8;
const SEEN_STORAGE_PREFIX = "sg_seen_questions";
const SEEN_WRITE_DEBOUNCE_MS = 300;
const BRAND_MINT = "#8FD9B4";
const BRAND_PURPLE = "#F2B632";

const normalizeKeySegment = (value) =>
  String(value ?? "unknown")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9_-]/g, "");

const buildSeenStorageKey = (subjectId, chapterId) =>
  `${SEEN_STORAGE_PREFIX}:${normalizeKeySegment(subjectId)}:${normalizeKeySegment(chapterId)}`;

const parseSeenIds = (rawValue) => {
  if (!rawValue) return [];
  try {
    const parsed = JSON.parse(rawValue);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => String(item)).filter(Boolean);
  } catch (_error) {
    return [];
  }
};

const getQuestionStableId = (question, index = 0) => {
  const directId =
    question?.id ?? question?._id ?? question?.question_id ?? question?.questionId;

  if (directId !== undefined && directId !== null && `${directId}`.trim().length > 0) {
    return String(directId);
  }

  const incorrectAnswers = Array.isArray(question?.incorrect_answers)
    ? question.incorrect_answers
    : [];
  const base = [
    String(question?.question ?? ""),
    String(question?.correct_answer ?? ""),
    ...incorrectAnswers.map((item) => String(item)),
    String(index),
  ].join("||");

  let hash = 0;
  for (let i = 0; i < base.length; i += 1) {
    hash = (hash << 5) - hash + base.charCodeAt(i);
    hash |= 0;
  }

  return `q_${Math.abs(hash)}`;
};

const shuffleQuestions = (questionList) => {
  const cloned = [...questionList];
  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
};

// One UI-thread timing for the whole wait, so the bar stays smooth while JS is busy.
function NextQuestionBar({ seconds, totalSeconds }) {
  const drain = useSharedValue(1);

  useEffect(() => {
    drain.value = withTiming(0, {
      duration: totalSeconds * 1000,
      easing: Easing.linear,
    });
  }, [drain, totalSeconds]);

  const drainStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: drain.value }],
  }));

  return (
    <Animated.View
      entering={FadeInDown.duration(240)}
      className="mt-2 rounded-[18px] bg-[#1C4336] p-3"
    >
      <View className="flex-row items-center">
        <View className="h-10 w-10 items-center justify-center rounded-[12px] bg-[#8FD9B4]">
          <Ionicons name="checkmark" size={24} color="#14342A" />
        </View>
        <View className="ml-3 flex-1">
          <Text className="text-[16px] font-sg-bold text-[#F4EFE2]">
            Correct. Review your answer.
          </Text>
          <Text
            className="text-[13px] font-sg-medium text-[#B5C6BB]"
            style={{ fontVariant: ["tabular-nums"] }}
          >
            Moving on in {seconds}s
          </Text>
        </View>
      </View>
      <View className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#F4EFE2]/16">
        <Animated.View
          className="h-full w-full rounded-full bg-[#F2B632]"
          style={[drainStyle, { transformOrigin: "left" }]}
        />
      </View>
    </Animated.View>
  );
}

const Quizques = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctQuestions, setCorrectQuestions] = useState(0);
  const [incorrectQuestions, setIncorrectQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [ques, setQues] = useState(0);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectionLocked, setSelectionLocked] = useState(false);
  const [postCorrectCountdown, setPostCorrectCountdown] = useState(null);
  const postCorrectDoneRef = useRef(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const pendingAdvanceTimeoutRef = useRef(null);
  const postCorrectCountdownTimeoutRef = useRef(null);
  const questionsRef = useRef([]);
  const totalQuestionsRef = useRef(0);
  const scoreRef = useRef(0);
  const correctQuestionsRef = useRef(0);
  const incorrectQuestionsRef = useRef(0);
  const seenIdsRef = useRef(new Set());
  const seenWriteTimeoutRef = useRef(null);
  const resultNavigatedRef = useRef(false);

  const wrongShakeX = useSharedValue(0);
  const wrongPulse = useSharedValue(1);

  const { stateBoard, classValue, subject, chapter, chapterSlug, chapterFile } =
    route.params;
  const chapterLabel = chapter || chapterSlug || chapterFile || "";
  const { totalScore, addCoins } = useQuizContext();
  const { showAdAndWaitForClose } = useInterstitialAd();
  const { config: remoteConfig } = useRemoteConfig();
  const seenStorageKey = useMemo(
    () => buildSeenStorageKey(subject, chapterLabel),
    [chapterLabel, subject]
  );
  const quizSessionIdRef = useRef(
    String(
      route?.params?.quizSessionId ||
        `${normalizeKeySegment(subject)}:${normalizeKeySegment(
          chapterLabel
        )}:${Date.now()}`
    )
  );
  const correctRewardCoins = Math.max(
    0,
    Number(remoteConfig?.correctAnswerCoins ?? defaultConfig.correctAnswerCoins)
  );

  const wrongAnswerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: wrongShakeX.value }, { scale: wrongPulse.value }],
  }));

  useEffect(() => {
    questionsRef.current = questions;
  }, [questions]);

  useEffect(() => {
    totalQuestionsRef.current = totalQuestions;
  }, [totalQuestions]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    correctQuestionsRef.current = correctQuestions;
  }, [correctQuestions]);

  useEffect(() => {
    incorrectQuestionsRef.current = incorrectQuestions;
  }, [incorrectQuestions]);

  const handleContinue = useCallback(async () => {
    try {
      const storedUserName = await AsyncStorage.getItem("userName");
      const storedAvatar = await AsyncStorage.getItem("avatar");
      const storedStateBoard = await AsyncStorage.getItem("stateBoard");
      const storedClassValue = await AsyncStorage.getItem("classValue");

      if (
        storedUserName &&
        storedAvatar &&
        storedStateBoard &&
        storedClassValue
      ) {
        navigation.navigate("SecondPage", {
          userName: storedUserName,
          stateBoard: storedStateBoard,
          classValue: storedClassValue,
          avatar: storedAvatar,
        });
      } else {
        Alert.alert(
          "Data not found",
          "Please fill in all required fields in the FirstPage."
        );
      }
    } catch (error) {
      console.error("Error checking stored data:", error);
    }
  }, [navigation]);

  const handleBackPress = useCallback(() => {
    if (showCompletionModal) {
      return true;
    }
    Alert.alert(
      "Exit",
      "Are you sure you want to go back?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Back", onPress: handleContinue },
      ],
      { cancelable: false }
    );
    return true;
  }, [handleContinue, showCompletionModal]);

  const clearPendingAdvanceTimeout = useCallback(() => {
    if (pendingAdvanceTimeoutRef.current) {
      clearTimeout(pendingAdvanceTimeoutRef.current);
      pendingAdvanceTimeoutRef.current = null;
    }
  }, []);

  const clearPostCorrectCountdownTimeout = useCallback(() => {
    if (postCorrectCountdownTimeoutRef.current) {
      clearTimeout(postCorrectCountdownTimeoutRef.current);
      postCorrectCountdownTimeoutRef.current = null;
    }
    setPostCorrectCountdown(null);
  }, []);

  const clearSeenPersistTimeout = useCallback(() => {
    if (seenWriteTimeoutRef.current) {
      clearTimeout(seenWriteTimeoutRef.current);
      seenWriteTimeoutRef.current = null;
    }
  }, []);

  const flushSeenIds = useCallback(async () => {
    if (!seenStorageKey) return;
    const serializedSeenIds = JSON.stringify(Array.from(seenIdsRef.current));
    try {
      await AsyncStorage.setItem(seenStorageKey, serializedSeenIds);
    } catch (error) {
      console.error("Error storing seen quiz question ids:", error);
    }
  }, [seenStorageKey]);

  const scheduleSeenIdsPersist = useCallback(() => {
    clearSeenPersistTimeout();
    seenWriteTimeoutRef.current = setTimeout(() => {
      flushSeenIds();
    }, SEEN_WRITE_DEBOUNCE_MS);
  }, [clearSeenPersistTimeout, flushSeenIds]);

  const markQuestionSeen = useCallback(
    (question) => {
      if (!question?._stableId) return;
      if (seenIdsRef.current.has(question._stableId)) return;
      seenIdsRef.current.add(question._stableId);
      scheduleSeenIdsPersist();
    },
    [scheduleSeenIdsPersist]
  );

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const generateOptionsAndShuffle = useCallback((_question) => {
    const nextOptions = [
      ..._question.incorrect_answers,
      _question.correct_answer,
    ];
    shuffleArray(nextOptions);
    return Array.from(new Set(nextOptions));
  }, []);

  const handleShowResult = useCallback(() => {
    if (resultNavigatedRef.current) return;
    resultNavigatedRef.current = true;
    clearPendingAdvanceTimeout();
    clearPostCorrectCountdownTimeout();
    clearSeenPersistTimeout();

    flushSeenIds()
      .catch(() => {})
      .finally(() => {
        setShowCompletionModal(true);
      });
  }, [
    clearPendingAdvanceTimeout,
    clearPostCorrectCountdownTimeout,
    clearSeenPersistTimeout,
    flushSeenIds,
  ]);

  const handleCompletionStartAgain = useCallback(() => {
    setShowCompletionModal(false);
    if (navigation?.canGoBack?.()) {
      navigation.goBack();
      return;
    }
    navigation.navigate("ChapterDetails", {
      stateBoard,
      classValue,
      subject,
    });
  }, [classValue, navigation, stateBoard, subject]);

  const handleCompletionGoBack = useCallback(() => {
    setShowCompletionModal(false);
    handleContinue();
  }, [handleContinue]);

  const advanceToNextQuestion = useCallback(() => {
    clearPendingAdvanceTimeout();
    clearPostCorrectCountdownTimeout();
    setSelectedOption(null);
    setSelectionLocked(false);

    setQues((prevQues) => {
      if (prevQues < totalQuestionsRef.current - 1) {
        const nextQues = prevQues + 1;
        const nextQuestion = questionsRef.current[nextQues];
        if (nextQuestion) {
          markQuestionSeen(nextQuestion);
          setOptions(generateOptionsAndShuffle(nextQuestion));
        } else {
          setOptions([]);
        }
        return nextQues;
      }

      handleShowResult();
      return prevQues;
    });
  }, [
    clearPendingAdvanceTimeout,
    clearPostCorrectCountdownTimeout,
    generateOptionsAndShuffle,
    handleShowResult,
    markQuestionSeen,
  ]);

  const finishPostCorrectReview = useCallback(() => {
    const onDone = postCorrectDoneRef.current;
    postCorrectDoneRef.current = null;
    clearPostCorrectCountdownTimeout();
    onDone?.();
  }, [clearPostCorrectCountdownTimeout]);

  const startPostCorrectAnswerReview = useCallback(
    (onDone) => {
      clearPostCorrectCountdownTimeout();
      postCorrectDoneRef.current = onDone;
      let secondsRemaining = CORRECT_ANSWER_REVIEW_SECONDS;
      setPostCorrectCountdown(secondsRemaining);

      const tick = () => {
        secondsRemaining -= 1;

        if (secondsRemaining <= 0) {
          finishPostCorrectReview();
          return;
        }

        setPostCorrectCountdown(secondsRemaining);
        postCorrectCountdownTimeoutRef.current = setTimeout(tick, 1000);
      };

      postCorrectCountdownTimeoutRef.current = setTimeout(tick, 1000);
    },
    [clearPostCorrectCountdownTimeout, finishPostCorrectReview]
  );

  const triggerWrongFeedback = useCallback(() => {
    wrongPulse.value = withSequence(
      withSpring(1.015, { damping: 11, stiffness: 220 }),
      withSpring(1, { damping: 13, stiffness: 240 })
    );
    wrongShakeX.value = withSequence(
      withTiming(-8, { duration: 45 }),
      withTiming(8, { duration: 50 }),
      withTiming(-6, { duration: 45 }),
      withTiming(6, { duration: 40 }),
      withTiming(0, { duration: 40 })
    );
  }, [wrongPulse, wrongShakeX]);

  const getQuiz = useCallback(async () => {
    setIsLoading(true);
    resultNavigatedRef.current = false;
    const url = buildQuizQuestionsUrl({
      stateBoard,
      classValue,
      subject,
      chapter,
      chapterSlug,
      chapterFile,
    });

    try {
      const res = await fetch(url);
      const payload = await res.text();
      let data = { results: [] };
      try {
        data = JSON.parse(payload);
      } catch (_parseError) {
        console.warn(
          "Quiz payload is not valid JSON for URL:",
          url,
          "payload head:",
          String(payload).slice(0, 120)
        );
      }
      const quizResults = Array.isArray(data?.results) ? data.results : [];

      const preparedQuestions = quizResults.map((question, index) => ({
        ...question,
        _stableId: getQuestionStableId(question, index),
      }));

      const seenIds = parseSeenIds(await AsyncStorage.getItem(seenStorageKey));
      seenIdsRef.current = new Set(seenIds);

      let unseenQuestions = preparedQuestions.filter(
        (question) => !seenIdsRef.current.has(question._stableId)
      );

      if (unseenQuestions.length === 0 && preparedQuestions.length > 0) {
        seenIdsRef.current = new Set();
        unseenQuestions = [...preparedQuestions];
        await AsyncStorage.setItem(seenStorageKey, JSON.stringify([]));
      }

      const shuffledAttemptQuestions = shuffleQuestions(unseenQuestions);

      setQuestions(shuffledAttemptQuestions);
      setTotalQuestions(shuffledAttemptQuestions.length);
      setQues(0);
      setScore(0);
      setCorrectQuestions(0);
      setIncorrectQuestions(0);
      setSelectedOption(null);
      setSelectionLocked(false);
      clearPostCorrectCountdownTimeout();
      scoreRef.current = 0;
      correctQuestionsRef.current = 0;
      incorrectQuestionsRef.current = 0;

      if (shuffledAttemptQuestions.length > 0) {
        markQuestionSeen(shuffledAttemptQuestions[0]);
        setOptions(generateOptionsAndShuffle(shuffledAttemptQuestions[0]));
      } else {
        setOptions([]);
      }
    } catch (error) {
      console.error("Error loading quiz:", error);
      setQuestions([]);
      setTotalQuestions(0);
      setOptions([]);
    } finally {
      setIsLoading(false);
    }
  }, [
    chapter,
    chapterFile,
    chapterLabel,
    chapterSlug,
    clearPostCorrectCountdownTimeout,
    classValue,
    generateOptionsAndShuffle,
    markQuestionSeen,
    stateBoard,
    seenStorageKey,
    subject,
  ]);

  useEffect(() => {
    getQuiz();
  }, [getQuiz]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );
    return () => backHandler.remove();
  }, [handleBackPress]);

  useEffect(() => {
    return () => {
      clearPendingAdvanceTimeout();
      clearPostCorrectCountdownTimeout();
      clearSeenPersistTimeout();
      flushSeenIds();
    };
  }, [
    clearPendingAdvanceTimeout,
    clearPostCorrectCountdownTimeout,
    clearSeenPersistTimeout,
    flushSeenIds,
  ]);

  const handleNextPress = () => {
    if (selectionLocked || postCorrectCountdown !== null) return;
    advanceToNextQuestion();
  };

  const handlSelectedOption = async (_option) => {
    if (selectionLocked || !questions?.[ques]) return;

    setSelectionLocked(true);
    setSelectedOption(_option);

    if (_option === questions[ques].correct_answer) {
      const nextScore = scoreRef.current + 1;
      const nextCorrect = correctQuestionsRef.current + 1;
      setScore(nextScore);
      setCorrectQuestions(nextCorrect);
      scoreRef.current = nextScore;
      correctQuestionsRef.current = nextCorrect;

      let quizRewardForThisAnswer = correctRewardCoins;
      try {
        quizRewardForThisAnswer = await getTodayQuizReward();
      } catch (error) {
        console.error("Failed to read daily quiz cap state:", error);
      }

      const normalizedQuizReward = Math.max(
        0,
        Number(quizRewardForThisAnswer) || 0
      );

      navigation.navigate("SuccessScreen", {
        rewardCoins: normalizedQuizReward,
        countdownSeconds: 0,
        onCollectCoins: async () => {
          if (normalizedQuizReward <= 0) {
            return;
          }
          const questionId = getQuestionStableId(questions[ques], ques);
          const creditResult = await addCoins({
            eventId: `quiz:${quizSessionIdRef.current}:${questionId}`,
            amount: normalizedQuizReward,
            source: "quiz_correct",
            meta: {
              questionId,
              subject: normalizeKeySegment(subject),
              chapter: normalizeKeySegment(chapterLabel),
            },
          });
          if (creditResult?.applied) {
            try {
              await recordTodayQuizReward(normalizedQuizReward);
            } catch (error) {
              console.error("Failed to persist quiz daily cap progress:", error);
            }
          }
        },
        showInterstitialAdAndWait: showAdAndWaitForClose,
        onContinueQuiz: () => {
          startPostCorrectAnswerReview(() => {
            if (nextCorrect >= TARGET_CORRECT) {
              handleShowResult();
              return;
            }
            advanceToNextQuestion();
          });
        },
      });
      return;
    }

    const nextIncorrect = incorrectQuestionsRef.current + 1;
    setIncorrectQuestions(nextIncorrect);
    incorrectQuestionsRef.current = nextIncorrect;
    triggerWrongFeedback();

    clearPendingAdvanceTimeout();
    pendingAdvanceTimeoutRef.current = setTimeout(() => {
      advanceToNextQuestion();
    }, 1500);
  };

  const resolveOptionState = (option) => {
    if (!selectedOption || !questions?.[ques]) return "default";
    const correctAnswer = questions[ques].correct_answer;

    if (option === selectedOption) {
      return option === correctAnswer ? "correct" : "incorrect";
    }

    if (selectedOption !== correctAnswer && option === correctAnswer) {
      return "correct";
    }

    return "disabled";
  };

  const decodedQuestion = questions?.[ques]?.question
    ? decodeURIComponent(questions[ques].question)
    : "";
  const showQuizBanner = !isLoading && Array.isArray(questions) && questions.length > 0;

  return (
    <View className="flex-1 bg-[#14342A]">
      <StatusBar style="light" />
      <View className="flex-1 px-4 pb-5" style={{ paddingTop: insets.top + 10, paddingBottom: Math.max(insets.bottom, 12) + 8 }}>
        <PremiumQuizTopBar
          progressMode="goal"
          sessionLabel={chapterLabel || "Quiz"}
          correctCount={correctQuestions}
          targetCorrect={TARGET_CORRECT}
          helperText={`Get ${TARGET_CORRECT} correct to finish`}
          onBackPress={handleBackPress}
          showTimer={false}
          coinBalance={totalScore}
        />

        {isLoading ? (
          <QuizLoadingSkeleton />
        ) : questions && questions.length > 0 && ques < totalQuestions ? (
          <Animated.View
            entering={FadeInDown.duration(220)}
            className="flex-1"
            style={wrongAnswerStyle}
          >
            <View className="mb-4 rounded-[18px] border border-[#F4EFE2]/10 bg-[#F4EFE2]/6 px-4 py-4">
              <Text className="text-center text-[12px] font-sg-bold text-[#F4EFE2]/65">
                Question
              </Text>
              <Text className="mt-2 text-center text-[22px] font-sg-display leading-[30px] text-[#F4EFE2]">
                {decodedQuestion}
              </Text>
            </View>

            <View className="flex-1">
              {options.map((option, index) => (
                <PremiumAnswerCard
                  key={`${option}-${index}`}
                  label={decodeURIComponent(option)}
                  onPress={() => handlSelectedOption(option)}
                  disabled={selectionLocked}
                  state={resolveOptionState(option)}
                />
              ))}
            </View>

            {postCorrectCountdown !== null ? (
              <NextQuestionBar
                seconds={postCorrectCountdown}
                totalSeconds={CORRECT_ANSWER_REVIEW_SECONDS}
              />
            ) : ques !== totalQuestions - 1 ? (
              <TouchableOpacity
                onPress={handleNextPress}
                className="mt-1 self-end rounded-full border border-[#F4EFE2]/15 bg-[#F4EFE2]/7 px-4 py-2"
              >
                <Text className="text-[12px] font-sg-bold text-[#F4EFE2]/90">
                  Skip
                </Text>
              </TouchableOpacity>
            ) : null}
          </Animated.View>
        ) : (
          <View className="flex-1 justify-center">
            <SGEmptyState board
              title="Quiz set is empty right now"
              subtitle="Please go back and try another chapter."
              actionLabel="Go Home"
              onActionPress={handleContinue}
              badgeLabel="QUIZ EMPTY"
            />
          </View>
        )}

        {showQuizBanner ? (
          <View className="mt-2 items-center">
            <BannerAdComponent />
          </View>
        ) : null}
      </View>

      {showCompletionModal ? (
        <Animated.View
          entering={FadeIn.duration(180)}
          exiting={FadeOut.duration(160)}
          className="absolute inset-0 z-[100] justify-center bg-[#0F281F]/80 px-5"
          pointerEvents="auto"
        >
          <Animated.View
            entering={FadeInDown.duration(240)}
            className="rounded-[18px] border border-[#F4EFE2]/10 bg-[#1C4336] px-5 py-6"
          >
            <View className="mb-4 items-center">
              <View className="h-[82px] w-[82px] items-center justify-center rounded-full border border-[#F4EFE2]/12 bg-[#1C4336]">
                <View className="h-[58px] w-[58px] items-center justify-center rounded-full border border-[#F4EFE2]/10 bg-[#14342A]">
                  <Text
                    className="text-[26px] font-sg-display"
                    style={{ color: BRAND_MINT }}
                  >
                    7
                  </Text>
                </View>
              </View>
              <View className="mt-4 flex-row items-center">
                <View
                  className="h-[8px] w-[8px] rounded-full"
                  style={{ backgroundColor: BRAND_MINT }}
                />
                <View className="mx-2 h-[2px] w-[28px] bg-[#F4EFE2]/25" />
                <View
                  className="h-[8px] w-[8px] rounded-full"
                  style={{ backgroundColor: BRAND_PURPLE }}
                />
              </View>
            </View>

            <Text className="text-center text-[30px] font-sg-display text-[#F4EFE2]">
              Quiz Completed
            </Text>
            <Text className="mt-2 text-center text-[14px] font-sg-medium text-[#F4EFE2]">
              You reached {TARGET_CORRECT} correct answers.
            </Text>
            <Text className="mt-1 text-center text-[13px] font-sg-medium text-[#F4EFE2]/60">
              Choose what you want to do next.
            </Text>

            <TouchableOpacity
              onPress={handleCompletionStartAgain}
              className="mt-6 rounded-[18px] border border-[#F4EFE2]/12 bg-[#1C4336] px-4 py-4"
              activeOpacity={0.88}
            >
              <Text className="text-center text-[17px] font-sg-extrabold text-[#F4EFE2]">
                Start Again
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCompletionGoBack}
              className="mt-3 rounded-[18px] border border-[#F4EFE2]/12 bg-[#F4EFE2]/10 px-4 py-4"
              activeOpacity={0.88}
            >
              <Text className="text-center text-[17px] font-sg-bold text-[#F4EFE2]/95">
                Go Back
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      ) : null}
    </View>
  );
};

export default Quizques;
