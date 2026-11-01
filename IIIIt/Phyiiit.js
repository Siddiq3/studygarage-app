import React from 'react';
import ChapterActionListScreen from '../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "Physics Material", screen: "phyics material" },
  { label: "Heat", url: "https://youtu.be/9ZAdnxX2gbI" },
  { label: "ACIDS BASES SALTS, BITS PART-1", url: "https://youtu.be/vQisIHGzySQ" },
  { label: "ACIDS BASES SALTS, BITS PART-2", url: "https://youtu.be/et3vLnGAuZE" },
  { label: "ACIDS BASES SALTS, BITS PART-3", url: "https://youtu.be/Uy71wMzo-0c" },
  { label: "Refraction of Light at Plane Surfaces (1)", url: "https://youtu.be/mX4XppZdNMY" },
  { label: "Refraction of Light at Plane Surfaces (2)", url: "https://youtu.be/8ZODMxgs7TM" },
  { label: "Refraction of Light at Curved Surface (1)", url: "https://youtu.be/yQ-TEi1Wk-A" },
  { label: "Refraction of Light at Curved Surface (2)", url: "https://youtu.be/8zg_rElPGHE" },
  { label: "Principles of Metallurgy MCQ Part-1", url: "https://youtu.be/NZcHjedBh4Y" },
  { label: "Principles of Metallurgy MCQ Part-2", url: "https://youtu.be/m9NDnNdXqP4" },
  { label: "Classification of Elements Part-1", url: "https://youtu.be/LmdhvaaltsE" },
  { label: "Classification of Elements Part-2", url: "https://youtu.be/wSL2DEZwNuE" },
  { label: "Chemical Bonding -1", url: "https://youtu.be/vfG9faM2ISE" },
  { label: "Chemical Bonding -2", url: "https://youtu.be/xG6HetpgKIE" },
  { label: "Chemical Bonding -3", url: "https://youtu.be/d4rCkHsbCCU" },
  { label: "Carbon and its Compounds", url: "https://youtu.be/wKz-DKk7h8E" },
  { label: "Structure of Atom", url: "https://youtu.be/AUmCxlTIxuk" },
  { label: "Electric Current", url: "https://youtu.be/xSL1p5AfWCM" },
  { label: "Human Eye and Colourful World - Part 1", url: "https://youtu.be/nYncl6USNGY" },
  { label: "Human Eye and Colourful World - Part 2", url: "https://youtu.be/Zo1WHRrEyos" },
];

const Phyiiit = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Physics Video Explanation for IIIT/Polycet/NTSE"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Phyiiit;
