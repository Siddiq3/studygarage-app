import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Text, TextInput, View, useColorScheme } from "react-native";
import Snackbar from "react-native-snackbar";
import Ionicons from "@expo/vector-icons/Ionicons";
import ScreenLayoutContainer from "../../design-system/components/ScreenLayoutContainer";
import SGCard from "../../design-system/components/SGCard";
import SGButton from "../../design-system/components/SGButton";
import RedeemSuccessOverlay from "./RedeemSuccessOverlay";
import { useQuizContext } from "../../../QuizContext";
import {
  appendRedeemHistoryEntry,
  buildRedeemRequestId,
  createRedeemRequestPayload,
  submitRedeemRequestToGitHub,
} from "../../services/rewards/redeemRequestService";
import {
  normalizePhoneNumber,
  validateRedeemForm,
} from "../../services/rewards/redeemValidation";
import { getRequiredCoins } from "../../constants/rewards";
import {
  getRewardsConfig,
  getRewardsVoucherCategory,
} from "../../config/rewardsConfig";
import ShimmerSkeleton from "../../components/ui/ShimmerSkeleton";

const providerFromType = (voucherType = "") => {
  const safeType = String(voucherType).toLowerCase();
  if (safeType.includes("flip")) return "flipkart";
  if (safeType.includes("amazon")) return "amazon";
  if (safeType.includes("upi")) return "upi";
  return "google";
};

const resolveRequiredCoinsFromParams = (_amount, requiredCoins) => {
  const safeRequired = Number.isFinite(Number(requiredCoins))
    ? Number(requiredCoins)
    : 0;
  if (safeRequired > 0) return safeRequired;
  return Math.max(0, getRequiredCoins(Number(_amount) || 0));
};

const resolveRequiredCoinsFromCatalog = async ({
  categoryId,
  provider,
  voucherType,
  itemId,
  amount,
  fallbackCoins,
}) => {
  const normalizedCategoryId = String(
    categoryId || provider || providerFromType(voucherType)
  ).toLowerCase();
  try {
    const config = await getRewardsConfig();
    const category = getRewardsVoucherCategory(config, normalizedCategoryId);
    if (!category || !Array.isArray(category.items) || category.items.length === 0) {
      return fallbackCoins;
    }

    const normalizedItemId = String(itemId || "").trim().toLowerCase();
    const byId = category.items.find(
      (item) => String(item?.id || "").toLowerCase() === normalizedItemId
    );
    if (byId && Number.isFinite(Number(byId.coins))) {
      return Math.max(0, Number(byId.coins));
    }

    const amountNumber = Number(amount) || 0;
    const byAmount = category.items.find(
      (item) => Number(item?.amount) === amountNumber
    );
    if (byAmount && Number.isFinite(Number(byAmount.coins))) {
      return Math.max(0, Number(byAmount.coins));
    }
  } catch (_error) {
    // Fallback to route value safely.
  }
  return fallbackCoins;
};

