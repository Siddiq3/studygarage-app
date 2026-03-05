import { View } from "react-native";
import React from "react";
import ShimmerSkeleton from "../src/components/ui/ShimmerSkeleton";

export default function Loading() {
  return (
    <View className="py-4">
      <ShimmerSkeleton height={64} borderRadius={16} />
      <ShimmerSkeleton height={64} borderRadius={16} className="mt-3" />
      <ShimmerSkeleton height={64} borderRadius={16} className="mt-3" />
    </View>
  );
}
