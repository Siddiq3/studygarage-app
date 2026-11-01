import React, { useEffect, useMemo, useState } from "react";
import { BackHandler, View } from "react-native";
import axios from "axios";
import Animated from "react-native-reanimated";
import ScreenLayoutContainer from "./src/design-system/components/ScreenLayoutContainer";
import ScreenHeader from "./src/design-system/components/ScreenHeader";
import ContentsList from "./src/design-system/components/ContentsList";
import SGEmptyState from "./src/design-system/components/SGEmptyState";
import { buildQuizChaptersUrl } from "./src/utils/quizDataUrl";
import ShimmerSkeleton from "./src/components/ui/ShimmerSkeleton";

const ChapterDetails = ({ route, navigation }) => {
  const { stateBoard, classValue, subject } = route.params;
  const [chapterDetails, setChapterDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = buildQuizChaptersUrl({ stateBoard, classValue, subject });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setChapterDetails(response?.data?.results || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigation.goBack();
        return true;
      }
    );

    return () => backHandler.remove();
  }, [navigation]);

  const uniqueChapters = useMemo(() => {
    const seenLabels = new Set();
    return chapterDetails.reduce((acc, item) => {
      const chapterLabel = String(item?.chapter || "").trim();
      if (!chapterLabel || seenLabels.has(chapterLabel)) return acc;
      seenLabels.add(chapterLabel);
      acc.push({
        chapter: chapterLabel,
        slug: String(item?.slug || "").trim(),
        file: String(item?.file || "").trim(),
      });
      return acc;
    }, []);
  }, [chapterDetails]);

  const handleChapterPress = (selectedChapter) => {
    navigation.navigate("Quiz", {
      stateBoard,
      classValue,
      subject,
      chapter: selectedChapter?.chapter || "",
      chapterSlug: selectedChapter?.slug || "",
      chapterFile: selectedChapter?.file || "",
    });
  };

  return (
    <ScreenLayoutContainer variant="home" contentClassName="px-4" scroll>
      <ScreenHeader tone="board" icon="layers" eyebrow="Chapters" title={subject} subtitle="Choose a chapter to start the quiz" />
      <Animated.View>
        {loading ? (
          <View className="gap-2.5">
            {[0, 1, 2, 3].map((idx) => (
              <ShimmerSkeleton key={`chapter-loader-${idx}`} height={64} borderRadius={16} />
            ))}
          </View>
        ) : uniqueChapters.length ? (
          <ContentsList
            numbered
            getKey={(item, index) => `${item.label}-${index}`}
            items={uniqueChapters.map((item) => ({
              label: item.chapter,
              onPress: () => handleChapterPress(item),
            }))}
          />
        ) : (
          <SGEmptyState title="No chapters found" subtitle="Try another subject for now." />
        )}
      </Animated.View>
    </ScreenLayoutContainer>
  );
};

export default ChapterDetails;
