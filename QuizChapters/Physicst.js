import React from 'react';
import StaticRouteListScreen from '../src/features/lists/StaticRouteListScreen';

const items = [
  { label: "ఉష్ణం", screen: "Pt1" },
  { label: "ఆమ్లాలు-క్షారాలు-లవణాలు", screen: "Pt2" },
  { label: "సమతల ఉపరితలాల వద్ద కాంతి వక్రీభవనం", screen: "Pt3" },
  { label: "వక్రతలాల వద్ద కాంతి వక్రీభవనం", screen: "Pt4" },
  { label: "మానవుని కన్ను-రంగుల ప్రపంచం", screen: "Pt5" },
  { label: "పరమాణు నిర్మాణం", screen: "Pt6" },
  { label: "మూలకాల వర్గీకరణ – ఆవర్తన పట్టిక", screen: "Pt7" },
  { label: "రసాయన బంధం", screen: "Pt8" },
  { label: "విద్యుత్ ప్రవాహం", screen: "Pt9" },
  { label: "విద్యుదయస్కాంతత్వం", screen: "Pt10" },
  { label: "లోహ సంగ్రహణ శాస్త్రం", screen: "Pt11" },
  { label: "కార్బన్– దాని సమ్మేళనాలు", screen: "Pt12" },
];

const Physicst1 = ({ navigation }) => (
  <StaticRouteListScreen navigation={navigation} title={"Physics (TM)"} subtitle="Choose a chapter to start the quiz" items={items} />
);

export default Physicst1;
