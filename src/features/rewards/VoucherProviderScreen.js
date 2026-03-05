import React, { useCallback, useMemo } from "react";
import { FlatList, Text, View } from "react-native";
import Snackbar from "react-native-snackbar";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuizContext } from "../../../QuizContext";
import ScreenLayoutContainer from "../../design-system/components/ScreenLayoutContainer";
import PressableScale from "../../components/ui/PressableScale";
import VoucherAmountCard from "../../components/wallet/VoucherAmountCard";
import useVoucherCatalog from "../../hooks/useVoucherCatalog";
import ShimmerSkeleton from "../../components/ui/ShimmerSkeleton";

const PROVIDER_META = {
  google: {
    title: "Google Voucher",
    subtitle: "Choose your redeem amount",
    voucherType: "Google",
    defaultBrand: "Google Play",
  },
  flipkart: {
    title: "Flipkart Voucher",
    subtitle: "Choose your redeem amount",
    voucherType: "Flipkart",
    defaultBrand: "Flipkart",
  },
  amazon: {
    title: "Amazon Voucher",
    subtitle: "Choose your redeem amount",
    voucherType: "Amazon",
    defaultBrand: "Amazon Pay",
  },
  upi: {
    title: "Get on UPI",
    subtitle: "Choose your redeem amount",
    voucherType: "UPI",
    defaultBrand: "UPI",
  },
};

export default function VoucherProviderScreen({
  navigation,
  provider = "google",
}) {
  const insets = useSafeAreaInsets();
  const { totalScore } = useQuizContext();
  const {
    items: catalogItems,
    loading: catalogLoading,
    refreshing,
    refresh,
    category,
    error,
  } = useVoucherCatalog(provider);

  const providerConfig = PROVIDER_META[provider] || PROVIDER_META.google;
  const config = useMemo(
    () => ({
      ...providerConfig,
      title: category?.title || providerConfig.title,
      brand: category?.brand || providerConfig.defaultBrand,
    }),
    [category?.brand, category?.title, providerConfig]
  );

  const vouchers = useMemo(
    () =>
      catalogItems.map((item) => ({
        id: String(item.id || `${provider}_${item.amount}`),
        itemId: String(item.id || `${provider}_${item.amount}`),
        provider,
        amount: Number(item.amount || 0),
        coinCost: Number(item.coins || 0),
        label: String(item.label || "Redeem Code"),
        brand: config.brand,
        enabled: item.enabled !== false,
      })),
    [catalogItems, config.brand, provider]
  );

  const handleVoucherPress = useCallback(
    (voucher) => {
      if (voucher.enabled === false) {
        return;
      }

      const requiredCoins = Number(voucher.coinCost || 0);
      if (totalScore < requiredCoins) {
        Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Warning
        ).catch(() => {});
        Snackbar.show({
          text: `You need ${requiredCoins - totalScore} more coins.`,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: "#2A1720",
          textColor: "#FFD4DF",
        });
        return;
      }

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      navigation.navigate("RedeemFormScreen", {
        voucherType: config.voucherType,
        provider,
        amount: voucher.amount,
        categoryId: provider,
        itemId: voucher.itemId || voucher.id,
        title: voucher.label || "Redeem Code",
        brand: category?.brand || config.voucherType,
      });
    },
    [category?.brand, config.voucherType, navigation, provider, totalScore]
  );

  const renderHeader = useMemo(
    () => (
      <View className="px-4 pb-2 pt-1">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-3">
            <Text
              className="text-[28px] font-extrabold leading-[33px] text-[#F5F7FF]"
              style={{ fontFamily: "Sora_800ExtraBold" }}
              numberOfLines={1}
            >
              {config.title}
            </Text>
            <Text
              className="mt-1 text-[13px] font-medium text-[#B8C0D4]"
              style={{ fontFamily: "Inter_500Medium" }}
            >
              {config.subtitle}
            </Text>
          </View>

          <View className="rounded-full border border-[#FFD700]/25 bg-[#2A2414] px-3 py-1.5">
            <View className="flex-row items-center">
              <Ionicons name="flame-outline" size={13} color="#FFD700" />
              <Text
                className="ml-1 text-[12px] font-extrabold text-[#FFD700]"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                {totalScore}
              </Text>
            </View>
          </View>
        </View>

        {error ? (
          <Text
            className="mt-1 text-[11px] text-[#9CA6BD]"
            style={{ fontFamily: "Inter_500Medium" }}
          >
            Using cached voucher catalog.
          </Text>
        ) : null}
      </View>
    ),
    [config.subtitle, config.title, error, totalScore]
  );

  return (
    <ScreenLayoutContainer variant="wallet" scroll={false}>
      <View className="flex-1">
        {renderHeader}

        {catalogLoading && !vouchers.length ? (
          <View className="px-4 pt-2">
            <View className="flex-row flex-wrap" style={{ gap: 14 }}>
              {[0, 1, 2, 3].map((idx) => (
                <View key={`voucher-grid-loader-${idx}`} className="w-[48%]">
                  <ShimmerSkeleton height={158} borderRadius={22} />
                </View>
              ))}
            </View>
          </View>
        ) : (
          <FlatList
            data={vouchers}
            keyExtractor={(item) => item.id}
            numColumns={2}
            refreshing={refreshing}
            onRefresh={refresh}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: insets.bottom + 24,
              paddingTop: 4,
            }}
            columnWrapperStyle={{ columnGap: 14, marginBottom: 14 }}
            renderItem={({ item, index }) => {
              const isUnavailable = item.enabled === false;
              const isLocked = !isUnavailable && totalScore < item.coinCost;
              return (
                <Animated.View
                  entering={FadeInUp.delay(70 + index * 60).duration(240)}
                  className="min-w-0 flex-1"
                >
                  <VoucherAmountCard
                    item={item}
                    isLocked={isLocked}
                    isUnavailable={isUnavailable}
                    coinsNeeded={Math.max(0, item.coinCost - totalScore)}
                    onPress={() => handleVoucherPress(item)}
                  />
                </Animated.View>
              );
            }}
            ListEmptyComponent={
              <View className="mt-10 items-center px-4">
                <Text
                  className="text-center text-[13px] text-[#B8C0D4]"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  No voucher amounts available right now.
                </Text>
              </View>
            }
            ListFooterComponent={
              <View className="pt-3">
                <PressableScale
                  onPress={() => navigation.goBack()}
                  activeScale={0.98}
                  hapticType="none"
                  className="self-start px-1 py-1"
                >
                  <View className="flex-row items-center">
                    <Ionicons name="chevron-back" size={14} color="#9EA8BE" />
                    <Text
                      className="ml-1 text-[13px] font-semibold text-[#B8C0D4]"
                      style={{ fontFamily: "Inter_500Medium" }}
                    >
                      Back
                    </Text>
                  </View>
                </PressableScale>
              </View>
            }
          />
        )}
      </View>
    </ScreenLayoutContainer>
  );
}
