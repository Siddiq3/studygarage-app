import React from "react";
import { Text, View, type LayoutChangeEvent } from "react-native";
import SurfaceCard from "../ui/SurfaceCard";
import PrimaryButton from "../ui/PrimaryButton";
import Coin from "./Coin";

type Props = {
  coinsToGive: number;
  claimedToday: boolean;
  onClaim: () => void | Promise<void>;
  disabledReason?: string;
  isClaiming?: boolean;
  claimButtonRef?: React.RefObject<View | null>;
  onClaimButtonLayout?: (event: LayoutChangeEvent) => void;
};

export default function DailyCheckInCard({
  coinsToGive,
  claimedToday,
  onClaim,
  disabledReason,
  isClaiming = false,
  claimButtonRef,
  onClaimButtonLayout,
}: Props) {
  const isLocked = Boolean(disabledReason) && !claimedToday;
  const disabled = claimedToday || isLocked || isClaiming;

  return (
    <SurfaceCard
      className="mt-4 rounded-[22px]"
      style={{
        backgroundColor: "rgba(255,255,255,0.06)",
        borderColor: "rgba(255,255,255,0.10)",
      }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-[17px] font-extrabold text-white">
            Daily Check-In Reward
          </Text>
          <Text className="mt-1 text-[12px] font-semibold text-[#A8B2CA]">
            Come back everyday to earn extra coins
          </Text>

          <View className="mt-2.5 flex-row items-center self-start rounded-full border border-[#FFD700]/28 bg-[#2D2410]/70 px-2.5 py-1">
            <Coin size={14} compact />
            <Text className="ml-1.5 text-[12px] font-black text-[#F0CE7A]">
              +{coinsToGive}
            </Text>
          </View>
        </View>

        <View className="w-[132px] items-end">
          <View
            ref={claimButtonRef}
            collapsable={false}
            onLayout={onClaimButtonLayout}
            className="w-full"
          >
            <PrimaryButton
              label={claimedToday ? "CLAIMED" : isLocked ? "LOCKED" : "CLAIM"}
              onPress={onClaim}
              disabled={disabled}
              loading={isClaiming}
              className={claimedToday || isLocked ? "opacity-60" : ""}
              textClassName="text-[12px] font-extrabold tracking-[0.8px]"
              style={
                claimedToday || isLocked
                  ? undefined
                  : {
                      shadowColor: "#D8B66A",
                      shadowOpacity: 0.12,
                      shadowRadius: 8,
                      shadowOffset: { width: 0, height: 3 },
                      elevation: 3,
                    }
              }
            />
          </View>

          {isLocked ? (
            <Text className="mt-1.5 text-right text-[10px] font-semibold text-[#98A3BF]">
              Check-in resets tomorrow
            </Text>
          ) : null}
        </View>
      </View>
    </SurfaceCard>
  );
}