export default function RedeemFormScreen({ navigation, route }) {
  const isDark = useColorScheme() === "dark";
  const { totalScore, addCoins, spendCoins } = useQuizContext();

  const voucherType = route?.params?.voucherType || "Google";
  const amount = Number(route?.params?.amount || 0);
  const provider =
    route?.params?.provider || providerFromType(route?.params?.voucherType);
  const categoryId = route?.params?.categoryId || provider;
  const itemId = route?.params?.itemId;
  const isUpiRedeem = provider === "upi";

  const fallbackRequiredCoins = useMemo(
    () =>
      resolveRequiredCoinsFromParams(
        amount,
        route?.params?.requiredCoins ?? route?.params?.coinsRequired
      ),
    [amount, route?.params?.coinsRequired, route?.params?.requiredCoins]
  );
  const [requiredCoins, setRequiredCoins] = useState(fallbackRequiredCoins);

  useEffect(() => {
    let mounted = true;
    resolveRequiredCoinsFromCatalog({
      categoryId,
      provider,
      voucherType,
      itemId,
      amount,
      fallbackCoins: fallbackRequiredCoins,
    })
      .then((resolvedCoins) => {
        if (!mounted) return;
        setRequiredCoins(resolvedCoins);
      })
      .catch(() => {
        if (!mounted) return;
        setRequiredCoins(fallbackRequiredCoins);
      });
    return () => {
      mounted = false;
    };
  }, [amount, categoryId, fallbackRequiredCoins, itemId, provider, voucherType]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [upiId, setUpiId] = useState("");
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    upiId: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [successOverlayVisible, setSuccessOverlayVisible] = useState(false);
  const [successOverlayData, setSuccessOverlayData] = useState({
    voucherType,
    amount,
    coinsUsed: requiredCoins,
    status: "PENDING",
  });

  const closeWithDefaultNavigation = useCallback(() => {
    if (navigation?.canGoBack?.()) {
      const routeCount = navigation?.getState?.()?.routes?.length || 0;
      if (typeof navigation.pop === "function" && routeCount >= 3) {
        navigation.pop(2);
      } else {
        navigation.navigate("TotalScorePage");
      }
    } else {
      navigation.navigate("TotalScorePage");
    }
  }, [navigation]);

  const handleSuccessOverlayClose = useCallback(() => {
    setSuccessOverlayVisible(false);
    closeWithDefaultNavigation();
  }, [closeWithDefaultNavigation]);

  const handleViewHistoryFromSuccess = useCallback(() => {
    setSuccessOverlayVisible(false);
    try {
      navigation.navigate("WalletActivityScreen");
    } catch (_error) {
      closeWithDefaultNavigation();
    }
  }, [closeWithDefaultNavigation, navigation]);

  const handleSubmit = async () => {
    if (submitting) return;

    const validation = validateRedeemForm({
      fullName,
      email,
      phoneNumber,
      upiId,
      requireUpiId: isUpiRedeem,
    });
    setErrors(validation.errors);
    if (!validation.isValid) {
      return;
    }

    if (totalScore < requiredCoins) {
      Snackbar.show({
        text: `You need ${requiredCoins - totalScore} more coins.`,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: "#2A1720",
        textColor: "#FFD4DF",
      });
      return;
    }

    const requestId = buildRedeemRequestId();
    const redeemObject = createRedeemRequestPayload({
      id: requestId,
      name: validation.values.fullName,
      email: validation.values.email,
      phone: validation.values.phoneNumber,
      voucherType,
      provider,
      amount,
      coinsUsed: requiredCoins,
      upiId: validation.values.upiId,
    });

    let coinsDeducted = false;
    setSubmitting(true);

    try {
      const spendResult = await spendCoins({
        eventId: `redeem:${requestId}`,
        amount: requiredCoins,
        reason: "redeem_voucher",
        source: "redeem_voucher",
        meta: {
          requestId,
          voucherType,
          provider,
          itemId: itemId || null,
          amount,
          categoryId,
        },
      });
      if (!spendResult.ok || !spendResult.applied) {
        const shortfall = Math.max(0, requiredCoins - totalScore);
        Snackbar.show({
          text:
            shortfall > 0
              ? `You need ${shortfall} more coins.`
              : "Unable to process coin deduction. Please retry.",
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: "#2A1720",
          textColor: "#FFD4DF",
        });
        return;
      }
      coinsDeducted = true;

      await submitRedeemRequestToGitHub(redeemObject);

      await appendRedeemHistoryEntry({
        id: redeemObject.id,
        provider,
        voucherType,
        amount,
        coinsUsed: requiredCoins,
        createdAt: redeemObject.createdAt,
      });

      setSuccessOverlayData({
        voucherType,
        amount,
        coinsUsed: requiredCoins,
        status: "PENDING",
      });
      setSuccessOverlayVisible(true);
    } catch (error) {
      console.error("Redeem request failed:", error);

      if (coinsDeducted) {
        try {
          await addCoins({
            eventId: `refund:${requestId}`,
            amount: requiredCoins,
            source: "redeem_refund",
            meta: {
              requestId,
              reason: "redeem_submit_failed",
            },
          });
        } catch (rollbackError) {
          console.error("Coin rollback failed:", rollbackError);
        }
      }

      Alert.alert(
        "Redeem failed",
        "Unable to submit redeem request. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ScreenLayoutContainer variant="wallet" contentClassName="px-4" scroll>
        <SGCard className="mb-4 overflow-hidden">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-3">
              <Text className="text-[11px] font-bold uppercase tracking-[1.1px] text-sg-muted dark:text-sgd-muted">
                Redeem Form
              </Text>
              <Text
                className="mt-1 text-[24px] font-extrabold leading-[30px] text-sg-text dark:text-sgd-text"
                numberOfLines={1}
              >
                Submit Voucher Request
              </Text>
              <Text className="mt-1 text-[13px] font-medium text-[#AEB8CF]">
                Fill your details to complete this redeem request.
              </Text>
            </View>

            <View className="rounded-full border border-[#FFD700]/25 bg-[#2A2414] px-3 py-1.5">
              <View className="flex-row items-center">
                <Ionicons name="flame-outline" size={12} color="#FFD700" />
                <Text className="ml-1 text-[11px] font-extrabold text-[#FFD700]">
                  {totalScore}
                </Text>
              </View>
            </View>
          </View>

          <View className="mt-4 gap-3">
            <InputField
              placeholder="Full Name"
              iconName="person-outline"
              value={fullName}
              onChangeText={setFullName}
              isDark={isDark}
              error={errors.fullName}
            />
            <InputField
              placeholder="Email"
              iconName="mail-outline"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              isDark={isDark}
              error={errors.email}
            />
            <InputField
              placeholder="Phone Number"
              iconName="call-outline"
              value={phoneNumber}
              onChangeText={(value) =>
                setPhoneNumber(normalizePhoneNumber(value))
              }
              keyboardType="phone-pad"
              isDark={isDark}
              error={errors.phoneNumber}
            />
            {isUpiRedeem ? (
              <InputField
                placeholder="UPI ID (example@upi)"
                iconName="at-outline"
                value={upiId}
                onChangeText={(value) => setUpiId(String(value || "").trim())}
                keyboardType="email-address"
                autoCapitalize="none"
                isDark={isDark}
                error={errors.upiId}
              />
            ) : null}

            <InputField
              placeholder="Voucher Type"
              iconName="gift-outline"
              value={voucherType}
              editable={false}
              isDark={isDark}
            />
            <InputField
              placeholder="Amount"
              iconName="cash-outline"
              value={`₹${amount}`}
              editable={false}
              isDark={isDark}
            />
            <InputField
              placeholder="Coins Required"
              iconName="flame-outline"
              value={`${requiredCoins}`}
              editable={false}
              isDark={isDark}
            />
          </View>

          <View className="mt-5">
            {submitting ? (
              <View className="min-h-[52px] flex-row items-center justify-center rounded-[16px] border border-white/12 bg-[#151B27]">
                <ShimmerSkeleton
                  width={18}
                  height={18}
                  borderRadius={9}
                  baseColor="rgba(255,255,255,0.14)"
                  highlightColor="rgba(255,255,255,0.34)"
                />
                <Text className="ml-2 text-[14px] font-extrabold text-white">
                  Submitting request...
                </Text>
              </View>
            ) : (
              <SGButton label="Submit Redeem Request" onPress={handleSubmit} />
            )}
          </View>

          <SGButton
            label="Go Back"
            onPress={() => navigation.goBack()}
            variant="ghost"
            className="mt-3"
          />
        </SGCard>
      </ScreenLayoutContainer>

      <RedeemSuccessOverlay
        visible={successOverlayVisible}
        data={successOverlayData}
        onClose={handleSuccessOverlayClose}
        onViewHistory={handleViewHistoryFromSuccess}
      />
    </>
  );
}

function InputField({
  placeholder,
  iconName,
  value,
  onChangeText,
  isDark,
  keyboardType = "default",
  autoCapitalize = "sentences",
  editable = true,
  error = "",
}) {
  return (
    <View>
      <View
        className="flex-row items-center rounded-[16px] border border-white/10 px-4 py-3"
        style={{ backgroundColor: editable ? "#141A25" : "#111622" }}
      >
        <View className="mr-2 h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#1D2431]">
          <Ionicons name={iconName} size={15} color="#BAC5DC" />
        </View>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={isDark ? "#AEB5C6" : "#7A6A66"}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
          className="flex-1 text-[16px] font-semibold text-sg-text dark:text-sgd-text"
        />
      </View>
      {error ? (
        <Text className="mt-1 pl-1 text-[11px] font-semibold text-[#FF8AA3]">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
