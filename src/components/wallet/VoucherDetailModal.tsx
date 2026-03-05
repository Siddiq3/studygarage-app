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
      <View className="flex-1 items-center justify-center bg-black/70 px-5">
        <View
          className="w-full rounded-[24px] border p-4"
          style={{
            backgroundColor: "#0B0C10",
            borderColor: "rgba(255,255,255,0.12)",
          }}
        >
          <View className="flex-row items-center justify-between">
            <View className="h-[46px] w-[46px] items-center justify-center rounded-[14px] border border-white/12 bg-[#171B25]">
              <Ionicons name={providerIcon} size={22} color="#8F74FF" />
            </View>
            <Pressable
              onPress={onCancel}
              className="h-[44px] w-[44px] items-center justify-center rounded-full border border-white/12 bg-white/5"
              accessibilityRole="button"
              accessibilityLabel="Close redeem modal"
            >
              <Ionicons name="close" size={18} color="#CCD5EB" />
            </Pressable>
          </View>

          <Text className="mt-3 text-[18px] font-extrabold text-white">
            {voucher.title}
          </Text>
          <Text className="mt-1 text-[13px] font-semibold text-[#B0BAD2]">{`₹${voucher.amount} voucher`}</Text>

          <View className="mt-3 rounded-[16px] border border-white/10 bg-white/6 p-3">
            <Text className="text-[12px] font-bold uppercase tracking-[1px] text-[#A9B4CC]">
              Cost
            </Text>
            <Text className="mt-1 text-[16px] font-extrabold text-white">
              {voucher.coinCost} coins ({formatApproxRupees(voucher.coinCost)})
            </Text>
            <Text className="mt-1 text-[11px] font-semibold text-[#FFD700]">
              {COINS_FOR_TEN_RUPEES} coins = ₹10
            </Text>
          </View>

          {!hasEnoughCoins ? (
            <View className="mt-3 rounded-[14px] border border-[#FF6E87]/30 bg-[#311926] px-3 py-2.5">
              <Text className="text-[12px] font-semibold text-[#FFD4DF]">
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
                      baseColor="rgba(255,255,255,0.14)"
                      highlightColor="rgba(255,255,255,0.34)"
                    />
                    <Text className="ml-2 text-[13px] font-extrabold text-white">
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
