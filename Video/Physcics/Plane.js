import React from 'react';
import ChapterActionListScreen from '../../src/features/chapters/ChapterActionListScreen';

const items = [
  { label: "సమతలాల వద్ద కాంతి వక్రీభవనం", url: "https://youtu.be/VxVvCg_l9FI" },
  { label: "Refractive index (TM)", url: "https://youtu.be/u_CKOlgpKJY" },
  { label: "Refraction through a semicircular glass slab(TM)", url: "https://youtu.be/dI6GKhzyyAo" },
  { label: "Total international refraction", url: "https://youtu.be/508w7480iyk" },
  { label: "Applications of Total international refraction", url: "https://youtu.be/v5U4gqe70mA" },
  { label: "పార్శ్వ విస్థాపనం - నిలువు విస్థాపనం", url: "https://youtu.be/NZgCikFV6EM" },
  { label: "సంపూర్ణాంతర పరావర్తనం", url: "https://youtu.be/-8837612hcw" },
  { label: "కాంతి వక్రీభవనం సమస్యలు", url: "https://youtu.be/o--6HX7A2kY" },
  { label: "1 కాంతి వక్రీభవనం పై బిట్స", url: " https://youtu.be/Z2PMAvL9XlE" },
  { label: "2.కాంతి వక్రీభవనం పై బిట్స", url: "https://youtu.be/GlCF6CQLpxk" },
];

const Plane = ({ navigation }) => (
  <ChapterActionListScreen navigation={navigation} title={"Physics (TM)"} subtitle="Tap a lesson to watch it on YouTube" items={items} />
);

export default Plane;
