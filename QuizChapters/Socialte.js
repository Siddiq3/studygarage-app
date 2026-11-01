import React from 'react';
import StaticRouteListScreen from '../src/features/lists/StaticRouteListScreen';

const items = [
  { label: "భారతదేశం: భౌగోళిక స్వరూపాలు", screen: "St1" },
  { label: "అభివృద్ధి భావనలు", screen: "St2" },
  { label: "ఉత్పత్తి, ఉపాధి", screen: "St3" },
  { label: "భారతదేశ శీతోష్ణస్థితి", screen: "St4" },
  { label: "భారతదేశ నదులు, నీటి వనరులు", screen: "St5" },
  { label: "ప్రజలు", screen: "St6" },
  { label: "ప్రజలు – నివాస ప్రాంతాలు", screen: "St7" },
  { label: "ప్రజలు – వలసలు", screen: "St8" },
  { label: "రాంపురం : గ్రామ ఆర్థిక వ్యవస్థ", screen: "St9" },
  { label: "ప్రపంచీకరణ", screen: "St10" },
  { label: "ఆహార భద్రత", screen: "St11" },
  { label: "సమానత – సుస్థిర అభివృద్ధి", screen: "St12" },
  { label: "ప్రపంచ యుద్ధాల మధ్య ప్రపంచం 1900-1950 : భాగం-I, II", screen: "St13" },
  { label: "భారతదేశం: భౌగోళిక స్వరూపాలు", screen: "St14" },
  { label: "వలస పాలిత ప్రాంతాలలో జాతి విముక్తి ఉద్యమాలు", screen: "St15" },
  { label: "భారతదేశ జాతీయోద్యమం-దేశ విభజన, స్వాతంత్య్రం: 1939-1947", screen: "St16" },
  { label: "స్వతంత్ర భారత రాజ్యాంగ నిర్మాణం", screen: "St17" },
  { label: "స్వతంత్ర భారతదేశం (1947-1977)", screen: "St18" },
  { label: "రాజకీయ ధోరణుల ఆవిర్భావం : 1977-2000", screen: "St19" },
  { label: "ప్రపంచ యుద్దాల తరువాత ప్రపంచం, భారతదేశం", screen: "St20" },
  { label: "సమకాలీన సామాజిక ఉద్యమాలు", screen: "St21" },
  { label: "పౌరులు, ప్రభుత్వాలు", screen: "St22" },
];

const Socialte1 = ({ navigation }) => (
  <StaticRouteListScreen navigation={navigation} title={"Social (TM)"} subtitle="Choose a chapter to start the quiz" items={items} />
);

export default Socialte1;
