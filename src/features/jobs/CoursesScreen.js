import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ScreenHeader from "../../design-system/components/ScreenHeader";
import SGSectionHeader from "../../design-system/components/SGSectionHeader";
import useCareerLanguage from "../career/careerI18n";
import { CareerPage, GoodToKnow } from "../career/careerUi";
import { checkJob, STATUS } from "./eligibility";
import { COURSE_GROUPS, findCourse, JOB_CATEGORIES, jobsForState } from "./jobsCatalog";
import { JOB_EXAMS } from "./jobsData";
import JobRow from "./JobRow";
import SGSelect from "../../design-system/components/SGSelect";

export const openJob = (navigation, job, stateBoard, previewProfile) =>
  job.examId
    ? navigation.navigate("JobDetailScreen", { examId: job.examId, stateBoard, previewProfile })
    : navigation.navigate("JobInfoScreen", { jobId: job.id, stateBoard, previewProfile });

function CourseDetail({ course, navigation, stateBoard, t }) {
  // Shows what the finished course opens, whatever the student is studying today.
  const preview = { ...course.profile, stage: "completed" };
  const jobs = jobsForState(stateBoard).map((job) => ({ job, result: checkJob(job, preview, JOB_EXAMS.find((exam) => exam.id === job.examId)) })).filter(
    ({ result }) => result.status !== STATUS.NOT_ELIGIBLE
  );

  return (
    <CareerPage>
      <ScreenHeader tone="teal" icon="school" eyebrow={t(course.duration)} title={t(course.name)} />
      <GoodToKnow title={t("How to join")} text={t(course.join)} />
      <SGSectionHeader title={t("Jobs this course opens")} subtitle={t("After you finish the course")} className="mb-3 mt-3" />
      {JOB_CATEGORIES.map((category) => {
        const inCategory = jobs.filter(({ job }) => job.category === category.id);
        if (!inCategory.length) return null;
        return (
          <View key={category.id}>
            <Text className="mb-2 mt-2 text-[15px] leading-[22px] font-sg-bold text-sg-muted">{t(category.label)}</Text>
            {inCategory.map(({ job, result }) => (
              <JobRow key={job.id} job={job} result={result} t={t} onPress={() => openJob(navigation, job, stateBoard, preview)} />
            ))}
          </View>
        );
      })}
    </CareerPage>
  );
}

export default function CoursesScreen({ navigation, route }) {
  const { stateBoard, courseId } = route?.params || {};
  const { t } = useCareerLanguage(stateBoard);
  const [groupTitle, setGroupTitle] = useState(COURSE_GROUPS[0].title);
  const course = courseId ? findCourse(courseId) : null;

  if (course) return <CourseDetail course={course} navigation={navigation} stateBoard={stateBoard} t={t} />;

  const group = COURSE_GROUPS.find((item) => item.title === groupTitle);

  return (
    <CareerPage>
      <ScreenHeader tone="teal" icon="school" title={t("All courses")} subtitle={t("Tap a course to see how to join and the jobs it opens")} />
      <SGSelect
        sheetTitle={t("All courses")}
        value={groupTitle}
        onChange={setGroupTitle}
        options={COURSE_GROUPS.map((item) => ({ value: item.title, label: t(item.title), hint: String(item.courses.length) }))}
      />
      <View className="overflow-hidden rounded-[18px] bg-sg-surface">
        {group.courses.map((item, index) => (
          <Pressable
            key={item.id}
            onPress={() => navigation.push("CoursesScreen", { stateBoard, courseId: item.id })}
            accessibilityRole="button"
            className={`min-h-[64px] flex-row items-center px-4 py-2.5 active:bg-sg-bg2 ${index ? "border-t border-sg-border" : ""}`}
          >
            <View className="flex-1 pr-2">
              <Text className="text-[16px] leading-[23px] font-sg-bold text-sg-text">{t(item.name)}</Text>
              <Text className="text-[13px] leading-[19px] font-sg-medium text-sg-muted">{t(item.duration)}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#5F6A63" />
          </Pressable>
        ))}
      </View>
    </CareerPage>
  );
}
