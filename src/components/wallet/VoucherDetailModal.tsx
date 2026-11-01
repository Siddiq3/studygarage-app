import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { VoucherItem, VoucherProvider } from "../../hooks/useRedeem";
import {
  COINS_FOR_TEN_RUPEES,
  formatApproxRupees,
} from "../../constants/rewards";
import PrimaryButton from "../ui/PrimaryButton";
import ShimmerSkeleton from "../ui/ShimmerSkeleton";

type Props = {
  visible: boolean;
  voucher: VoucherItem | null;
  userCoins: number;
  isRedeeming?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const providerIconMap: Record<VoucherProvider, keyof typeof Ionicons.glyphMap> =
  {
    google: "logo-google-playstore",
    flipkart: "cart-outline",
    amazon: "bag-handle-outline",
    upi: "qr-code-outline",
  };

export default function VoucherDetailModal({
  visible,
  voucher,
  userCoins,
  isRedeeming = false,
  onCancel,
  onConfirm,
}: Props) {
  if (!voucher) return null;

  const shortfall = Math.max(0, voucher.coinCost - userCoins);
  const hasEnoughCoins = shortfall <= 0;
  const providerIcon = providerIconMap[voucher.provider] || "gift-outline";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View className="flex-1 items-center justify-center bg-sg-bg2 px-5">
        <View
          className="w-full rounded-[18px] border p-4"
          style={{
            backgroundColor: "#FFFCF5",
            borderColor: "rgba(29,42,36,0.12)",
          }}
        >
          <View className="flex-row items-center justify-between">
            <View className="h-[46px] w-[46px] items-center justify-center rounded-[14px] border border-sg-border bg-[#FFFCF5]">
              <Ionicons name={providerIcon} size={22} color="#17694F" />
            </View>
            <Pressable
              onPress={onCancel}
              className="h-[44px] w-[44px] items-center justify-center rounded-full border border-sg-border bg-sg-bg2"
              accessibilityRole="button"
              accessibilityLabel="Close redeem modal"
            >
              <Ionicons name="close" size={18} color="#1D2A24" />
            </Pressable>
          </View>

          <Text className="mt-3 text-[18px] font-sg-extrabold text-sg-text">
            {voucher.title}
          </Text>
          <Text className="mt-1 text-[13px] font-sg-semibold text-[#1D2A24]">{`₹${voucher.amount} voucher`}</Text>

          <View className="mt-3 rounded-[16px] border border-sg-border bg-sg-bg2 p-3">
            <Text className="text-[12px] font-sg-bold text-[#1D2A24]">
              Cost
            </Text>
            <Text className="mt-1 text-[16px] font-sg-extrabold text-sg-text">
              {voucher.coinCost} coins ({formatApproxRupees(voucher.coinCost)})
            </Text>
            <Text className="mt-1 text-[12px] font-sg-semibold text-[#9A6400]">
              {COINS_FOR_TEN_RUPEES} coins = ₹10
            </Text>
          </View>

          {!hasEnoughCoins ? (
            <View className="mt-3 rounded-[14px] border border-[#BF3F2B]/30 bg-[#FFFCF5] px-3 py-2.5">
              <Text className="text-[12px] font-sg-semibold text-[#BF3F2B]">
                Insufficient Balance! You need {shortfall} more coins.
              </Text>
            </View>
          ) : null}

          <View className="mt-4 flex-row gap-2">
            <View className="flex-1">
              <PrimaryButton
                label="Cancel"
                onPress={onCancel}
                variant="ghost"
              />
            </View>
            <View className="flex-1">
              <PrimaryButton
                label="Confirm"
                onPress={onConfirm}
                disabled={!hasEnoughCoins || isRedeeming}
              >
                {isRedeeming ? (
                  <View className="min-h-[44px] flex-row items-center justify-center">
                    <ShimmerSkeleton
                      width={16}
                      height={16}
                      borderRadius={8}
                      baseColor="rgba(29,42,36,0.14)"
                      highlightColor="rgba(29,42,36,0.34)"
                    />
                    <Text className="ml-2 text-[13px] font-sg-extrabold text-sg-text">
                      Confirming...
                    </Text>
                  </View>
                ) : undefined}
              </PrimaryButton>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
