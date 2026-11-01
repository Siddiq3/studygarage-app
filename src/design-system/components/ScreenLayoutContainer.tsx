import React, { useMemo, type ReactElement } from "react";
import { ScrollView, View, type ScrollViewProps } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
  refreshControl?: ReactElement;
  className?: string;
  contentClassName?: string;
  variant?: "default" | "home" | "wallet" | "onboarding" | "reward" | "board";
  scrollViewProps?: ScrollViewProps;
};

const RULE_GAP = 34;
const RULE_COUNT = 40;

// Faint exercise-book rules on paper; bare chalkboard on board screens.
function PaperRules() {
  const rules = useMemo(() => Array.from({ length: RULE_COUNT }), []);
  return (
    <View pointerEvents="none" className="absolute inset-0 overflow-hidden">
      {rules.map((_, index) => (
        <View
          key={`rule-${index}`}
          className="absolute left-0 right-0 h-px bg-[#2B6A8F]/8"
          style={{ top: (index + 1) * RULE_GAP }}
        />
      ))}
    </View>
  );
}

export default function ScreenLayoutContainer({
  children,
  scroll = true,
  refreshControl,
  className = "",
  contentClassName = "",
  variant = "default",
  scrollViewProps,
}: Props) {
  const insets = useSafeAreaInsets();
  const isBoard = variant === "board";

  return (
    <View
      className={`flex-1 ${className}`}
      style={{ backgroundColor: isBoard ? "#14342A" : "#F6F1E7" }}
    >
      <StatusBar style={isBoard ? "light" : "dark"} />
      {isBoard ? null : <PaperRules />}

      {scroll ? (
        <ScrollView
          {...scrollViewProps}
          refreshControl={refreshControl}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={
            scrollViewProps?.keyboardShouldPersistTaps ?? "handled"
          }
          contentContainerStyle={{
            paddingTop: Math.max(insets.top, 14) + 12,
            paddingBottom: Math.max(insets.bottom, 12) + 16,
          }}
          className={contentClassName}
        >
          {children}
        </ScrollView>
      ) : (
        <View
          className={`flex-1 ${contentClassName}`}
          style={{
            paddingTop: Math.max(insets.top, 14) + 12,
            paddingBottom: Math.max(insets.bottom, 12) + 8,
          }}
        >
          {children}
        </View>
      )}

      <View
        pointerEvents="none"
        className="absolute left-0 right-0 top-0"
        style={{ height: insets.top, backgroundColor: isBoard ? "#14342A" : "#F6F1E7" }}
      />
    </View>
  );
}
