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
      className="mt-4 rounded-[18px]"
      style={{
        backgroundColor: "rgba(29,42,36,0.06)",
        borderColor: "rgba(29,42,36,0.10)",
      }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-[17px] font-sg-extrabold text-sg-text">
            Daily Check-In Reward
          </Text>
          <Text className="mt-1 text-[12px] font-sg-semibold text-[#1D2A24]">
            Come back everyday to earn extra coins
          </Text>

          <View className="mt-2.5 flex-row items-center self-start rounded-full border border-[#9A6400]/28 bg-[#FFFCF5]/70 px-2.5 py-1">
            <Coin size={14} compact />
            <Text className="ml-1.5 text-[12px] font-sg-extrabold text-[#9A6400]">
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
              textClassName="text-[12px] font-sg-extrabold"
              style={
                claimedToday || isLocked
                  ? undefined
                  : {
                      shadowColor: "#3B3322",
                      shadowOpacity: 0.12,
                      shadowRadius: 8,
                      shadowOffset: { width: 0, height: 3 },
                      elevation: 3,
                    }
              }
            />
          </View>

          {isLocked ? (
            <Text className="mt-1.5 text-right text-[12px] font-sg-semibold text-[#47544D]">
              Check-in resets tomorrow
            </Text>
          ) : null}
        </View>
      </View>
    </SurfaceCard>
  );
}
