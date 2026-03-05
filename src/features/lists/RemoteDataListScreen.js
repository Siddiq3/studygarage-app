import React, { useEffect, useMemo, useState } from "react";
import { BackHandler, FlatList, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import useInterstitialAd from "../../../InterstitialAdComponent";
import ScreenLayoutContainer from "../../design-system/components/ScreenLayoutContainer";
import SGCard from "../../design-system/components/SGCard";
import SGEmptyState from "../../design-system/components/SGEmptyState";
import AnimatedActionCard from "../../design-system/components/AnimatedActionCard";
import ShimmerSkeleton from "../../components/ui/ShimmerSkeleton";

export default function RemoteDataListScreen({
  navigation,
  fetchUrl,
  destinationRoute,
  title = "Practice Sets",
  subtitle = "Open a set to continue",
  variant = "home",
}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { showAd } = useInterstitialAd();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(fetchUrl);
        const result = await response.json();
        setData(result?.results || result || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigation.goBack();
        return true;
      }
    );

    return () => backHandler.remove();
  }, [fetchUrl, navigation]);

  const onOpen = (url) => {
    showAd();
    navigation.navigate(destinationRoute, { url });
  };

  const listData = useMemo(() => data || [], [data]);

  return (
    <ScreenLayoutContainer variant={variant} contentClassName="px-4" scroll>
      <Animated.View entering={FadeInDown.duration(220)}>
        <SGCard className="mb-4">
          <Text className="text-[11px] font-bold uppercase tracking-[1.1px] text-sg-muted dark:text-sgd-muted">
            StudyGarage
          </Text>
          <Text className="mt-1 text-[26px] font-extrabold leading-[30px] text-sg-text dark:text-sgd-text">
            {title}
          </Text>
          <Text className="mt-1 text-[13px] font-medium text-sg-muted dark:text-sgd-muted">
            {subtitle}
          </Text>
        </SGCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(60).duration(220)}>
        <SGCard className="mb-4">
          {loading ? (
            <View className="py-4">
              {[0, 1, 2, 3, 4].map((idx) => (
                <View key={`remote-list-loader-${idx}`} className="mb-3">
                  <ShimmerSkeleton height={64} borderRadius={18} />
                </View>
              ))}
            </View>
          ) : listData.length > 0 ? (
            <FlatList
              data={listData}
              scrollEnabled={false}
              keyExtractor={(item, index) =>
                `${item?.title || "item"}-${index}`
              }
              renderItem={({ item, index }) => (
                <Animated.View
                  entering={FadeInDown.delay(20 + index * 10).duration(160)}
                  className="mb-3"
                >
                  <AnimatedActionCard onPress={() => onOpen(item.url)}>
                    <View className="rounded-[18px] border border-sg-border bg-sg-surface/88 px-4 py-4 dark:border-sgd-border dark:bg-sgd-surface/88">
                      <View className="flex-row items-center justify-between">
                        <Text className="flex-1 text-[15px] font-bold text-sg-text dark:text-sgd-text">
                          {item?.title || "Untitled"}
                        </Text>
                        <Text className="ml-3 text-[12px] font-semibold text-sg-muted dark:text-sgd-muted">
                          Open
                        </Text>
                      </View>
                    </View>
                  </AnimatedActionCard>
                </Animated.View>
              )}
            />
          ) : (
            <SGEmptyState
              title="No sets available"
              subtitle="Please try again after some time."
              badgeLabel="EMPTY"
              compact
            />
          )}
        </SGCard>
      </Animated.View>
    </ScreenLayoutContainer>
  );
}
