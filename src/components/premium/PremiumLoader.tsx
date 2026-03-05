import React from "react";
import { View } from "react-native";
import PremiumText from "./PremiumText";
import ShimmerSkeleton from "../ui/ShimmerSkeleton";

type Props = {
  label?: string;
};

export default function PremiumLoader({ label = "Loading..." }: Props) {
  return (
    <View className="items-center justify-center py-6">
      <ShimmerSkeleton
        width={36}
        height={36}
        borderRadius={18}
        baseColor="rgba(255,255,255,0.16)"
        highlightColor="rgba(255,255,255,0.34)"
      />
      <PremiumText variant="caption" className="mt-2 text-white/80">
        {label}
      </PremiumText>
    </View>
  );
}
