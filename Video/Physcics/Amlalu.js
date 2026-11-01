import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "ఆమ్లాలు -క్షారాలు - లవణాలు -1", url: "https://youtu.be/tOC5HCdmrBc" },
  { label: "ఆమ్లాలు -క్షారాలు - లవణాలు -2", url: "https://youtu.be/li7P9IaH5ZE" },
  { label: "ఆమ్లాలు -క్షారాలు - లవణాలు -3", url: "https://youtu.be/CKwHmTIXnpM" },
  { label: "ఆమ్లాలు -క్షారాలు - లవణాలు -4", url: "https://youtu.be/JoMgwGmTIN8" },
  { label: "ఆమ్లాలు -క్షారాలు - లవణాలు -5", url: "https://youtu.be/Mo1h1q6lGo8" },
];

const Amlalu = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Physics (TM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Amlalu;
