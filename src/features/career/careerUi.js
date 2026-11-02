import React, { useCallback } from "react";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BannerAdComponent from "../../../BannerAd";
import useInterstitialAd from "../../../InterstitialAdComponent";
import ScreenLayoutContainer from "../../design-system/components/ScreenLayoutContainer";
import SGSelect from "../../design-system/components/SGSelect";
import { CAREER_LANGUAGES } from "./careerI18n";

const AD_GAP_MS = 60000;
let lastAdAt = 0;

// Students open several pages while comparing, so an ad on every tap would interrupt them.
export function useCareerInterstitial() {
  const { showAd } = useInterstitialAd();
  return useCallback(() => {
    const now = Date.now();
    if (now - lastAdAt < AD_GAP_MS) return;
    lastAdAt = now;
    // No ad was ready: let the next navigation try again instead of waiting out the gap.
    showAd().then((shown) => {
      if (!shown) lastAdAt = 0;
    });
  }, [showAd]);
}

// Every career page: scrolling content with the banner fixed below it.
export function CareerPage({ variant = "home", contentClassName = "px-4 pb-6", children }) {
  const insets = useSafeAreaInsets();
  const isBoard = variant === "board";

  return (
    <View className="flex-1" style={{ backgroundColor: isBoard ? "#14342A" : "#F6F1E7" }}>
      <ScreenLayoutContainer variant={variant} contentClassName={contentClassName} scroll>
        {children}
      </ScreenLayoutContainer>
      <View
        className={`items-center border-t pt-1.5 ${isBoard ? "border-[#F4EFE2]/16" : "border-sg-border"}`}
        style={{ paddingBottom: Math.max(insets.bottom, 6) }}
      >
        <BannerAdComponent />
      </View>
    </View>
  );
}

export function GoodToKnow({ title, text }) {
  return (
    <View className="mb-3 flex-row rounded-[16px] bg-sg-marigoldSoft p-4">
      <Ionicons name="bulb" size={20} color="#9A6400" />
      <View className="ml-2.5 flex-1">
        <Text className="text-[15px] font-sg-bold text-sg-text">{title}</Text>
        <Text className="mt-1 text-[14px] leading-[21px] font-sg-medium text-sg-text">{text}</Text>
      </View>
    </View>
  );
}

// Set once, so it stays a small dropdown in the header instead of pushing the content down.
export function LanguageBar({ lang, onChange }) {
  const options = CAREER_LANGUAGES.map((item) => ({ value: item.key, label: item.label }));
  return <SGSelect compact icon="language" sheetTitle="Language / భాష / ಭಾಷೆ / மொழி / भाषा" value={lang} options={options} onChange={onChange} />;
}
