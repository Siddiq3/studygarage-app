import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert, BackHandler, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
  FadeInDown,
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
import BannerAdComponent from "./BannerAd";

const TARGET_CORRECT = 7;
const CORRECT_ANSWER_REVIEW_SECONDS = 8;
const SEEN_STORAGE_PREFIX = "sg_seen_questions";
const SEEN_WRITE_DEBOUNCE_MS = 300;

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

const Quizques = ({ navigation, route }) => {
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

  const { stateBoard, classValue, subject, chapter } = route.params;
  const { totalScore, addCoins } = useQuizContext();
  const { showAdAndWaitForClose } = useInterstitialAd();
  const { config: remoteConfig } = useRemoteConfig();
  const seenStorageKey = useMemo(
    () => buildSeenStorageKey(subject, chapter),
    [chapter, subject]
  );
  const quizSessionIdRef = useRef(
    String(
      route?.params?.quizSessionId ||
        `${normalizeKeySegment(subject)}:${normalizeKeySegment(
          chapter
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
  }, [handleContinue]);

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
        navigation.navigate("Quiz Results", {
          score: scoreRef.current,
          totalQuestions,
          correctQuestions: correctQuestionsRef.current,
          incorrectQuestions: incorrectQuestionsRef.current,
          totalScore,
        });
      });
  }, [
    clearPendingAdvanceTimeout,
    clearPostCorrectCountdownTimeout,
    clearSeenPersistTimeout,
    flushSeenIds,
    navigation,
    totalQuestions,
    totalScore,
  ]);

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

  const startPostCorrectAnswerReview = useCallback(
    (onDone) => {
      clearPostCorrectCountdownTimeout();
      let secondsRemaining = CORRECT_ANSWER_REVIEW_SECONDS;
      setPostCorrectCountdown(secondsRemaining);

      const tick = () => {
        secondsRemaining -= 1;

        if (secondsRemaining <= 0) {
          clearPostCorrectCountdownTimeout();
          onDone?.();
          return;
        }

        setPostCorrectCountdown(secondsRemaining);
        postCorrectCountdownTimeoutRef.current = setTimeout(tick, 1000);
      };

      postCorrectCountdownTimeoutRef.current = setTimeout(tick, 1000);
    },
    [clearPostCorrectCountdownTimeout]
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
    });

    try {
      const res = await fetch(url);
      const data = await res.json();
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
    clearPostCorrectCountdownTimeout,
    classValue,
    generateOptionsAndShuffle,
    markQuestionSeen,
    seenStorageKey,
    stateBoard,
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

  const handlSelectedOption = (_option) => {
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

      navigation.navigate("SuccessScreen", {
        rewardCoins: correctRewardCoins,
        countdownSeconds: 0,
        onCollectCoins: async () => {
          const questionId = getQuestionStableId(questions[ques], ques);
          await addCoins({
            eventId: `quiz:${quizSessionIdRef.current}:${questionId}`,
            amount: correctRewardCoins,
            source: "quiz_correct",
            meta: {
              questionId,
              subject: normalizeKeySegment(subject),
              chapter: normalizeKeySegment(chapter),
            },
          });
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
    <View className="flex-1 bg-[#0B0C10] px-4 pb-5 pt-4">
      <PremiumQuizTopBar
        progressMode="goal"
        sessionLabel={chapter || "Quiz Session"}
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
          <View className="mb-4 rounded-[22px] border border-white/10 bg-white/6 px-4 py-4">
            <Text className="text-center text-[12px] font-bold uppercase tracking-[1.1px] text-white/65">
              Question Prompt
            </Text>
            <Text className="mt-2 text-center text-[22px] font-black leading-[30px] text-white">
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
            <View className="mt-2 items-end">
              <Text className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[12px] font-bold text-[#DFE7F9]">
                Next question in {postCorrectCountdown}...
              </Text>
            </View>
          ) : ques !== totalQuestions - 1 ? (
            <TouchableOpacity
              onPress={handleNextPress}
              className="mt-1 self-end rounded-full border border-white/15 bg-white/7 px-4 py-2"
            >
              <Text className="text-[12px] font-bold uppercase tracking-[0.9px] text-white/90">
                Skip
              </Text>
            </TouchableOpacity>
          ) : null}
        </Animated.View>
      ) : (
        <View className="flex-1 justify-center">
          <SGEmptyState
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
  );
};

export default Quizques;
