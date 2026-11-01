import React from 'react';
import { Text, View } from 'react-native';
import MrecAdComponent from '../MrecAdComponent';
import ScreenLayoutContainer from '../src/design-system/components/ScreenLayoutContainer';
import ScreenHeader from '../src/design-system/components/ScreenHeader';

const sections = [
  {
    "title": "AP RGUKT CET Mathematics Syllabus",
    "topics": [
      "Real Numbers",
      "Sets",
      "Polynomials",
      "Pair of Linear Equations in Two Variables",
      "Quadratic Equations",
      "Progressions",
      "Coordinate Geometry",
      "Similar Triangles",
      "Tangents and Secants to a Circle",
      "Mensuration",
      "Trigonometry",
      "Applications of Trigonometry",
      "Probability",
      "Statistics"
    ]
  },
  {
    "title": "AP RGUKT CET Physical Sciences Syllabus",
    "topics": [
      "Heat",
      "Acids, Bases and Salts",
      "Refraction of Light at Plane Surfaces",
      "Refraction of Light at Curved Surfaces",
      "Human Eye and Colourful world",
      "Structure of Atom",
      "Classification of Elements- The Periodic Table",
      "Chemical Bonding",
      "Electric Current",
      "Electromagnetism",
      "Principles of Metallurgy",
      "Carbon and its Compounds"
    ]
  },
  {
    "title": "AP RGUKT CET Biological Sciences Syllabus",
    "topics": [
      "Nutrition Food Supplying system",
      "Respiration The energy releasing system",
      "Transportation The circulatory system",
      "Excretion The wastage disposing system",
      "Coordination The linking system",
      "Reproduction The generating system, Coordination in life processes",
      "Heredity From parent to progeny",
      "Our environment Our concern, Natural resources"
    ]
  },
  {
    "title": "AP RGUKT CET Exam Pattern 2022",
    "topics": [
      "Subject                                 \t           Allotted marks",
      "Maths\t                                                    50",
      "Physical Science (Physics + Chemistry)                      25",
      "Biological science (Botany + Zoology)\t                     25",
      "Total\t                                                     100"
    ]
  }
];

const Syllabusi = () => (
  <ScreenLayoutContainer variant="home" contentClassName="px-4" scroll>
    <ScreenHeader eyebrow="AP RGUKT CET" title="Syllabus" />
    {sections.map((section) => (
      <View key={section.title} className="mb-4 rounded-[18px] border border-sg-border bg-sg-surface p-4">
        <Text className="mb-2 text-[18px] leading-[24px] font-sg-display text-sg-text">{section.title}</Text>
        {section.topics.map((topic) => (
          <Text key={topic} className="py-1 text-[15px] leading-[21px] font-sg-medium text-sg-muted">{topic}</Text>
        ))}
      </View>
    ))}
    <MrecAdComponent />
  </ScreenLayoutContainer>
);

export default Syllabusi;
