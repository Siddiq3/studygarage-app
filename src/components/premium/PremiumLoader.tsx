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
        baseColor="rgba(29,42,36,0.16)"
        highlightColor="rgba(29,42,36,0.34)"
      />
      <PremiumText variant="caption" className="mt-2 text-sg-text/80">
        {label}
      </PremiumText>
    </View>
  );
}
