import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "REFRACTION OF LIGHT AT PLANE SURFACES PART-1", url: "https://youtu.be/TIkg7wzxc04" },
  { label: "REFRACTION OF LIGHT AT PLANE SURFACES PART-2", url: "https://youtu.be/HqfdWe0FQeE" },
  { label: "REFRACTION OF LIGHT AT PLANE SURFACES PART-3", url: "https://youtu.be/Y24HXSUlwtQ" },
  { label: "REFRACTION OF LIGHT AT PLANE SURFACES PART-4", url: "https://youtu.be/mJWKw8Rg0CM" },
  { label: "REFRACTION OF LIGHT AT PLANE SURFACES PART-5", url: "https://youtu.be/kVV8IMaYE5o" },
  { label: "REFRACTION OF LIGHT AT PLANE SURFACES PART-6", url: "https://youtu.be/G8q8rPyf0vA" },
  { label: "REFRACTION OF LIGHT AT PLANE SURFACES PART-7", url: "https://youtu.be/ZnkUZtWKLpg" },
];

const Planee = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Physics (EM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Planee;
