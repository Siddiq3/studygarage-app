import React, { useEffect, useMemo, useState } from "react";
import { BackHandler, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import useInterstitialAd from "../../../InterstitialAdComponent";
import ScreenLayoutContainer from "../../design-system/components/ScreenLayoutContainer";
import ScreenHeader from "../../design-system/components/ScreenHeader";
import ContentsList from "../../design-system/components/ContentsList";
import SGEmptyState from "../../design-system/components/SGEmptyState";
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
      <ScreenHeader title={title} subtitle={subtitle} />
      <Animated.View entering={FadeInDown.duration(220)}>
        {loading ? (
          <View className="gap-2.5">
            {[0, 1, 2, 3, 4].map((idx) => (
              <ShimmerSkeleton key={`remote-list-loader-${idx}`} height={60} borderRadius={16} />
            ))}
          </View>
        ) : listData.length > 0 ? (
          <ContentsList
            numbered
            getKey={(item, index) => `${item.label}-${index}`}
            items={listData.map((item) => ({
              label: item?.title || 'Untitled',
              onPress: () => onOpen(item.url),
            }))}
          />
        ) : (
          <SGEmptyState title="No sets available" subtitle="Please try again after some time." />
        )}
      </Animated.View>
    </ScreenLayoutContainer>
  );
}
