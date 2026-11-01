import React from 'react';
import StaticRouteListScreen from '../src/features/lists/StaticRouteListScreen';

const items = [
  { label: "Heat", screen: "Pe1" },
  { label: "Acids, Bases and Salts", screen: "Pe2" },
  { label: "Refraction of Light at Plane Surfaces", screen: "Pe3" },
  { label: "Refraction of Light at Curved Surfaces", screen: "Pe4" },
  { label: "Human Eye and Colourful World", screen: "Pe5" },
  { label: "Structure of Atom", screen: "Pe6" },
  { label: "Classification of Elements- The Periodic Table", screen: "Pe7" },
  { label: "Chemical Bonding", screen: "Pe8" },
  { label: "Electric Current", screen: "Pe9" },
  { label: "Electromagnetism", screen: "Pe10" },
  { label: "Principles of Metallurgy", screen: "Pe11" },
  { label: "Carbon and its Compounds", screen: "Pe12" },
];

const Phyequiz = ({ navigation }) => (
  <StaticRouteListScreen navigation={navigation} title={"Physics (EM)"} subtitle="Choose a chapter to start the quiz" items={items} />
);

export default Phyequiz;
