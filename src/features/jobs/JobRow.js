import React from "react";
import { Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { JOB_CATEGORIES } from "./jobsCatalog";
import { JOB_STATS } from "./jobStats";
import { STATUS_UI } from "./StatusPill";

// The status is the answer students came for, so it reads as a line of colour, not another box.
export default function JobRow({ job, result, onPress, t }) {
  const category = JOB_CATEGORIES.find((item) => item.id === job.category);
  const status = STATUS_UI[result.status];
  const stats = JOB_STATS[job.id];
  const facts = [stats?.posts ? t("{count} posts", { count: stats.posts }) : null, stats?.frequency ? t(stats.frequency) : null].filter(Boolean);
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="mb-2 flex-row items-center rounded-[18px] bg-sg-surface p-3.5 active:bg-sg-bg2"
    >
      <View className="h-11 w-11 items-center justify-center rounded-[13px]" style={{ backgroundColor: category.color }}>
        <Ionicons name={category.icon} size={21} color="#F4EFE2" />
      </View>
      <View className="mx-3 flex-1">
        <Text className="text-[16px] leading-[23px] font-sg-display text-sg-text">{t(job.name)}</Text>
        <Text className="text-[13px] leading-[19px] font-sg-medium text-sg-muted">{t(job.full)}</Text>
        {facts.length ? <Text className="text-[13px] leading-[19px] font-sg-semibold text-sg-text">{facts.join(" · ")}</Text> : null}
        <View className="mt-1 flex-row items-start">
          <Ionicons name={status.icon} size={14} color={status.color} style={{ marginTop: 3 }} />
          <Text className="ml-1 flex-1 text-[13px] leading-[20px] font-sg-bold" style={{ color: status.color }}>
            {t(status.label)}
          </Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#5F6A63" />
    </Pressable>
  );
}
