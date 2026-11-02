import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// A dropdown that opens as a bottom sheet: long lists stay reachable by thumb,
// and labels in Indian languages can wrap instead of being cut off.
// options: [{ value, label, section?, disabled?, hint? }]
export default function SGSelect({ label, value, options, onChange, placeholder, sheetTitle, compact = false, icon }) {
  const [open, setOpen] = useState(false);
  const insets = useSafeAreaInsets();
  const selected = options.find((item) => item.value === value);
  const title = sheetTitle || label;

  const choose = (item) => {
    setOpen(false);
    if (item.value !== value) onChange(item.value);
  };

  return (
    <>
      {compact ? (
        <Pressable
          onPress={() => setOpen(true)}
          accessibilityRole="button"
          accessibilityLabel={`${title}: ${selected?.label || ''}`}
          className="min-h-[44px] flex-row items-center rounded-[14px] bg-[#14342A]/25 px-3 active:opacity-70"
        >
          {icon ? <Ionicons name={icon} size={16} color="#F4EFE2" style={{ marginRight: 6 }} /> : null}
          <Text className="text-[14px] leading-[20px] font-sg-bold text-[#F4EFE2]">{selected?.label}</Text>
          <Ionicons name="chevron-down" size={15} color="#F4EFE2" style={{ marginLeft: 5 }} />
        </Pressable>
      ) : (
        <View className="mb-4">
          {label ? <Text className="mb-1.5 text-[14px] leading-[20px] font-sg-bold text-sg-text">{label}</Text> : null}
          <Pressable
            onPress={() => setOpen(true)}
            accessibilityRole="button"
            accessibilityLabel={`${title}: ${selected?.label || placeholder || ''}`}
            className={`min-h-[56px] flex-row items-center rounded-[16px] border px-4 py-2.5 active:bg-sg-bg2 ${
              selected ? 'border-sg-board bg-sg-surface' : 'border-sg-border bg-sg-surface'
            }`}
          >
            <Text
              className={`flex-1 pr-2 text-[16px] leading-[23px] ${
                selected ? 'font-sg-bold text-sg-text' : 'font-sg-medium text-sg-muted'
              }`}
            >
              {selected?.label || placeholder}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#17694F" />
          </Pressable>
        </View>
      )}

      <Modal visible={open} transparent animationType="slide" statusBarTranslucent onRequestClose={() => setOpen(false)}>
        <View className="flex-1 justify-end">
          <Pressable
            onPress={() => setOpen(false)}
            accessibilityLabel="Close"
            style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(15,40,31,0.55)' }}
          />
          <View
            className="max-h-[78%] rounded-t-[28px] bg-[#FFFCF5] px-4 pt-3"
            style={{ paddingBottom: Math.max(insets.bottom, 12) + 8 }}
          >
            <View className="mb-3 h-1 w-10 self-center rounded-full bg-sg-border" />
            <Text className="mb-2 px-1 text-[20px] leading-[28px] font-sg-display text-sg-text">{title}</Text>
            <ScrollView showsVerticalScrollIndicator={false} accessibilityRole="radiogroup">
              {options.map((item, index) => {
                const active = item.value === value;
                const newSection = item.section && item.section !== options[index - 1]?.section;
                return (
                  <View key={String(item.value)}>
                    {newSection ? (
                      <Text className="mb-1 mt-3 px-1 text-[13px] leading-[19px] font-sg-bold text-sg-muted">{item.section}</Text>
                    ) : null}
                    <Pressable
                      disabled={item.disabled}
                      onPress={() => choose(item)}
                      accessibilityRole="radio"
                      accessibilityState={{ checked: active, disabled: Boolean(item.disabled) }}
                      className={`mb-1 min-h-[52px] flex-row items-center rounded-[14px] px-3.5 py-2 ${
                        active ? 'bg-sg-board' : 'active:bg-sg-bg2'
                      }`}
                    >
                      <Text
                        className={`flex-1 pr-2 text-[16px] leading-[23px] font-sg-semibold ${
                          active ? 'text-[#F2B632]' : item.disabled ? 'text-sg-muted' : 'text-sg-text'
                        }`}
                      >
                        {item.label}
                      </Text>
                      {item.hint ? (
                        <Text className={`text-[14px] font-sg-bold ${active ? 'mr-2 text-[#F4EFE2]' : 'text-sg-muted'}`}>{item.hint}</Text>
                      ) : null}
                      {active ? <Ionicons name="checkmark" size={20} color="#F2B632" /> : null}
                    </Pressable>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}
