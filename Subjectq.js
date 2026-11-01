import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Text, View } from "react-native";
import axios from "axios";
import Animated from "react-native-reanimated";
import ScreenLayoutContainer from "./src/design-system/components/ScreenLayoutContainer";
import SGCard from "./src/design-system/components/SGCard";
import AnimatedActionCard from "./src/design-system/components/AnimatedActionCard";
import ShimmerSkeleton from "./src/components/ui/ShimmerSkeleton";

const Subjectq = ({ route, navigation }) => {
  const { class1 } = route.params;
  const [subjectDetails, setSubjectDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = `https://api.way2employee.com/quiz/${class1}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setSubjectDetails(response?.data?.results || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  const uniqueSubjects = useMemo(
    () => Array.from(new Set(subjectDetails.map((item) => item.subject))),
    [subjectDetails]
  );

  const handleSubjectPress = (selectedSubject) => {
    navigation.navigate("ChapterDetails", { class1, subject: selectedSubject });
  };

  return (
    <ScreenLayoutContainer variant="home" contentClassName="px-4" scroll>
      <Animated.View>
        <SGCard className="mb-4">
          <Text className="text-[30px] font-sg-display leading-[34px] text-sg-text">
            {class1} Quiz Subjects
          </Text>
          <Text className="mt-1 text-[14px] font-sg-medium text-sg-muted">
            Choose a subject to view chapter quizzes
          </Text>

          {loading ? (
            <View className="py-5">
              {[0, 1, 2, 3].map((idx) => (
                <View key={`subject-loader-${idx}`} className="mb-3">
                  <ShimmerSkeleton height={70} borderRadius={19} />
                </View>
              ))}
            </View>
          ) : (
            <FlatList
              data={uniqueSubjects}
              scrollEnabled={false}
              keyExtractor={(item, index) => `${item}-${index}`}
              contentContainerStyle={{ paddingTop: 16 }}
              renderItem={({ item, index }) => (
                <Animated.View
                  className="mb-3"
                >
                  <AnimatedActionCard onPress={() => handleSubjectPress(item)}>
                    <View className="rounded-[19px] border border-sg-border bg-sg-surface/88 px-4 py-4">
                      <View className="flex-row items-center justify-between">
                        <Text className="flex-1 text-[17px] font-sg-bold text-sg-text">
                          {item}
                        </Text>
                        <Text className="ml-3 text-[12px] font-sg-semibold text-sg-muted">
                          Open
                        </Text>
                      </View>
                    </View>
                  </AnimatedActionCard>
                </Animated.View>
              )}
              ListEmptyComponent={
                <View className="rounded-[20px] border border-sg-border bg-sg-surface/86 px-4 py-5">
                  <Text className="text-center text-[15px] font-sg-semibold text-sg-muted">
                    No subjects found
                  </Text>
                </View>
              }
            />
          )}
        </SGCard>
      </Animated.View>
    </ScreenLayoutContainer>
  );
};

export default Subjectq;
