import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import ScreenHeader from "../../design-system/components/ScreenHeader";
import { CAREER_OPTIONS, optionName } from "./careerData";
import { QUIZ_QUESTIONS, scoreQuiz } from "./careerGoals";
import useCareerLanguage from "./careerI18n";
import { CareerPage, useCareerInterstitial } from "./careerUi";

export default function CareerQuizScreen({ navigation, route }) {
  const { stateBoard } = route?.params || {};
  const { t } = useCareerLanguage(stateBoard);
  const showAd = useCareerInterstitial();
  const [answers, setAnswers] = useState([]);
  const finished = answers.length === QUIZ_QUESTIONS.length;

  // Finishing is the natural break, and it never interrupts a question.
  useEffect(() => {
    if (finished) showAd();
  }, [finished, showAd]);

  const choose = (answer) => {
    Haptics.selectionAsync().catch(() => {});
    setAnswers((current) => [...current, answer]);
  };

  if (finished) {
    const matches = scoreQuiz(answers)
      .map((id) => CAREER_OPTIONS.find((item) => item.id === id))
      .filter(Boolean);

    return (
      <CareerPage variant="board" contentClassName="px-5 pb-6">
        <ScreenHeader board eyebrow={t("Your result")} title={t("These may suit you")} subtitle={t("Tap one to learn what it leads to.")} />
        {matches.map((option, index) => {
          const best = index === 0;
          return (
            <Pressable
              key={option.id}
              onPress={() => navigation.navigate("CareerOptionScreen", { optionId: option.id, stateBoard })}
              accessibilityRole="button"
              className="mb-3 rounded-[22px] p-5 active:opacity-90"
              style={{ backgroundColor: best ? "#F2B632" : "#1C4336" }}
            >
              <Text className={`text-[14px] leading-[20px] font-sg-bold ${best ? "text-[#14342A]" : "text-[#B5C6BB]"}`}>
                {t(best ? "Best match" : "Also a good match")}
              </Text>
              <View className="mt-1 flex-row items-center">
                <Text className={`flex-1 font-sg-display ${best ? "text-[32px] leading-[40px] text-[#14342A]" : "text-[24px] leading-[31px] text-[#F4EFE2]"}`}>
                  {t(optionName(option, stateBoard))}
                </Text>
                <Ionicons name="arrow-forward" size={24} color={best ? "#14342A" : "#F2B632"} />
              </View>
              <Text className={`mt-1 text-[14px] leading-[21px] font-sg-medium ${best ? "text-[#14342A]" : "text-[#F4EFE2]"}`}>
                {t(option.plain)}
              </Text>
            </Pressable>
          );
        })}
        <Text className="mb-4 mt-1 text-[14px] leading-[21px] font-sg-medium text-[#B5C6BB]">
          {t("This is only a starting point. Talk to your parents and teachers before you decide.")}
        </Text>
        <Pressable
          onPress={() => setAnswers([])}
          accessibilityRole="button"
          className="min-h-[52px] flex-row items-center justify-center rounded-[16px] border border-[#F4EFE2]/30 active:opacity-70"
        >
          <Ionicons name="refresh" size={18} color="#F4EFE2" />
          <Text className="ml-2 text-[15px] font-sg-bold text-[#F4EFE2]">{t("Answer again")}</Text>
        </Pressable>
      </CareerPage>
    );
  }

  const current = QUIZ_QUESTIONS[answers.length];

  return (
    <CareerPage variant="board" contentClassName="px-5 pb-6">
      <ScreenHeader
        board
        onBack={answers.length ? () => setAnswers((list) => list.slice(0, -1)) : undefined}
        eyebrow={t("Question {n} of {total}", { n: answers.length + 1, total: QUIZ_QUESTIONS.length })}
        title={t(current.question)}
        subtitle={t("There are no wrong answers.")}
        className="mb-4"
      />
      {/* Four short questions: showing how few are left keeps students going. */}
      <View className="mb-5 flex-row" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        {QUIZ_QUESTIONS.map((question, index) => (
          <View
            key={question.question}
            className={`h-1.5 flex-1 rounded-full ${index > 0 ? "ml-1.5" : ""} ${
              index <= answers.length ? "bg-[#F2B632]" : "bg-[#F4EFE2]/16"
            }`}
          />
        ))}
      </View>
      {/* No chevrons: an answer is a choice, not a link to another page. */}
      {current.answers.map((answer) => (
        <Pressable
          key={answer.label}
          onPress={() => choose(answer)}
          accessibilityRole="button"
          className="mb-2.5 min-h-[64px] justify-center rounded-[18px] bg-[#1C4336] px-5 py-3 active:bg-[#F2B632]/30"
        >
          <Text className="text-[17px] leading-[24px] font-sg-semibold text-[#F4EFE2]">{t(answer.label)}</Text>
        </Pressable>
      ))}
    </CareerPage>
  );
}
