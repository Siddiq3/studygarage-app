import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenLayoutContainer from '../src/design-system/components/ScreenLayoutContainer';
import ScreenHeader from '../src/design-system/components/ScreenHeader';
import SGButton from '../src/design-system/components/SGButton';

export default function ChapterQuizScreen({ navigation, questions, backRoute }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = questions[index];
  const answered = selected !== null;

  const choose = (option) => {
    setSelected(option);
    if (option == current.correct_option) {
      setScore((value) => value + 1);
    }
  };

  const next = () => {
    if (index === questions.length - 1) {
      setFinished(true);
      return;
    }
    setIndex(index + 1);
    setSelected(null);
  };

  const restart = () => {
    setFinished(false);
    setIndex(0);
    setScore(0);
    setSelected(null);
  };

  const passed = score > questions.length / 2;

  return (
    <ScreenLayoutContainer variant="board" contentClassName="px-4" scroll={false}>
      <ScreenHeader board onBack={() => navigation.navigate(backRoute)} title={`Question ${index + 1}`} subtitle={`of ${questions.length}`} className="mb-3" />
      <View className="mb-5 h-1.5 overflow-hidden rounded-full bg-[#F4EFE2]/16">
        <View className="h-full rounded-full bg-[#F2B632]" style={{ width: `${((index + (answered ? 1 : 0)) / questions.length) * 100}%` }} />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Text className="mb-5 text-[21px] leading-[29px] font-sg-semibold text-[#F4EFE2]">{current?.question}</Text>
        {current?.options.map((option) => {
          const isCorrect = answered && option == current.correct_option;
          const isWrong = answered && !isCorrect && option == selected;
          return (
            <Pressable
              key={option}
              disabled={answered}
              onPress={() => choose(option)}
              accessibilityRole="button"
              className={`mb-2.5 min-h-[56px] flex-row items-center rounded-[14px] border px-4 py-3 ${
                isCorrect ? 'border-[#8FD9B4] bg-[#8FD9B4]/18' : isWrong ? 'border-[#F28B76] bg-[#F28B76]/18' : 'border-[#F4EFE2]/16 bg-[#1C4336]'
              }`}
            >
              <Text className="flex-1 text-[16px] leading-[22px] font-sg-medium text-[#F4EFE2]">{option}</Text>
              {isCorrect ? <Ionicons name="checkmark-circle" size={22} color="#8FD9B4" /> : null}
              {isWrong ? <Ionicons name="close-circle" size={22} color="#F28B76" /> : null}
            </Pressable>
          );
        })}
      </ScrollView>

      {answered ? <SGButton label={index === questions.length - 1 ? 'See result' : 'Next'} variant="board" onPress={next} className="mt-3" /> : null}

      <Modal animationType="fade" transparent visible={finished} onRequestClose={restart}>
        <View className="flex-1 items-center justify-center bg-[#0F281F]/80 px-5">
          <View className="w-full rounded-[18px] bg-sg-surface p-6">
            <Text className="text-[26px] leading-[30px] font-sg-display text-sg-text">{passed ? 'Well done' : 'Keep practising'}</Text>
            <Text className="mt-3 text-[56px] leading-[60px] font-sg-display text-sg-primary" style={{ fontVariant: ['tabular-nums'] }}>
              {score}
              <Text className="text-[22px] font-sg-medium text-sg-muted"> / {questions.length}</Text>
            </Text>
            <SGButton label="Try again" onPress={restart} className="mt-5" />
            <SGButton label="Back to chapters" variant="ghost" onPress={() => navigation.navigate(backRoute)} className="mt-2.5" />
          </View>
        </View>
      </Modal>
    </ScreenLayoutContainer>
  );
}
