import React from "react";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { STATUS } from "./eligibility";

export const STATUS_UI = {
  [STATUS.ELIGIBLE_NOW]: { label: "Eligible now", icon: "checkmark-circle", color: "#1C7C55", bg: "#DDEFE4" },
  [STATUS.FINAL_YEAR]: { label: "Final year: you can apply", icon: "time", color: "#8A5B00", bg: "#FBF0D0" },
  [STATUS.AFTER_RESULT]: { label: "Eligible after your final result", icon: "time", color: "#8A5B00", bg: "#FBF0D0" },
  [STATUS.LATER]: { label: "Open when you finish your course", icon: "hourglass", color: "#2B6A8F", bg: "#DCE9F1" },
  [STATUS.AGE_LIMIT]: { label: "Outside the age limit", icon: "alert-circle", color: "#BF3F2B", bg: "#F8E1DC" },
  [STATUS.CHECK_MARKS]: { label: "Your course fits. Check the marks rule", icon: "alert-circle", color: "#8A5B00", bg: "#FBF0D0" },
  [STATUS.CHECK_NOTICE]: { label: "Depends on each advertisement", icon: "document-text", color: "#8A5B00", bg: "#FBF0D0" },
  [STATUS.THIRD_YEAR]: { label: "Open from the third year of your degree", icon: "hourglass", color: "#2B6A8F", bg: "#DCE9F1" },
  [STATUS.AFTER_DEGREE]: { label: "Open after a degree", icon: "school", color: "#2B6A8F", bg: "#DCE9F1" },
  [STATUS.COMPANY_RULES]: { label: "Each company sets its own rules", icon: "business", color: "#0F6E78", bg: "#D9ECEE" },
  [STATUS.NOT_ELIGIBLE]: { label: "Not eligible with this course", icon: "close-circle", color: "#5F6A63", bg: "#ECE6D9" },
  [STATUS.UNVERIFIED]: { label: "Rules being verified", icon: "help-circle", color: "#5F6A63", bg: "#ECE6D9" },
};

export default function StatusPill({ status, t }) {
  const ui = STATUS_UI[status];
  return (
    <View className="flex-row items-start rounded-[10px] px-2.5 py-1.5" style={{ backgroundColor: ui.bg }}>
      <Ionicons name={ui.icon} size={16} color={ui.color} style={{ marginTop: 2 }} />
      <Text className="ml-1.5 flex-1 text-[14px] leading-[20px] font-sg-bold" style={{ color: ui.color }}>
        {t(ui.label)}
      </Text>
    </View>
  );
}
