import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import WeekQues from './Weekquiz';
import WeekResult from './Results/WeekRes';
import Weekans from './Answers/Weekans';
import Todayans from './Answers/TodayAns';
import TodayQues from './TodayQues';

import Quiz6 from "./Dailyquiz/Quiz6";
import Quiz7 from "./Dailyquiz/Quiz7";
import Quiz8 from "./Dailyquiz/Quiz8";
import Quiz9 from "./Dailyquiz/Quiz9";
import Quiz12 from "./Dailyquiz/Quiz12";
import Quiz11 from "./Dailyquiz/Quiz11";


import qans11 from "./Answers/qans11";
import qans12 from "./Answers/qans12";
import qans6 from "./Answers/qans6";
import qans7 from "./Answers/qans7";
import qans8 from "./Answers/qans8";


import Qres11 from "./Results/11qres";
import Qres12 from "./Results/12qres";
import Qres9 from "./Results/9qres";
import Qres8 from "./Results/8qres";
import Qres7 from "./Results/7qres";
import Qres6 from "./Results/6qres";

import Menu from './Menu';
import DailyResult from './Results/DailyRes';

import Sa1 from './sa1';
import Fa1 from './fa1';
import Fa2 from './fa2';
import Fa4 from "./fa4";

import Telfa4 from "./FA4/Telfa3";
import Hinfa4 from "./FA4/Hinfa3";
import Engfa4 from "./FA4/Engfa3";
import Mattfa4 from "./FA4/Mattfa3";
import Matefa4 from "./FA4/Matefa3";
import Sciefa4 from "./FA4/Sciefa3";
import Scitfa4 from "./FA4/Sictfa3";
import Soctfa4 from "./FA4/Soctfa3";
import Socefa4 from "./FA4/Socefa3";
import Sylfa4 from "./FA4/Fa3syl";

import Telfa1 from './FA1/Telfa1';
import Telfa2 from './FA2/Telfa2';
import Telsa1 from './SA1/Telsa1';
import Telfa3 from "./FA3/Telfa3";
import Hinfa3 from "./FA3/Hinfa3";
import Hinfa1 from './FA1/Hinfa1';
import Hinfa2 from './FA2/Hinfa2';
import Hinsa1 from './SA1/Hinsa1';

import Engfa1 from './FA1/Engfa1';
import Engfa2 from './FA2/Engfa2';
import Engsa1 from './SA1/Engsa1';
import Engfa3 from "./FA3/Engfa3";

import Mattfa1 from './FA1/Mattfa1';
import Matefa1 from './FA1/Matefa1';
import Matefa2 from './FA2/Matefa2';
import Mattfa2 from './FA2/Mattfa2';
import Mattsa1 from './SA1/Mattsa1';
import Matesa1 from './SA1/Matesa1';
import Matefa3 from "./FA3/Matefa3";
import Mattfa3 from "./FA3/Mattfa3";

import Sciefa1 from './FA1/Sciefa1';
import Sciefa2 from './FA2/Sciefa2';
import Scitfa1 from './FA1/Scitfa1';
import Scitfa2 from './FA2/Sictfa2';
import Scitsa1 from './SA1/Scitsa1';
import Sciesa1 from './SA1/Sciesa1';
import Sciefa3 from "./FA3/Sciefa3";
import Scitfa3 from "./FA3/Sictfa3";

import Socefa1 from './FA1/Socefa1';
import Socefa2 from './FA2/Socefa2';
import Soctfa1 from './FA1/Soctfa1';
import Soctfa2 from './FA2/Soctfa2';
import Soctsa1 from './SA1/Soctsa1';
import Socesa1 from './SA1/Socesa1';
import Socefa3 from "./FA3/Socefa3";

import Syl from "./SA1/Syl";
import Sylfa3 from "./FA3/Fa3syl";

import Importe from "./Importe";







import Eimp from "./IMPQ/Engimp";
import Himp from "./IMPQ/Hinimp";

import Matei from "./IMPQ/Matheimp";
import Matti from "./IMPQ/Mathtimp";
import Phyei from "./IMPQ/Phyeimp";
import Phyti from "./IMPQ/Phytimp";

import Nsei from "./IMPQ/Nseimp";
import Nsti from "./IMPQ/Nstimp";

import Socei from "./IMPQ/Soceimp";

import Socti from "./IMPQ/Soctimp";

import Iiit from "./Iiit";
import Phyiiit from "./IIIIt/Phyiiit";
import Mathsiiit from "./IIIIt/Mathsiiit";
import Syllabusi from "./IIIIt/Sylabus";
import Materialmaths from "./IIIIt/Materialmaths";
import Materialbio from "./IIIIt/Materialbio";
import Materialphy from "./IIIIt/Materialphy";


import Textbook from './Textbook';
import Telt from './Textbooks/Telugutex';
import Engt from './Textbooks/Engt';
import Hindit from './Textbooks/Hindit';
import Mathtt from './Textbooks/Mathtt';
import Mathset from './Textbooks/Mathset';
import Nstt from './Textbooks/Nstt';
import Nset from './Textbooks/Nset';
import Phyet from './Textbooks/Phyet';
import Phytt from './Textbooks/Phytt';
import Societ from './Textbooks/Societ';
import Socitt from './Textbooks/Socitt';

import Home from "./Home";



import Telp from "./Papers/Telp";
import Hinp from "./Papers/Hinp";
import Engp from "./Papers/Engp";
import Mathep from "./Papers/Mathep";
import Mathtp from "./Papers/Mathtp";
import Phyep from "./Papers/Phyep";
import Phytp from "./Papers/Phytp";
import Soctp from "./Papers/Soctp";
import Socep from "./Papers/Socep";
import Nsep from "./Papers/Nsep";
import Nstp from "./Papers/Nstp";

import Tpop from './pqp/Tpqp';
import Epop from './pqp/Epqp';
import Mepqp from './pqp/Mepqp';
import Mtpop from './pqp/Mtpop';
import Ntpop from './pqp/Ntpqp';
import Nepop from './pqp/Nepqp';
import Sepop from './pqp/Sepqp';
import Stpop from './pqp/Stpqp';
import Pepop from './pqp/Pepqp';
import Ptpop from './pqp/Ptpqp';
import Hpqp from './pqp/Hpqp';

import Telp1 from './I2023/Telp';
import Engp1 from './I2023/Engp';
import Hinp1 from './I2023/Hinp';
import Mathtp1 from './I2023/Mathtp';
import Mathep1 from './I2023/Mathep';
import Nsep1 from './I2023/Nsep';
import Nstp1 from './I2023/Nstp';
import Socep1 from './I2023/Socep';
import Soctp1 from './I2023/Soctp';

import Telp2 from './I2022/Telp';
import Engp2 from './I2022/Engp';
import Hinp2 from './I2022/Hinp';
import Mathep2 from './I2022/Mathep';
import Mathtp2 from './I2022/Mathtp';
import Phyep2 from './I2022/Phyep';
import Phytp2 from './I2022/Phytp';
import Nstp2 from './I2022/Nstp';
import Nsep2 from './I2022/Nsep';
import Socep2 from './I2022/Socep';
import Soctp2 from './I2022/Soctp';


import Telp3 from './Blueprin/Telp';
import Hinp3 from './Blueprin/Hinp';
import Engp3 from './Blueprin/Engp';
import Mathep3 from './Blueprin/Mathep';

import Nsep3 from './Blueprin/Nsep';

import Socep3 from './Blueprin/Socep';


import Telp4 from './I2019/Telp';
import Hinp4 from './I2019/Hinp';
import Mathep4 from './I2019/Mathep';

import Phyep4 from './I2019/Phyep';

import Nsep4 from './I2019/Nsep';

import Socep4 from './I2019/Socep';

import Engp4 from './I2019/Engp';


import Engp5 from './II2019/Engp';
import Telp5 from './II2019/Telp';
import Mathep5 from './II2019/Mathep';
import Socep5 from './II2019/Socep';


import Engp6 from './I2018/Engp';
import Engp7 from './II2018/Engp';
import Engp10 from './II2017/Engp';
import Engp11 from './I2016/Engp';
import Engp12 from './II2016/Engp';
import Engp13 from './I2015/Engp';
import Engp14 from './II2015/Engp';
import Engp8 from './I2017/Engp';


import Telp6 from './I2018/Telp';
import Telp7 from './II2018/Telp';
import Telp8 from './I2017/Telp';
import Telp10 from './II2017/Telp';
import Telp11 from './I2016/Telp';
import Telp12 from './II2016/Telp';
import Telp13 from './I2015/Telp';
import Telp14 from './II2015/Telp';



import Hinp6 from './I2018/Hinp';
import Hinp8 from './I2017/Hinp';
import Hinp11 from './I2016/Hinp';
import Hinp13 from './I2015/Hinp';


import Mathep6 from './I2018/Mathep';
import Mathep7 from './II2018/Mathep';
import Mathep8 from './I2017/Mathep';
import Mathep10 from './II2017/Mathep';
import Mathep11 from './I2016/Mathep';
import Mathep12 from './II2016/Mathep';
import Mathep13 from './I2015/Mathep';
import Mathep14 from './II2015/Mathep';


import Socep6 from './I2018/Socep';
import Socep7 from './II2018/Socep';
import Socep8 from './I2017/Socep';
import Socep10 from './II2017/Socep';
import Socep11 from './I2016/Socep';
import Socep12 from './II2016/Socep';
import Socep13 from './I2015/Socep';
import Socep14 from './II2015/Socep';


import Nsep6 from './I2018/Nsep';
import Nsep8 from './I2017/Nsep';
import Nsep11 from './I2016/Nsep';
import Nsep13 from './I2015/Nsep';


import Phyp6 from './I2018/Phyep';
import Phyp8 from './I2017/Phyep';
import Phyp11 from './I2016/Phyep';
import Phyp13 from './I2015/Phyep';


import Videos from "./Videos";

import Physicst from "./Chapters/Physicst";
import Physicse from "./Chapters/Physicse";
import Mathsee from "./Chapters/Mathse";
import Mathste from "./Chapters/Mathst";
import Nsee from "./Chapters/Nsee";
import Nste from "./Chapters/Nste";
import Telv from "./Chapters/Telv";
import Englishv from "./Chapters/Englishv";
import Hindiv from "./Chapters/Hindiv";
import Socialte from "./Chapters/Socialte";
import Socialee from "./Chapters/Socialee";
import Coordination from "./Video/Boie/Coordination";
import Envi from "./Video/Boie/Envi";
import Anu from "./Video/Boit/Anu";
import Jivakriya from "./Video/Boit/Jivakriya";
import Mana from "./Video/Boit/Mana";
import Prasarana from "./Video/Boit/Prasarana";
import Sahaja from "./Video/Boit/Sahaja";
import Coord from "./Video/Maths/Coord";
import Poly from "./Video/Maths/Poly";
import Prob from "./Video/Maths/Prob";
import Real from "./Video/Maths/Real";
import Sets from "./Video/Maths/Sets";
import Similar from "./Video/Maths/Similar";
import Stats from "./Video/Maths/Stats";
import Tangent from "./Video/Maths/Tangent";
import Trigy from "./Video/Maths/Trigy";
import Atom from "./Video/Phye/Atom";
import Chemical from "./Video/Phye/Chemical";
import Curent from "./Video/Phye/Curent";
import Eye from "./Video/Phye/Eye";
import Heet from "./Video/Phye/Heet";
import Magn from "./Video/Phye/Magn";
import Planee from "./Video/Phye/Planee";
import Refraction from "./Video/Phye/Refraction";
import Amlalu from "./Video/Physcics/Amlalu";
import Curved from "./Video/Physcics/Curved";
import Electri from "./Video/Physcics/Electri";
import Electro from "./Video/Physcics/Electro";
import Heat from "./Video/Physcics/Heat";
import Human from "./Video/Physcics/Humaneye";
import Param from "./Video/Physcics/Paramanuvu";
import Plane from "./Video/Physcics/Plane";
import One from "./Video/Mathstm/One";
import Two from "./Video/Mathstm/Two";
import Thr from "./Video/Mathstm/Thr";
import Four from "./Video/Mathstm/Four";
import Five from "./Video/Mathstm/Five";
import Six from "./Video/Mathstm/Six";
import Sev from "./Video/Mathstm/Sev";
import Eig from "./Video/Mathstm/Eig";
import Nine from "./Video/Mathstm/Nine";
import Ten from "./Video/Mathstm/Ten";
import Leve from "./Video/Mathstm/Leve";
import Twve from "./Video/Mathstm/Twva";
import Thre from "./Video/Mathstm/Ther";
import Fourt from "./Video/Mathstm/Fourt";




import Quiz from './Quiz';


import Pt1 from './Quiz/Phytq/Pt1';
import Pt2 from './Quiz/Phytq/Pt2';
import Pt3 from './Quiz/Phytq/Pt3';
import Pt4 from './Quiz/Phytq/Pt4';
import Pt5 from './Quiz/Phytq/Pt5';
import Pt6 from './Quiz/Phytq/Pt6';
import Pt7 from './Quiz/Phytq/Pt7';
import Pt8 from './Quiz/Phytq/Pt8';
import Pt9 from './Quiz/Phytq/Pt9';
import Pt10 from './Quiz/Phytq/Pt10';
import Pt11 from './Quiz/Phytq/Pt11';
import Pt12 from './Quiz/Phytq/Pt12';


import St1 from './Quiz/Sot/St1';
import St2 from './Quiz/Sot/St2';
import St3 from './Quiz/Sot/St3';

import St5 from './Quiz/Sot/St5';
import St6 from './Quiz/Sot/St6';
import St7 from './Quiz/Sot/St7';
import St8 from './Quiz/Sot/St8';
import St9 from './Quiz/Sot/St9';
import St10 from './Quiz/Sot/St10';
import St11 from './Quiz/Sot/St11';
import St12 from './Quiz/Sot/St12';
import St13 from './Quiz/Sot/St13';
import St14 from './Quiz/Sot/St14';
import St15 from './Quiz/Sot/St15';
import St16 from './Quiz/Sot/St16';
import St17 from './Quiz/Sot/St17';
import St18 from './Quiz/Sot/St18';
import St19 from './Quiz/Sot/St19';
import St20 from './Quiz/Sot/St20';
import St21 from './Quiz/Sot/St21';
import St22 from './Quiz/Sot/St22';


import Nt1 from './Quiz/Nst/Nt1';
import Nt2 from './Quiz/Nst/Nt2';
import Nt3 from './Quiz/Nst/Nt3';
import Nt4 from './Quiz/Nst/Nt4';
import Nt5 from './Quiz/Nst/Nt5';
import Nt6 from './Quiz/Nst/Nt6';
import Nt7 from './Quiz/Nst/Nt7';

import St4 from './Quiz/Sot/St4';

import Nste1 from './QuizChapters/Nste';
import Physicst1 from './QuizChapters/Physicst';
import Socialte1 from './QuizChapters/Socialte';
import Phyequiz from './QuizChapters/Phyequiz';


import Pe1 from './Quiz/Phyeq/Pe1';
import Pe2 from './Quiz/Phyeq/Pe2';
import Pe3 from './Quiz/Phyeq/Pe3';
import Pe4 from './Quiz/Phyeq/Pe4';
import Pe5 from './Quiz/Phyeq/Pe5';
import Pe6 from './Quiz/Phyeq/Pe6';
import Pe7 from './Quiz/Phyeq/Pe7';
import Pe8 from './Quiz/Phyeq/Pe8';
import Pe9 from './Quiz/Phyeq/Pe9';
import Pe10 from './Quiz/Phyeq/Pe10';
import Pe11 from './Quiz/Phyeq/Pe11';

import About from "./About";
import Fa3 from "./fa3";

import Testpapers from "./Testpapers";
import Teli from "./IMPQ/Telimp";
import Engtp from "./Testpapers/Engtp";
import Hintp from "./Testpapers/Hinditp";
import Matetp from "./Testpapers/Mathsetp";
import Matttp from "./Testpapers/Mathttp";
import Phyetp from "./Testpapers/Phyetp";
import Phyttp from "./Testpapers/Phyttp";
import Socttp from "./Testpapers/Socittp";
import Socetp from "./Testpapers/Societp";
import Etp1 from "./TP/etp1";
import Etp2 from "./TP/etp2";
import Etp3 from "./TP/etp3";
import Etp4 from "./TP/etp4";
import Htp1 from "./TP/htp1";
import Htp2 from "./TP/htp2";
import Htp3 from "./TP/htp3";
import Htp4 from "./TP/htp4";
import Ttp1 from "./TP/ttp1";
import Ttp2 from "./TP/ttp2";
import Ttp3 from "./TP/ttp3";
import Ttp4 from "./TP/ttp4";
import Mttp1 from "./TP/mttp1";
import Mttp2 from "./TP/mttp2";
import Mttp3 from "./TP/mttp3";
import Mttp4 from "./TP/mttp4";
import Metp1 from "./TP/metp1";
import Metp2 from "./TP/mtep2";
import Metp3 from "./TP/metp3";
import Metp4 from "./TP/metp4";
import Ssetp1 from "./TP/ssetp1";
import Ssetp2 from "./TP/ssetp2";
import Ssetp3 from "./TP/ssetp3";
import Ssetp4 from "./TP/ssetp4";
import Ssttp1 from "./TP/ssttp1";
import Ssttp2 from "./TP/ssttp2";
import Ssttp3 from "./TP/ssttp3";
import Ssttp4 from "./TP/ssttp4";
import Setp1 from "./TP/setp1";
import Setp2 from "./TP/setp2";
import Setp3 from "./TP/setp3";
import Setp4 from "./TP/setp4";
import Sttp1 from "./TP/sttp1";
import Sttp2 from "./TP/sttp2";
import Sttp3 from "./TP/sttp3";
import Sttp4 from "./TP/sttp4";
import Teltp from "./Testpapers/Telugutp";

import Me1m from "./Imp/Me1m";
import Me2m from "./Imp/Me2m";
import Me4m from "./Imp/Me4m";
import Me8m from "./Imp/Me8m";
import Mebi from "./Imp/mebi";
import Mt1m from "./Imp/Mt1m";
import Mt2m from "./Imp/Mt2m";
import Mt4m from "./Imp/Mt4m";
import Mt8m from "./Imp/Mt8m";
import Mtbi from "./Imp/Mtbi";
import Telgra from "./Imp/Telgra";
import Telpo from "./Imp/Telpo";
import Telimp from "./Imp/Teluguimp";
import Telmat from "./Imp/Teluma";
import Phyt1m from "./Imp/Phyt1m";
import Phyt2m from "./Imp/Phyt2m";
import Phyt4m from "./Imp/Phyt4m";
import Phyt8m from "./Imp/Phyt8m";
import Phytbi from "./Imp/Phytbi";
import Phye1m from "./Imp/Phye1m";
import Phye2m from "./Imp/Phye2m";
import Phye4m from "./Imp/Phye4m";
import Phye8m from "./Imp/Phye8m";
import Phyebi from "./Imp/Phyebi";
import Nst1m from "./Imp/Nst1m";
import Nst2m from "./Imp/Nst2m";
import Nst4m from "./Imp/Nst4m";
import Nst8m from "./Imp/Nst8m";
import Nstbi from "./Imp/Nstbi";
import Nse1m from "./Imp/Nse1m";
import Nse2m from "./Imp/Nse2m";
import Nse4m from "./Imp/Nse4m";
import Nse8m from "./Imp/Nse8m";
import Nsebi from "./Imp/Nsebi";
import Soct1m from "./Imp/Soct1m";
import Soct2m from "./Imp/Soct2m";
import Soct4m from "./Imp/Soct4m";
import Soct8m from "./Imp/Soct8m";
import Soctbi from "./Imp/Soctbi";
import Soce1m from "./Imp/Soce1m";
import Soce2m from "./Imp/Soce2m";
import Soce4m from "./Imp/Soce4m";
import Soce8m from "./Imp/Soce8m";
import Socebi from "./Imp/Socebi";
import Mtma from "./Imp/Mtma";
import Mema from "./Imp/Memt";
import Nsema from "./Imp/Nsema";
import Nstma from "./Imp/Nstma";
import Phytma from "./Imp/Phytma";
import Phyema from "./Imp/Phyema";
import Soctma from "./Imp/Soctma";
import Socema from "./Imp/Socema";
import Soctfa3 from "./FA3/Soctfa3";
import Ssc from "./SSC";
import Telpre from "./Sscpre/Telpre";
import Engpre from "./Sscpre/Engpre";
import Hinpre from "./Sscpre/Hinpre";
import Mepre from "./Sscpre/Mepre";
import Mtpre from "./Sscpre/Mtpre";
import Nepre from "./Sscpre/Nepre";
import Ntpre from "./Sscpre/Ntpre";
import Pepre from "./Sscpre/Pepre";
import Ptpre from "./Sscpre/Ptpre";
import Sepre from "./Sscpre/Sepre";
import Stpre from "./Sscpre/Stpre";
import rivision from "./RIVISION";
import Rvtest1 from "./Rvtest1";
import Rvtest2 from "./Rvtest2";
import Rvtest4 from "./Rvtest4";
import Rvtest3 from "./Rvtest3";
import Tr1 from "./Rvtests/Tr1";
import Tr2 from "./Rvtests/Tr2";
import Tr3 from "./Rvtests/Tr3";
import Tr4 from "./Rvtests/Tr4";
import Hr1 from "./Rvtests/Hr1";
import Hr2 from "./Rvtests/Hr2";
import Hr3 from "./Rvtests/Hr3";
import Hr4 from "./Rvtests/Hr4";
import Er1 from "./Rvtests/Er1";
import Er2 from "./Rvtests/Er2";
import Er3 from "./Rvtests/Er3";
import Er4 from "./Rvtests/Er4";
import Mtr1 from "./Rvtests/Mtr1";
import Mtr2 from "./Rvtests/Mtr2";
import Mtr3 from "./Rvtests/Mtr3";
import Mtr4 from "./Rvtests/Mtr4";
import Mer1 from "./Rvtests/Mer1";
import Mer2 from "./Rvtests/Mer2";
import Mer3 from "./Rvtests/Mer3";
import Mer4 from "./Rvtests/Mer4";
import Ser1 from "./Rvtests/Ser1";
import Ser2 from "./Rvtests/Ser2";
import Ser3 from "./Rvtests/Ser3";
import Ser4 from "./Rvtests/Ser4";
import Str1 from "./Rvtests/Str1";
import Str2 from "./Rvtests/Str2";
import Str3 from "./Rvtests/Str3";
import Str4 from "./Rvtests/Str4";
import Sstr1 from "./Rvtests/Sstr1";
import Sstr2 from "./Rvtests/SStr2";
import Sstr3 from "./Rvtests/SStr3";
import Sstr4 from "./Rvtests/Sstr4";
import Sser1 from "./Rvtests/Sser1";
import Sser2 from "./Rvtests/Sser2";
import Sser3 from "./Rvtests/Sser3";
import Sser4 from "./Rvtests/Sser4";
import Prefinal from "./Prefinal";
import Tpf from "./PRE/Tpf";
import Epf from "./PRE/Epf";
import Hpf from "./PRE/Hpf";
import Mtpf from "./PRE/Mtpf";
import Mepf from "./PRE/Mepf";
import Sepf from "./PRE/Sepf";
import Stpf from "./PRE/Stpf";
import Ssepf from "./PRE/Ssepf";
import Sstpf from "./PRE/Sstpf";

import Tst from "./Slip/Tst";
import Hst from "./Slip/Hst";
import Est from "./Slip/Est";
import Mest from "./Slip/Mest";
import Mtst from "./Slip/Mtst";
import Pest from "./Slip/Pest";
import Ptst from "./Slip/Ptst";
import Sest from "./Slip/Sest";
import Stst from "./Slip/Stst";
import Nest from "./Slip/Nest";
import Ntst from "./Slip/Ntst";
import Sliptest from "./sliptest";

import ApTs from "./Ts and Ap";
import Ts from "./Ts";
import Polycet from "./Polycet";


import Tsimp from "./Tsimp";
import Tsplan from "./Tsplan";
import Tsprev from "./Tsprev";
import Tsstudy from "./Tsstudy";
import Tsmodel from "./Tsmodel";
import Tsblue from "./Tsblueprint";
import Apblue from "./Apblue";

import Etsimp from "./TS IMP/Etsimp";
import Htsimp from "./TS IMP/Htsimp";
import Ttsimp from "./TS IMP/Ttsimp";
import Mttsimp from "./TS IMP/Mttsimp";
import Metsimp from "./TS IMP/Metsimp";
import Petsimp from "./TS IMP/Petsimp";
import Pttsimp from "./TS IMP/Pttsimp";
import Sttsimp from "./TS IMP/Sttsimp";
import Setsimp from "./TS IMP/Setsimp";
import Netsimp from "./TS IMP/Netsimp";
import Nttsimp from "./TS IMP/Nttsimp";


import Ttssm from "./TS study/Ttsimp";
import Etsism from "./TS study/Etsimp";
import Htssm from "./TS study/Htsimp";
import Mttssm from "./TS study/Mttsimp";
import Metssm from "./TS study/Metsimp";
import Petssm from "./TS study/Petsimp";
import Pttssm from "./TS study/Pttsimp";
import Sttssm from "./TS study/Sttsimp";
import Setssm from "./TS study/Setsimp";
import Netssm from "./TS study/Netsimp";
import Nttssm from "./TS study/Nttsimp";




import Etsb from "./TS BLUEPRINT/Epf";
import Htsb from "./TS BLUEPRINT/Hpf";
import Ttsb from "./TS BLUEPRINT/Tpf";
import Mttsb from "./TS BLUEPRINT/Mtpf";
import Metsb from "./TS BLUEPRINT/Mepf";
import Nttsb from "./TS BLUEPRINT/Nttsb";
import Netsb from "./TS BLUEPRINT/Netsb";
import Pttsb from "./TS BLUEPRINT/Stpf";
import Petsb from "./TS BLUEPRINT/Sepf";
import Sttsb from "./TS BLUEPRINT/Sstpf";
import Setsb from "./TS BLUEPRINT/Ssepf";

import Eapb from "./AP BLUEPRINT/Epf";
import Tapb from "./AP BLUEPRINT/Tpf";
import Hapb from "./AP BLUEPRINT/Hpf";
import Mtapb from "./AP BLUEPRINT/Mtpf";
import Meapb from "./AP BLUEPRINT/Mepf";
import Ptapb from "./AP BLUEPRINT/Stpf";
import Peapb from "./AP BLUEPRINT/Sepf";
import Neapb from "./AP BLUEPRINT/Netsb";
import Ntapb from "./AP BLUEPRINT/Nttsb";
import Stapb from "./AP BLUEPRINT/Sstpf";
import Seapb from "./AP BLUEPRINT/Ssepf";

import Engtspre from "./Sscpre ts/Engpre";
import Hintspre from "./Sscpre ts/Hinpre";
import Teltspre from "./Sscpre ts/Telpre";
import Metspre from "./Sscpre ts/Mepre";
import Mttspre from "./Sscpre ts/Mtpre";
import Netspre from "./Sscpre ts/Nepre";
import Nttspre from "./Sscpre ts/Ntpre";
import Petspre from "./Sscpre ts/Pepre";
import Pttspre from "./Sscpre ts/Ptpre";
import Sttspre from "./Sscpre ts/Stpre";
import Setspre from "./Sscpre ts/Sepre";

import Etpts1 from "./TP Ts/etp1";
import Etpts2 from "./TP Ts/etp2";
import Etpts3 from "./TP Ts/etp3";
import Etpts4 from "./TP Ts/etp4";

import Htpts1 from "./TP Ts/htp1";
import Htpts2 from "./TP Ts/htp2";
import Htpts3 from "./TP Ts/htp3";
import Htpts4 from "./TP Ts/htp4";

import Ttpts1 from "./TP Ts/ttp1";
import Ttpts2 from "./TP Ts/ttp2";
import Ttpts3 from "./TP Ts/ttp3";
import Ttpts4 from "./TP Ts/ttp4";

import Mttpts1 from "./TP Ts/mttp1";
import Mttpts2 from "./TP Ts/mttp2";
import Mttpts3 from "./TP Ts/mttp3";
import Mttpts4 from "./TP Ts/mttp4";

import Metpts1 from "./TP Ts/metp1";
import Metpts2 from "./TP Ts/mtep2";
import Metpts3 from "./TP Ts/metp3";
import Metpts4 from "./TP Ts/metp4";

import Ssttpts1 from "./TP Ts/ssttp1";
import Ssttpts2 from "./TP Ts/ssttp2";
import Ssttpts3 from "./TP Ts/ssttp3";
import Ssttpts4 from "./TP Ts/ssttp4";

import Ssetpts1 from "./TP Ts/ssetp1";
import Ssetpts2 from "./TP Ts/ssetp2";
import Ssetpts3 from "./TP Ts/ssetp3";
import Ssetpts4 from "./TP Ts/ssetp4";


import Setpts1 from "./TP Ts/setp1";
import Setpts2 from "./TP Ts/setp2";
import Setpts3 from "./TP Ts/setp3";
import Setpts4 from "./TP Ts/setp4";

import Sttpts1 from "./TP Ts/sttp1";
import Sttpts2 from "./TP Ts/sttp2";
import Sttpts3 from "./TP Ts/sttp3";
import Sttpts4 from "./TP Ts/sttp4";

import Netpts1 from "./TP Ts/Netpts1";
import Netpts2 from "./TP Ts/Netpts2";
import Netpts3 from "./TP Ts/Netpts3";
import Netpts4 from "./TP Ts/Netpts4";

import Nttpts1 from "./TP Ts/Nttpts1";
import Nttpts2 from "./TP Ts/Nttpts2";
import Nttpts3 from "./TP Ts/Nttpts3";
import Nttpts4 from "./TP Ts/Nttpts4";


import Teltpts from "./TestpapersTs/Telugutp";
import Hintpts from "./TestpapersTs/Hinditp";
import Engtpts from "./TestpapersTs/Engtp";
import Matetpts from "./TestpapersTs/Mathsetp";
import Matttpts from "./TestpapersTs/Mathttp";
import Phyetpts from "./TestpapersTs/Phyetp";
import Phyttpts from "./TestpapersTs/Phyttp";
import Socetpts from "./TestpapersTs/Societp";
import Socttpts from "./TestpapersTs/Socittp";
import Nttpts from "./TestpapersTs/Nttstp";
import Netpts from "./TestpapersTs/Netstp";


import Appoly from "./Appoly/appoly";
import Tspoly from "./Tspoly/tspoly";
import P2016t from "./Tspoly/p2016";

import P2017t from "./Tspoly/P2017";
import P2018t from "./Tspoly/P2018";
import P2019t from "./Tspoly/P2019";
import P2020t from "./Tspoly/P2020";
import P2021t from "./Tspoly/P2021";
import P2022t from "./Tspoly/P2022";

import P2016 from "./Appoly/p2016";
import P2017 from "./Appoly/P2017";
import P2018 from "./Appoly/P2018";
import P2019 from "./Appoly/P2019";
import P2020 from "./Appoly/P2020";
import P2021 from "./Appoly/P2021";
import P2022 from "./Appoly/P2022";

import Mocktest from "./Mocttest";
import Mtres from "./Mtres";

import Epfts from "./PRE TS/Epf";
import Hpfts from "./PRE TS/Hpf";
import Tpfts from "./PRE TS/Tpf";
import Mepfts from "./PRE TS/Mepf";
import Mtpfts from "./PRE TS/Mtpf";
import Stpfts from "./PRE TS/Stpf";
import Sepfts from "./PRE TS/Sepf";
import Nepfts from "./PRE TS/Nepfts";
import Ntpfts from "./PRE TS/Ntpfts";
import Ssepfts from "./PRE TS/Ssepf";
import Sstpfts from "./PRE TS/Sstpf";
import classes from "./Classes";
import Class6exam from "./class6exam";
import Class6imp from "./class6imp";
import Class6study from "./class6study";
import Class7imp from "./class7imp";
import Class7exam from "./class7exam";
import Class7study from "./class7study";
import Class8exam from "./class8exam";
import Class8study from "./class8study";
import Class8imp from "./class8imp";
import Class9study from "./class9imp";
import Class9imp from "./class9imp";
import Class9exam from "./class9exam";

import Eng6exam from "./6thclass/exam/Engfa3";
import Eng7exam from "./7thclass/exam/Engfa3";
import Eng8exam from "./8thclass/exam/Engfa3";
import Eng9exam from "./9thclass/exam/Engfa3";

import Eng6imp from "./6thclass/imp/Engfa1";
import Eng7imp from "./7thclass/imp/Engfa1";
import Eng8imp from "./8thclass/imp/Engfa1";
import Eng9imp from "./9thclass/imp/Engfa1";

import Eng6study from "./6thclass/materilas/Engfa2";
import Eng7study from "./7thclass/materilas/Engfa2";
import Eng8study from "./8thclass/materilas/Engfa2";
import Eng9study from "./9thclass/materilas/Engfa2";


import Tel6exam from "./6thclass/exam/Telfa3";
import Tel7exam from "./7thclass/exam/Telfa3";
import Tel8exam from "./8thclass/exam/Telfa3";

import Tel8imp from "./8thclass/imp/Telfa1";
import Tel9imp from "./9thclass/imp/Telfa1";
import Tel6imp from "./6thclass/imp/Telfa1";
import Tel7imp from "./7thclass/imp/Telfa1";
import Tel9exam from "./9thclass/exam/Telfa3";

import Tel6study from "./6thclass/materilas/Telfa2";
import Tel7study from "./7thclass/materilas/Telfa2";
import Tel8study from "./8thclass/materilas/Telfa2";
import Tel9study from "./9thclass/materilas/Telfa2";

import Hin6exam from "./6thclass/exam/Hinfa3";
import Hin7exam from "./7thclass/exam/Hinfa3";
import Hin8exam from "./8thclass/exam/Hinfa3";
import Hin9exam from "./9thclass/exam/Hinfa3";

import Hin6imp from "./6thclass/imp/Hinfa1";
import Hin7imp from "./7thclass/imp/Hinfa1";
import Hin8imp from "./8thclass/imp/Hinfa1";
import Hin9imp from "./9thclass/imp/Hinfa1";

import Hin6study from "./6thclass/materilas/Hinfa2";
import Hin7study from "./7thclass/materilas/Hinfa2";
import Hin9study from "./9thclass/materilas/Hinfa2";
import Hin8study from "./8thclass/materilas/Hinfa2";

import Mt6imp from "./6thclass/imp/Mattfa1";
import Mt7imp from "./7thclass/imp/Mattfa1";
import Mt8imp from "./8thclass/imp/Mattfa1";
import Mt9imp from "./9thclass/imp/Mattfa1";

import Mt6study from "./6thclass/materilas/Mattfa2";
import Mt7study from "./7thclass/materilas/Mattfa2";
import Mt9study from "./9thclass/materilas/Mattfa2";
import Mt8study from "./8thclass/materilas/Mattfa2";

import Mt6exam from "./6thclass/exam/Mattfa3";
import Mt7exam from "./7thclass/exam/Mattfa3";
import Mt8exam from "./8thclass/exam/Mattfa3";
import Mt9exam from "./9thclass/exam/Mattfa3";

import Me6imp from "./6thclass/imp/Matefa1";
import Me7imp from "./7thclass/imp/Matefa1";
import Me8imp from "./8thclass/imp/Matefa1";
import Me9imp from "./9thclass/imp/Matefa1";

import Me6study from "./6thclass/materilas/Matefa2";
import Me7study from "./7thclass/materilas/Matefa2";
import Me8study from "./8thclass/materilas/Matefa2";
import Me9study from "./9thclass/materilas/Matefa2";

import Me6exam from "./6thclass/exam/Matefa3";
import Me7exam from "./7thclass/exam/Matefa3";
import Me8exam from "./8thclass/exam/Matefa3";
import Me9exam from "./9thclass/exam/Matefa3";

import Nse6imp from "./6thclass/imp/Sciefa1";
import Nse7imp from "./7thclass/imp/Sciefa1";
import Nse8imp from "./8thclass/imp/Sciefa1";
import Nse9imp from "./9thclass/imp/Sciefa1";

import Nse6study from "./6thclass/materilas/Sciefa2";
import Nse7study from "./7thclass/materilas/Sciefa2";
import Nse8study from "./8thclass/materilas/Sciefa2";
import Nse9study from "./9thclass/materilas/Sciefa2";

import NSe6exam from "./6thclass/exam/Sciefa3";
import NSe7exam from "./7thclass/exam/Sciefa3";
import NSe8exam from "./8thclass/exam/Sciefa3";
import NSe9exam from "./9thclass/exam/Sciefa3";

import Nst6imp from "./6thclass/imp/Scitfa1";
import Nst7imp from "./7thclass/imp/Scitfa1";
import Nst8imp from "./8thclass/imp/Scitfa1";
import Nst9imp from "./9thclass/imp/Scitfa1";

import Nst6study from "./6thclass/materilas/Sictfa2";
import Nst7study from "./7thclass/materilas/Sictfa2";
import Nst8study from "./8thclass/materilas/Sictfa2";
import Nst9study from "./9thclass/materilas/Sictfa2";

import NSt6exam from "./6thclass/exam/Sictfa3";
import NSt7exam from "./7thclass/exam/Sictfa3";
import NSt8exam from "./8thclass/exam/Sictfa3";
import NSt9exam from "./9thclass/exam/Sictfa3";


import Soce6exam from "./6thclass/exam/Socefa3";
import Soce7exam from "./7thclass/exam/Socefa3";
import Soce8exam from "./8thclass/exam/Socefa3";
import Soce9exam from "./9thclass/exam/Socefa3";

import Soce6imp from "./6thclass/imp/Socefa1";
import Soce7imp from "./7thclass/imp/Socefa1";
import Soce8imp from "./8thclass/imp/Socefa1";
import Soce9imp from "./9thclass/imp/Socefa1";

import Soce6study from "./6thclass/materilas/Socefa2";
import Soce7study from "./7thclass/materilas/Socefa2";
import Soce8study from "./8thclass/materilas/Socefa2";
import Soce9study from "./9thclass/materilas/Socefa2";

import Soct6imp from "./6thclass/imp/Soctfa1";
import Soct8imp from "./8thclass/imp/Soctfa1";
import Soct9imp from "./9thclass/imp/Soctfa1";
import Soct7imp from "./7thclass/imp/Soctfa1";

import Soct6study from "./6thclass/materilas/Soctfa2";
import Soct9study from "./9thclass/materilas/Soctfa2";
import Soct7study from "./7thclass/materilas/Soctfa2";
import Soct8study from "./8thclass/materilas/Soctfa2";

import Soct6exam from "./6thclass/exam/Soctfa3";
import Soct7exam from "./7thclass/exam/Soctfa3";
import Soct8exam from "./8thclass/exam/Soctfa3";
import Soct9exam from "./9thclass/exam/Soctfa3";


import Impinter from "./inter1styear/impinter";
import Interprev from "./inter1styear/interprev";
import Interstudy from "./inter1styear/interstudy";
import Impinter2 from "./inter2nd/impinter2";
import Interprev2 from "./inter2nd/interprev2";
import Interstudy2 from "./inter2nd/interstudy2";


import Bio1eip from "./inter imp que/1styear/Bio1e";
import Bio1tip from "./inter imp que/1styear/Bio1t";
import Che1eip from "./inter imp que/1styear/Che1e";
import Che1tip from "./inter imp que/1styear/Che1t";
import Civ1ip from "./inter imp que/1styear/Civ1";
import Commer1ip from "./inter imp que/1styear/Comer1";
import Eng1ip from "./inter imp que/1styear/E1year";
import Eco1ip from "./inter imp que/1styear/Eco1";
import Hin1ip from "./inter imp que/1styear/H1year";
import His1ip from "./inter imp que/1styear/His1";
import M1aeip from "./inter imp que/1styear/M1ae";
import M1atip from "./inter imp que/1styear/M1at";
import M1beip from "./inter imp que/1styear/M1be";
import M1btip from "./inter imp que/1styear/M1bt";
import Pht1eip from "./inter imp que/1styear/Phy1e";
import Pht1tip from "./inter imp que/1styear/Phy1t";
import Pol1ip from "./inter imp que/1styear/Pol1";
import San1ip from "./inter imp que/1styear/San1year";
import Tel1ip from "./inter imp que/1styear/T1year";
import Zol1eip from "./inter imp que/1styear/Zo1e";
import Zol1tip from "./inter imp que/1styear/Zo1t";


import Bio2eip from "./inter imp que/2ndyear/Bio1e";
import Bio2tip from "./inter imp que/2ndyear/Bio1t";
import Che2eip from "./inter imp que/2ndyear/Che1e";
import Che2tip from "./inter imp que/2ndyear/Che1t";
import Civ2ip from "./inter imp que/2ndyear/Civ1";
import Commer2ip from "./inter imp que/2ndyear/Comer1";
import Eng2ip from "./inter imp que/2ndyear/E1year";
import Hin2ip from "./inter imp que/2ndyear/H1year";
import San2ip from "./inter imp que/2ndyear/San1year";
import Tel2ip from "./inter imp que/2ndyear/T1year";
import M2aeip from "./inter imp que/2ndyear/M1ae";
import M2atip from "./inter imp que/2ndyear/M1at";
import M2beip from "./inter imp que/2ndyear/M1be";
import M2btip from "./inter imp que/2ndyear/M1bt";
import Pht2eip from "./inter imp que/2ndyear/Phy1e";
import Pht2tip from "./inter imp que/2ndyear/Phy1t";
import Zol2eip from "./inter imp que/2ndyear/Zo1e";
import Zol2tip from "./inter imp que/2ndyear/Zo1t";
import Pol2ip from "./inter imp que/2ndyear/Pol1";
import Eco2ip from "./inter imp que/2ndyear/Eco1";
import His2ip from "./inter imp que/2ndyear/His1";


import Bio1est from "./Study/1styear/Bio1e";
import Bio1tst from "./Study/1styear/Bio1t";
import Commer1st from "./Study/1styear/Comer1";
import Eng1st from "./Study/1styear/E1year";
import Hin1st from "./Study/1styear/H1year";
import His1st from "./Study/1styear/His1";
import Eco1st from "./Study/1styear/Eco1";
import Civ1st from "./Study/1styear/Civ1";
import Pol1st from "./Study/1styear/Pol1";
import San1st from "./Study/1styear/San1year";
import Tel1st from "./Study/1styear/T1year";
import Che1est from "./Study/1styear/Che1e";
import Che1tst from "./Study/1styear/Che1t";
import M1btst from "./Study/1styear/M1bt";
import M1best from "./Study/1styear/M1be";
import M1aest from "./Study/1styear/M1ae";
import M1atst from "./Study/1styear/M1at";
import Pht1est from "./Study/1styear/Phy1e";
import Pht1tst from "./Study/1styear/Phy1t";
import Zol1est from "./Study/1styear/Zo1e";
import Zol1tst from "./Study/1styear/Zo1t";


import Bio2est from "./Study/2ndyear/Bio1e";
import Bio2tst from "./Study/2ndyear/Bio1t";
import Che2est from "./Study/2ndyear/Che1e";
import Che2tst from "./Study/2ndyear/Che1t";
import Pht2est from "./Study/2ndyear/Phy1e";
import Pht2tst from "./Study/2ndyear/Phy1t";
import Civ2st from "./Study/2ndyear/Civ1";
import Hin2st from "./Study/2ndyear/H1year";
import Tel2st from "./Study/2ndyear/T1year";
import Eng2st from "./Study/2ndyear/E1year";
import Pol2st from "./Study/2ndyear/Pol1";
import His2st from "./Study/2ndyear/His1";
import Zol2est from "./Study/2ndyear/Zo1e";
import Zol2tst from "./Study/2ndyear/Zo1t";
import M2aest from "./Study/2ndyear/M1ae";
import M2atst from "./Study/2ndyear/M1at";
import M2btst from "./Study/2ndyear/M1bt";
import M2best from "./Study/2ndyear/M1be";
import San2st from "./Study/2ndyear/San1year";
import Commer2st from "./Study/2ndyear/Comer1";
import Eco2st from "./Study/2ndyear/Eco1";

import Bio1 from "./prev1papers/Bio1e";
import Bio1t from "./prev1papers/Bio1t";
import Che1t from "./prev1papers/Che1t";
import Che1e from "./prev1papers/Che1e";
import Hin1 from "./prev1papers/H1year";
import Eng1 from "./prev1papers/E1year";
import San1 from "./prev1papers/San1year";
import Tel1 from "./prev1papers/T1year";
import Phy1t from "./prev1papers/Phy1t";
import Phy1e from "./prev1papers/Phy1e";
import Civ1 from "./prev1papers/Civ1";
import Pol1 from "./prev1papers/Pol1";
import M1ae from "./prev1papers/M1ae";
import M1at from "./prev1papers/M1at";
import M1be from "./prev1papers/M1be";
import M1bt from "./prev1papers/M1bt";
import Commer1 from "./prev1papers/Comer1";
import Eco1 from "./prev1papers/Eco1";
import His1 from "./prev1papers/His1";
import Zo1e from "./prev1papers/Zo1e";
import Zo1t from "./prev1papers/Zo1t";

import Bio1e23 from "./2023/1styear/Bio1e";
import Bio1t23 from "./2023/1styear/Bio1t";
import Che1e23 from "./2023/1styear/Che1e";
import Che1t23 from "./2023/1styear/Che1t";
import Tel123 from "./2023/1styear/T1year";
import Hin123 from "./2023/1styear/H1year";
import Eng123 from "./2023/1styear/E1year";
import San123 from "./2023/1styear/San1year";
import Civ123 from "./2023/1styear/Civ1";
import Commer123 from "./2023/1styear/Comer1";
import Eco123 from "./2023/1styear/Eco1";
import Pol123 from "./2023/1styear/Pol1";
import Zol1e23 from "./2023/1styear/Zo1e";
import Zol1t23 from "./2023/1styear/Zo1t";
import M1ae23 from "./2023/1styear/M1ae";
import M1at23 from "./2023/1styear/M1at";
import M1be23 from "./2023/1styear/M1be";
import M1bt23 from "./2023/1styear/M1bt";
import Pht1e23 from "./2023/1styear/Phy1e";
import Pht1t23 from "./2023/1styear/Phy1t";
import His123 from "./2023/1styear/His1";

import Bio1e22 from "./2022/1styear/Bio1e";
import Che1e22 from "./2022/1styear/Che1e";
import Che1t22 from "./2022/1styear/Che1t";
import Tel122 from "./2022/1styear/T1year";
import Hin122 from "./2022/1styear/H1year";
import Eng122 from "./2022/1styear/E1year";
import San122 from "./2022/1styear/San1year";
import M1ae22 from "./2022/1styear/M1ae";
import M1at22 from "./2022/1styear/M1at";
import M1bt22 from "./2022/1styear/M1bt";
import M1be22 from "./2022/1styear/M1be";
import Pol122 from "./2022/1styear/Pol1";
import Eco122 from "./2022/1styear/Eco1";
import Commer122 from "./2022/1styear/Comer1";
import Civ122 from "./2022/1styear/Civ1";
import Zol1e22 from "./2022/1styear/Zo1e";
import Zol1t22 from "./2022/1styear/Zo1t";
import Bio1t22 from "./2022/1styear/Bio1t";
import Pht1e22 from "./2022/1styear/Phy1e";
import Pht1t22 from "./2022/1styear/Phy1t";
import His122 from "./2022/1styear/His1";


import Bio1e21 from "./2021/1styear/Bio1e";
import Bio1t21 from "./2021/1styear/Bio1t";
import Che1e21 from "./2021/1styear/Che1e";
import Che1t21 from "./2021/1styear/Che1t";
import Tel121 from "./2021/1styear/T1year";
import Hin121 from "./2021/1styear/H1year";
import San121 from "./2021/1styear/San1year";
import Eng121 from "./2021/1styear/E1year";
import M1at21 from "./2021/1styear/M1at";
import M1be21 from "./2021/1styear/M1be";
import M1ae121 from "./2021/1styear/M1ae";
import M1bt21 from "./2021/1styear/M1bt";
import Pht1t21 from "./2021/1styear/Phy1t";
import Pht1e21 from "./2021/1styear/Phy1e";
import Commer121 from "./2021/1styear/Comer1";
import Civ121 from "./2021/1styear/Civ1";
import His121 from "./2021/1styear/His1";
import Pol121 from "./2021/1styear/Pol1";
import Zol1e21 from "./2021/1styear/Zo1e";
import Zol1t21 from "./2021/1styear/Zo1t";
import Eco121 from "./2021/1styear/Eco1";

import Bio1e20 from "./2020/1styear/Bio1e";
import Bio1t20 from "./2020/1styear/Bio1t";
import Che1e20 from "./2020/1styear/Che1e";
import Che1t20 from "./2020/1styear/Che1t";
import Tel120 from "./2020/1styear/T1year";
import Hin120 from "./2020/1styear/H1year";
import San120 from "./2020/1styear/San1year";
import Eng120 from "./2020/1styear/E1year";
import Civ120 from "./2020/1styear/Civ1";
import Commer120 from "./2020/1styear/Comer1";
import Eco120 from "./2020/1styear/Eco1";
import Pol120 from "./2020/1styear/Pol1";
import M1bt20 from "./2020/1styear/M1bt";
import M1be20 from "./2020/1styear/M1be";
import M1ae20 from "./2020/1styear/M1ae";
import M1at20 from "./2020/1styear/M1at";
import Pht1e20 from "./2020/1styear/Phy1e";
import Pht1t20 from "./2020/1styear/Phy1t";
import Zol1e20 from "./2020/1styear/Zo1e";
import Zol1t20 from "./2020/1styear/Zo1t";
import His120 from "./2020/1styear/His1";

import Bio1e19 from "./2019/1styear/Bio1e";
import Bio1t19 from "./2019/1styear/Bio1t";
import Che1e19 from "./2019/1styear/Che1e";
import Che1t19 from "./2019/1styear/Che1t";
import Tel119 from "./2019/1styear/T1year";
import Hin119 from "./2019/1styear/H1year";
import Eng119 from "./2019/1styear/E1year";
import San119 from "./2019/1styear/San1year";
import M1at19 from "./2019/1styear/M1at";
import M1ae19 from "./2019/1styear/M1ae";
import M1be19 from "./2019/1styear/M1be";
import M1bt19 from "./2019/1styear/M1bt";
import Zol1e19 from "./2019/1styear/Zo1e";
import Zol1t19 from "./2019/1styear/Zo1t";
import Commer119 from "./2019/1styear/Comer1";
import Civ119 from "./2019/1styear/Civ1";
import Eco119 from "./2019/1styear/Eco1";
import Pht1e19 from "./2019/1styear/Phy1e";
import Pht1t19 from "./2019/1styear/Phy1t";
import His119 from "./2019/1styear/His1";
import Pol119 from "./2019/1styear/Pol1";

import Bio1e18 from "./2018/1styear/Bio1e";
import Bio1t18 from "./2018/1styear/Bio1t";
import Che1e18 from "./2018/1styear/Che1e";
import Che1t18 from "./2018/1styear/Che1t";
import Pht1e18 from "./2018/1styear/Phy1e";
import Pht1t18 from "./2018/1styear/Phy1t";
import Hin118 from "./2018/1styear/H1year";
import Tel118 from "./2018/1styear/T1year";
import San118 from "./2018/1styear/San1year";
import Eng118 from "./2018/1styear/E1year";
import M1at18 from "./2018/1styear/M1at";
import M1ae18 from "./2018/1styear/M1ae";
import M1bt18 from "./2018/1styear/M1bt";
import M1be18 from "./2018/1styear/M1be";
import Zol1e18 from "./2018/1styear/Zo1e";
import Zol1t18 from "./2018/1styear/Zo1t";
import Civ118 from "./2018/1styear/Civ1";
import Commer118 from "./2018/1styear/Comer1";
import Eco118 from "./2018/1styear/Eco1";
import Pol18 from "./2018/1styear/Pol1";
import His118 from "./2018/1styear/His1";

import Bio117 from "./2017/1styear/Bio1e";
import Bio1t17 from "./2017/1styear/Bio1t";
import Che1e17 from "./2017/1styear/Che1e";
import Che1t17 from "./2017/1styear/Che1t";
import M1at17 from "./2017/1styear/M1at";
import M1ae17 from "./2017/1styear/M1ae";
import M1be17 from "./2017/1styear/M1be";
import M1bt17 from "./2017/1styear/M1bt";
import Pht1e17 from "./2017/1styear/Phy1e";
import Pht1t17 from "./2017/1styear/Phy1t";
import Tel117 from "./2017/1styear/T1year";
import Hin117 from "./2017/1styear/H1year";
import Eng117 from "./2017/1styear/E1year";
import San117 from "./2017/1styear/San1year";
import Commer117 from "./2017/1styear/Comer1";
import Civ117 from "./2017/1styear/Civ1";
import Eco117 from "./2017/1styear/Eco1";
import Pol117 from "./2017/1styear/Pol1";
import Zol1e17 from "./2017/1styear/Zo1e";
import Zol1t17 from "./2017/1styear/Zo1t";
import His117 from "./2017/1styear/His1";

import Bio1e16 from "./2016/1styear/Bio1e";
import Bio1t16 from "./2016/1styear/Bio1t";
import Che1e16 from "./2016/1styear/Che1e";
import Che1t16 from "./2016/1styear/Che1t";
import Pht1e16 from "./2016/1styear/Phy1e";
import Pht1t16 from "./2016/1styear/Phy1t";
import M1ae16 from "./2016/1styear/M1ae";
import M1at16 from "./2016/1styear/M1at";
import M1be16 from "./2016/1styear/M1be";
import M1bt16 from "./2016/1styear/M1bt";
import Zol1e16 from "./2016/1styear/Zo1e";
import Zol1t16 from "./2016/1styear/Zo1t";
import Commer116 from "./2016/1styear/Comer1";
import Civ116 from "./2016/1styear/Civ1";
import Eco116 from "./2016/1styear/Eco1";
import Hin116 from "./2016/1styear/H1year";
import Tel116 from "./2016/1styear/T1year";
import His116 from "./2016/1styear/His1";
import Eng116 from "./2016/1styear/E1year";
import Pol116 from "./2016/1styear/Pol1";
import San116 from "./2016/1styear/San1year";

import Bio1e15 from "./2015/1styear/Bio1e";
import Bio1t15 from "./2015/1styear/Bio1t";
import Che1e15 from "./2015/1styear/Che1e";
import Che1t15 from "./2015/1styear/Che1t";
import Pht1e15 from "./2015/1styear/Phy1e";
import Pht1t15 from "./2015/1styear/Phy1t";
import M1at15 from "./2015/1styear/M1at";
import M1ae15 from "./2015/1styear/M1ae";
import M1be15 from "./2015/1styear/M1be";
import M1bt15 from "./2015/1styear/M1bt";
import Zol1e15 from "./2015/1styear/Zo1e";
import Zol1t15 from "./2015/1styear/Zo1t";
import Commer115 from "./2015/1styear/Comer1";
import Civ115 from "./2015/1styear/Civ1";
import Eco115 from "./2015/1styear/Eco1";
import Tel115 from "./2015/1styear/T1year";
import Hin115 from "./2015/1styear/H1year";
import Eng115 from "./2015/1styear/E1year";
import His115 from "./2015/1styear/His1";
import San115 from "./2015/1styear/San1year";
import Pol115 from "./2015/1styear/Pol1";




import M2ae23 from "./2023/2ndyear/M1ae";
import Bio2e23 from "./2023/2ndyear/Bio1e";
import Bio2t23 from "./2023/2ndyear/Bio1t";
import M2at23 from "./2023/2ndyear/M1at";
import M2bt23 from "./2023/2ndyear/M1bt";
import M2be23 from "./2023/2ndyear/M1be";
import Tel223 from "./2023/2ndyear/T1year";
import Hin223 from "./2023/2ndyear/H1year";
import Eng223 from "./2023/2ndyear/E1year";
import San223 from "./2023/2ndyear/San1year";
import Civ223 from "./2023/2ndyear/Civ1";
import Commer223 from "./2023/2ndyear/Comer1";
import Pol223 from "./2023/2ndyear/Pol1";
import Zol2e23 from "./2023/2ndyear/Zo1e";
import Zol2t23 from "./2023/2ndyear/Zo1t";
import Eco223 from "./2023/2ndyear/Eco1";
import Pht2e23 from "./2023/2ndyear/Phy1e";
import Pht2t23 from "./2023/2ndyear/Phy1t";
import Che2e23 from "./2023/2ndyear/Che1e";
import Che2t23 from "./2023/2ndyear/Che1t";
import His223 from "./2023/2ndyear/His1";


import Bio2e22 from "./2022/2ndyear/Bio1e";
import Bio2t22 from "./2022/2ndyear/Bio1t";
import Che2e22 from "./2022/2ndyear/Che1e";
import Che2t22 from "./2022/2ndyear/Che1t";
import Hin222 from "./2022/2ndyear/H1year";
import Tel222 from "./2022/2ndyear/T1year";
import His222 from "./2022/2ndyear/His1";
import San222 from "./2022/2ndyear/San1year";
import Pol222 from "./2022/2ndyear/Pol1";
import Civ222 from "./2022/2ndyear/Civ1";
import Commer222 from "./2022/2ndyear/Comer1";
import Zol2e22 from "./2022/2ndyear/Zo1e";
import Zol2t22 from "./2022/2ndyear/Zo1t";
import M2ae22 from "./2022/2ndyear/M1ae";
import M2at22 from "./2022/2ndyear/M1at";
import M2bt22 from "./2022/2ndyear/M1bt";
import M2be22 from "./2022/2ndyear/M1be";
import Pht2e22 from "./2022/2ndyear/Phy1e";
import Pht2t22 from "./2022/2ndyear/Phy1t";
import Eng222 from "./2022/2ndyear/E1year";
import Eco222 from "./2022/2ndyear/Eco1";

import Bio2e21 from "./2021/2ndyear/Bio1e";
import Bio2t21 from "./2021/2ndyear/Bio1t";
import Che2e21 from "./2021/2ndyear/Che1e";
import Che2t21 from "./2021/2ndyear/Che1t";
import Zol2e21 from "./2021/2ndyear/Zo1e";
import Zol2t21 from "./2021/2ndyear/Zo1t";
import Commer221 from "./2021/2ndyear/Comer1";
import Civ221 from "./2021/2ndyear/Civ1";
import Eco221 from "./2021/2ndyear/Eco1";
import His221 from "./2021/2ndyear/His1";
import Hin221 from "./2021/2ndyear/H1year";
import Tel221 from "./2021/2ndyear/T1year";
import San221 from "./2021/2ndyear/San1year";
import Pht2e21 from "./2021/2ndyear/Phy1e";
import Pht2t21 from "./2021/2ndyear/Phy1t";
import M2ae21 from "./2021/2ndyear/M1ae";
import M2at21 from "./2021/2ndyear/M1at";
import M2be21 from "./2021/2ndyear/M1be";
import M2bt21 from "./2021/2ndyear/M1bt";
import Pol221 from "./2021/2ndyear/Pol1";
import Eng221 from "./2021/2ndyear/E1year";

import Eng220 from "./2020/2ndyear/E1year";
import Tel220 from "./2020/2ndyear/T1year";
import San220 from "./2020/2ndyear/San1year";
import Hin220 from "./2020/2ndyear/H1year";
import His220 from "./2020/2ndyear/His1";

import Civ220 from "./2020/2ndyear/Civ1";
import Commer220 from "./2020/2ndyear/Comer1";
import Eco220 from "./2020/2ndyear/Eco1";
import Bio2e20 from "./2020/2ndyear/Bio1e";
import Bio2t20 from "./2020/2ndyear/Bio1t";
import Che2e20 from "./2020/2ndyear/Che1e";
import Che2t20 from "./2020/2ndyear/Che1t";
import M2ae20 from "./2020/2ndyear/M1ae";
import M2at20 from "./2020/2ndyear/M1at";
import M2be20 from "./2020/2ndyear/M1be";
import M2bt20 from "./2020/2ndyear/M1bt";
import Pol220 from "./2020/2ndyear/Pol1";
import Zol2e20 from "./2020/2ndyear/Zo1e";
import Zol2t20 from "./2020/2ndyear/Zo1t";
import Pht2e20 from "./2020/2ndyear/Phy1e";
import Pht2t20 from "./2020/2ndyear/Phy1t";


import Pht2e19 from "./2019/2ndyear/Phy1e";
import Pht2t19 from "./2019/2ndyear/Phy1t";
import Tel219 from "./2019/2ndyear/T1year";
import Hin219 from "./2019/2ndyear/H1year";
import Eng219 from "./2019/2ndyear/E1year";
import San219 from "./2019/2ndyear/San1year";
import Civ219 from "./2019/2ndyear/Civ1";
import Commer219 from "./2019/2ndyear/Comer1";
import Eco219 from "./2019/2ndyear/Eco1";
import Bio2e19 from "./2019/2ndyear/Bio1e";
import Bio2t19 from "./2019/2ndyear/Bio1t";
import Zol2e19 from "./2019/2ndyear/Zo1e";
import Zol2t19 from "./2019/2ndyear/Zo1t";
import M2ae19 from "./2019/2ndyear/M1ae";
import M2at19 from "./2019/2ndyear/M1at";
import M2be19 from "./2019/2ndyear/M1be";
import M2bt19 from "./2019/2ndyear/M1bt";
import Pol219 from "./2019/2ndyear/Pol1";
import Che2e19 from "./2019/2ndyear/Che1e";
import Che2t19 from "./2019/2ndyear/Che1t";
import His219 from "./2019/2ndyear/His1";

import Che2e18 from "./2018/2ndyear/Che1e";
import Che2t18 from "./2018/2ndyear/Che1t";
import Eco218 from "./2018/2ndyear/Eco1";
import Hin218 from "./2018/2ndyear/H1year";
import Tel218 from "./2018/2ndyear/T1year";
import Eng218 from "./2018/2ndyear/E1year";
import San218 from "./2018/2ndyear/San1year";
import Civ218 from "./2018/2ndyear/Civ1";
import Commer218 from "./2018/2ndyear/Comer1";
import Bio2t18 from "./2018/2ndyear/Bio1t";
import M2ae18 from "./2018/2ndyear/M1ae";
import M2at18 from "./2018/2ndyear/M1at";
import M2be18 from "./2018/2ndyear/M1be";
import M2bt18 from "./2018/2ndyear/M1bt";
import Zol2e18 from "./2018/2ndyear/Zo1e";
import Zol2t18 from "./2018/2ndyear/Zo1t";
import Bio2e18 from "./2018/2ndyear/Bio1e";
import Pol218 from "./2018/2ndyear/Pol1";
import Pht2e18 from "./2018/2ndyear/Phy1e";
import Pht2t18 from "./2018/2ndyear/Phy1t";
import His218 from "./2018/2ndyear/His1";


import Bio2e17 from "./2017/2ndyear/Bio1e";
import Bio2t17 from "./2017/2ndyear/Bio1t";
import Che2e17 from "./2017/2ndyear/Che1e";
import Che2t17 from "./2017/2ndyear/Che1t";
import Zol2e17 from "./2017/2ndyear/Zo1e";
import Zol2t17 from "./2017/2ndyear/Zo1t";
import Pht2e17 from "./2017/2ndyear/Phy1e";
import Pht2t17 from "./2017/2ndyear/Phy1t";
import Tel217 from "./2017/2ndyear/T1year";
import Hin217 from "./2017/2ndyear/H1year";
import Eng217 from "./2017/2ndyear/E1year";
import San217 from "./2017/2ndyear/San1year";
import Pol217 from "./2017/2ndyear/Pol1";
import Commer217 from "./2017/2ndyear/Comer1";
import His217 from "./2017/2ndyear/His1";
import M2ae17 from "./2017/2ndyear/M1ae";
import M2at17 from "./2017/2ndyear/M1at";
import M2be17 from "./2017/2ndyear/M1be";
import M2bt17 from "./2017/2ndyear/M1bt";
import Civ217 from "./2017/2ndyear/Civ1";
import Eco217 from "./2017/2ndyear/Eco1";


import Bio2e16 from "./2016/2ndyear/Bio1e";
import Bio2t16 from "./2016/2ndyear/Bio1t";
import Zol2e16 from "./2016/2ndyear/Zo1e";
import Zol2t16 from "./2016/2ndyear/Zo1t";
import Che2e16 from "./2016/2ndyear/Che1e";
import Tel216 from "./2016/2ndyear/T1year";
import Hin216 from "./2016/2ndyear/H1year";
import His216 from "./2016/2ndyear/His1";
import San216 from "./2016/2ndyear/San1year";
import Civ216 from "./2016/2ndyear/Civ1";
import Pol216 from "./2016/2ndyear/Pol1";
import Che2t16 from "./2016/2ndyear/Che1t";
import M2ae16 from "./2016/2ndyear/M1ae";
import M2at16 from "./2016/2ndyear/M1at";
import M2be16 from "./2016/2ndyear/M1be";
import M2bt16 from "./2016/2ndyear/M1bt";
import Eco216 from "./2016/2ndyear/Eco1";
import Commer216 from "./2016/2ndyear/Comer1";
import Eng216 from "./2016/2ndyear/E1year";
import Pht2e16 from "./2016/2ndyear/Phy1e";
import Pht2t16 from "./2016/2ndyear/Phy1t";


import Bio2e15 from "./2015/2ndyear/Bio1e";
import Bio2t15 from "./2015/2ndyear/Bio1t";
import Che2e15 from "./2015/2ndyear/Che1e";
import Che2t15 from "./2015/2ndyear/Che1t";
import Zol2e15 from "./2015/2ndyear/Zo1e";
import Zol2t15 from "./2015/2ndyear/Zo1t";
import Tel215 from "./2015/2ndyear/T1year";
import Hin215 from "./2015/2ndyear/H1year";
import His215 from "./2015/2ndyear/His1";
import Eng215 from "./2015/2ndyear/E1year";
import San215 from "./2015/2ndyear/San1year";
import Civ215 from "./2015/2ndyear/Civ1";
import Commer215 from "./2015/2ndyear/Comer1";
import Eco215 from "./2015/2ndyear/Eco1";
import Pht2e15 from "./2015/2ndyear/Phy1e";
import Pht2t15 from "./2015/2ndyear/Phy1t";
import M2ae15 from "./2015/2ndyear/M1ae";
import M2at15 from "./2015/2ndyear/M1at";
import M2be15 from "./2015/2ndyear/M1be";
import M2bt15 from "./2015/2ndyear/M1bt";
import Pol215 from "./2015/2ndyear/Pol1";


import class6 from "./Cls6to9/Class6";
import class7 from "./Cls6to9/Class7";
import class8 from "./Cls6to9/Class8";
import class9 from "./Cls6to9/Class9";

import qans9 from "./Answers/qans9";
import News from "./News";

import Tel2 from "./prev2papers/T1year";
import Bio2e from "./prev2papers/Bio1e";
import Bio2t from "./prev2papers/Bio1t";
import Che2t from "./prev2papers/Che1t";
import Che2e from "./prev2papers/Che1e";
import Civ2 from "./prev2papers/Civ1";
import Commer2 from "./prev2papers/Comer1";
import Eng2 from "./prev2papers/E1year";
import Eco2 from "./prev2papers/Eco1";
import Hin2 from "./prev2papers/H1year";
import M2at from "./prev2papers/M1at";
import M2ae from "./prev2papers/M1ae";
import M2bt from "./prev2papers/M1bt";
import M2be from "./prev2papers/M1be";
import Phy2e from "./prev2papers/Phy1e";
import Phy2t from "./prev2papers/Phy1t";
import Pol2 from "./prev2papers/Pol1";
import San2 from "./prev2papers/San1year";
import Zo2e from "./prev2papers/Zo1e";
import Zo2t from "./prev2papers/Zo1t";
import His2 from "./prev2papers/His1";
import Emcet11 from "./emcet11";
import Emcet12 from "./emcet12";
import Sylfa1 from "./FA1/Fa3syl";
import Sylfa2 from "./FA2/Fa3syl";
import Syl6 from "./6thclass/materilas/Sylexam";
import Syl7 from "./7thclass/materilas/Sylexam";
import Syl8 from "./8thclass/materilas/Sylexam";
import Syl9 from "./9thclass/materilas/Sylexam";
import Class6tb from "./class6tb";
import Class7tb from "./class7tb";
import Class8tb from "./class8tb";
import Class9tb from "./class9tb";
import Tel6tb from "./6thclass/Textbooks/Telfa1";
import Tel7tb from "./7thclass/Textbooks/Telfa1";
import Tel8tb from "./8thclass/Textbooks/Telfa1";
import Tel9tb from "./9thclass/Textbooks/Telfa1";

import Eng6tb from "./6thclass/Textbooks/Engfa1";
import Eng7tb from "./7thclass/Textbooks/Engfa1";
import Eng8tb from "./8thclass/Textbooks/Engfa1";
import Eng9tb from "./9thclass/Textbooks/Engfa1";

import Hin6tb from "./6thclass/Textbooks/Hinfa1";
import Hin7tb from "./7thclass/Textbooks/Hinfa1";
import Hin9tb from "./9thclass/Textbooks/Hinfa1";
import Hin8tb from "./8thclass/Textbooks/Hinfa1";

import M16tb from "./6thclass/Textbooks/Matefa1";
import M26tb from "./6thclass/Textbooks/Mattfa1";
import M17tb from "./7thclass/Textbooks/Matefa1";
import M27tb from "./7thclass/Textbooks/Mattfa1";
import M18tb from "./8thclass/Textbooks/Matefa1";
import M28tb from "./8thclass/Textbooks/Mattfa1";
import M19tb from "./9thclass/Textbooks/Matefa1";
import M29tb from "./9thclass/Textbooks/Mattfa1";

import Ns16tb from "./6thclass/Textbooks/Sciefa1";
import Ns26tb from "./6thclass/Textbooks/Scitfa1";
import Ns17tb from "./7thclass/Textbooks/Sciefa1";
import Ns27tb from "./7thclass/Textbooks/Scitfa1";
import Ns18tb from "./8thclass/Textbooks/Sciefa1";
import Ns28tb from "./8thclass/Textbooks/Scitfa1";
import Ns19tb from "./9thclass/Textbooks/Sciefa1";
import Ns29tb from "./9thclass/Textbooks/Scitfa1";


import Ps18tb from "./8thclass/Textbooks/pstb";
import Ps28tb from "./8thclass/Textbooks/pstb2";
import Ps19tb from "./9thclass/Textbooks/pstb";
import Ps29tb from "./9thclass/Textbooks/pstb2";

import Soc16tb from "./6thclass/Textbooks/Socefa1";
import Soc26tb from "./6thclass/Textbooks/Soctfa1";
import Soc17tb from "./7thclass/Textbooks/Socefa1";
import Soc27tb from "./7thclass/Textbooks/Soctfa1";
import Soc18tb from "./8thclass/Textbooks/Socefa1";
import Soc29tb from "./9thclass/Textbooks/Soctfa1";
import Soc28tb from "./8thclass/Textbooks/Soctfa1";
import Soc19tb from "./9thclass/Textbooks/Socefa1";
import Soc38tb from "./8thclass/Textbooks/Soce3tb";
import Soc39tb from "./9thclass/Textbooks/Soce3tb";

import Nmms from "./Nmms";
import Nmmssm from "./Nmms/Nmmssm";
import Nmmspp from "./Nmms/Nmmspp";
import Nmmsme from "./Nmms/Subjects/Mathsem";
import Nmmsmt from "./Nmms/Subjects/Mathtm";
import Nmmssie from "./Nmms/Subjects/Scienceem";
import Nmmssit from "./Nmms/Subjects/Sciencetm";
import Nmmssoe from "./Nmms/Subjects/Sociem";
import Nmmssot from "./Nmms/Subjects/Socitm";


import Mate1 from "./Nmms/Study/Studyem/Mathsem/Mat1";
import Mate2 from "./Nmms/Study/Studyem/Mathsem/Mat2";
import Mate3 from "./Nmms/Study/Studyem/Mathsem/Mat3";
import Mate4 from "./Nmms/Study/Studyem/Mathsem/Mat4";
import Mate5 from "./Nmms/Study/Studyem/Mathsem/Mat5";
import Mate6 from "./Nmms/Study/Studyem/Mathsem/Mat6";
import Mate8 from "./Nmms/Study/Studyem/Mathsem/Mat8";
import Mate7 from "./Nmms/Study/Studyem/Mathsem/Mat7";
import Mate9 from "./Nmms/Study/Studyem/Mathsem/Mat9";
import Mate10 from "./Nmms/Study/Studyem/Mathsem/Mat10";

import Matt1 from "./Nmms/Study/Studytm/Mathstm/Mat1";
import Matt2 from "./Nmms/Study/Studytm/Mathstm/Mat2";
import Matt3 from "./Nmms/Study/Studytm/Mathstm/Mat3";
import Matt4 from "./Nmms/Study/Studytm/Mathstm/Mat4";
import Matt5 from "./Nmms/Study/Studytm/Mathstm/Mat5";
import Matt6 from "./Nmms/Study/Studytm/Mathstm/Mat6";
import Matt7 from "./Nmms/Study/Studytm/Mathstm/Mat7";
import Matt8 from "./Nmms/Study/Studytm/Mathstm/Mat8";
import Matt9 from "./Nmms/Study/Studytm/Mathstm/Mat9";
import Matt10 from "./Nmms/Study/Studytm/Mathstm/Mat10";

import Scie1 from "./Nmms/Study/Studyem/Science/Sci1";
import Scie2 from "./Nmms/Study/Studyem/Science/Sci2";
import Scie3 from "./Nmms/Study/Studyem/Science/Sci3";
import Scie4 from "./Nmms/Study/Studyem/Science/Sci4";

import Scit1 from "./Nmms/Study/Studytm/Sciencetm/Sci1";
import Scit2 from "./Nmms/Study/Studytm/Sciencetm/Sci2";
import Scit3 from "./Nmms/Study/Studytm/Sciencetm/Sci3";
import Scit4 from "./Nmms/Study/Studytm/Sciencetm/Sci4";
import Soct1 from "./Nmms/Study/Studytm/Social/Soc1";
import Soct2 from "./Nmms/Study/Studytm/Social/Soc2";
import Soct3 from "./Nmms/Study/Studytm/Social/Soc3";
import Soct4 from "./Nmms/Study/Studytm/Social/Soc4";
import Soct5 from "./Nmms/Study/Studytm/Social/Soc5";
import Soct6 from "./Nmms/Study/Studytm/Social/Soc6";
import Soct7 from "./Nmms/Study/Studytm/Social/Soc7";
import Soct8 from "./Nmms/Study/Studytm/Social/Soc8";
import Soct9 from "./Nmms/Study/Studytm/Social/Soc9";
import Soct10 from "./Nmms/Study/Studytm/Social/Soc10";

import Soce1 from "./Nmms/Study/Studyem/Socialem/Soc1";
import Soce2 from "./Nmms/Study/Studyem/Socialem/Soc2";
import Soce3 from "./Nmms/Study/Studyem/Socialem/Soc3";
import Soce4 from "./Nmms/Study/Studyem/Socialem/Soc4";
import Soce5 from "./Nmms/Study/Studyem/Socialem/Soc5";
import Soce6 from "./Nmms/Study/Studyem/Socialem/Soc6";
import Soce7 from "./Nmms/Study/Studyem/Socialem/Soc7";
import Soce8 from "./Nmms/Study/Studyem/Socialem/Soc8";
import Soce9 from "./Nmms/Study/Studyem/Socialem/Soc9";
import Soce10 from "./Nmms/Study/Studyem/Socialem/Soc10";

import P2016e from "./Nmms/Pqp/p2016e";
import P2016t1 from "./Nmms/Pqp/p2016t";

import P2014e from "./Nmms/Pqp/p2014e";
import P2014t from "./Nmms/Pqp/p2014t";

import P2015e from "./Nmms/Pqp/p2015e";
import P2015t from "./Nmms/Pqp/p2015t";

import P2017e from "./Nmms/Pqp/p2017e";
import P2017t1 from "./Nmms/Pqp/P2017t";

import P2018t1 from "./Nmms/Pqp/p2018t1";
import P2018t2 from "./Nmms/Pqp/p2018t2";
import P2018t4 from "./Nmms/Pqp/p2018t4";
import P2018t3 from "./Nmms/Pqp/p2018t3";

import P2018e1 from "./Nmms/Pqp/p2018e1";
import P2018e3 from "./Nmms/Pqp/p2018e3";
import P2018e2 from "./Nmms/Pqp/p2018e2";
import P2018e4 from "./Nmms/Pqp/p2018e4";

import P2019e1 from "./Nmms/Pqp/p2019e1";
import P2019e2 from "./Nmms/Pqp/p2019e2";
import P2019e3 from "./Nmms/Pqp/p2019e3";
import P2019e4 from "./Nmms/Pqp/p2019e4";

import P2019t1 from "./Nmms/Pqp/p2019t1";
import P2019t2 from "./Nmms/Pqp/p2019t2";
import P2019t3 from "./Nmms/Pqp/p2019t3";
import P2019t4 from "./Nmms/Pqp/p2019t4";

import P2022e from "./Nmms/Pqp/P2022e";
import P2022t1 from "./Nmms/Pqp/P2022t";

import P2023e from "./Nmms/Pqp/P2023e";
import P2023t from "./Nmms/Pqp/P2023t";
import Dtest from "./Nmms/Daytest";
import Nmmstp from "./Nmms/Nmmstp";
import Test1 from "./Nmms/Test/T1";
import Test2 from "./Nmms/Test/T2";
import Test3 from "./Nmms/Test/T3";
import Test4 from "./Nmms/Test/T4";
import Test5 from "./Nmms/Test/T5";
import Test6 from "./Nmms/Test/T6";










const Stack = createNativeStackNavigator();

const MainStackNavigator1 = () => {







    return (

        <Stack.Navigator  >
            <Stack.Screen name='10th class' component={ApTs} options={{ headerShown: false }} />
            <Stack.Screen name='apssc' component={Menu} options={{ headerShown: false }} />
            <Stack.Screen name='tsssc' component={Ts} options={{ headerShown: false }} />

            <Stack.Screen name='Class6' component={class6} options={{ headerShown: false }} />
            <Stack.Screen name='Class7' component={class7} options={{ headerShown: false }} />
            <Stack.Screen name='Class8' component={class8} options={{ headerShown: false }} />
            <Stack.Screen name='Class9' component={class9} options={{ headerShown: false }} />


            <Stack.Screen name='nmms' component={Nmms} options={{ headerShown: false }} />

            <Stack.Screen name='nmmssm' component={Nmmssm} options={{ headerShown: false }} />
            <Stack.Screen name='nmmspp' component={Nmmspp} options={{ headerShown: false }} />
            <Stack.Screen name='nmmsdt' component={Dtest} options={{ headerShown: false }} />
            <Stack.Screen name='nmmstp' component={Nmmstp} options={{ headerShown: false }} />



            <Stack.Screen name='test1' component={Test1} options={{ headerShown: false }} />
            <Stack.Screen name='test2' component={Test2} options={{ headerShown: false }} />
            <Stack.Screen name='test3' component={Test3} options={{ headerShown: false }} />
            <Stack.Screen name='test4' component={Test4} options={{ headerShown: false }} />
            <Stack.Screen name='test5' component={Test5} options={{ headerShown: false }} />
            <Stack.Screen name='test6' component={Test6} options={{ headerShown: false }} />



            <Stack.Screen name='nmmsme' component={Nmmsme} options={{ headerShown: false }} />
            <Stack.Screen name='nmmsmt' component={Nmmsmt} options={{ headerShown: false }} />
            <Stack.Screen name='nmmsse' component={Nmmssoe} options={{ headerShown: false }} />
            <Stack.Screen name='nmmsst' component={Nmmssot} options={{ headerShown: false }} />
            <Stack.Screen name='nmmssie' component={Nmmssie} options={{ headerShown: false }} />
            <Stack.Screen name='nmmssit' component={Nmmssit} options={{ headerShown: false }} />



            <Stack.Screen name='nmmsme1' component={Mate1} options={{ headerShown: false }} />
            <Stack.Screen name='nmmsme2' component={Mate2} options={{ headerShown: false }} />
            <Stack.Screen name='nmmsme3' component={Mate3} options={{ headerShown: false }} />
            <Stack.Screen name='nmmsme4' component={Mate4} options={{ headerShown: false }} />
            <Stack.Screen name='nmmsme5' component={Mate5} options={{ headerShown: false }} />
            <Stack.Screen name='nmmsme6' component={Mate6} options={{ headerShown: false }} />
            <Stack.Screen name='nmmsme7' component={Mate7} options={{ headerShown: false }} />
            <Stack.Screen name='nmmsme8' component={Mate8} options={{ headerShown: false }} />
            <Stack.Screen name='nmmsme9' component={Mate9} options={{ headerShown: false }} />
            <Stack.Screen name='nmmsme10' component={Mate10} options={{ headerShown: false }} />


            <Stack.Screen name='nmmsmt1' component={Matt1} options={{ headerShown: false }} />
            <Stack.Screen name='nmmsmt2' component={Matt2} options={{ headerShown: false }} />
            <Stack.Screen name='nmmsmt3' component={Matt3} options={{ headerShown: false }} />
            <Stack.Screen name='nmmsmt4' component={Matt4} options={{ headerShown: false }} />
            <Stack.Screen name='nmmsmt5' component={Matt5} options={{ headerShown: false }} />
            <Stack.Screen name='nmmsmt6' component={Matt6} options={{ headerShown: false }} />
            <Stack.Screen name='nmmsmt7' component={Matt7} options={{ headerShown: false }} />
            <Stack.Screen name='nmmsmt8' component={Matt8} options={{ headerShown: false }} />
            <Stack.Screen name='nmmsmt9' component={Matt9} options={{ headerShown: false }} />
            <Stack.Screen name='nmmsmt10' component={Matt10} options={{ headerShown: false }} />

            <Stack.Screen name='nmmssoe1' component={Soce1} options={{ headerShown: false }} />
            <Stack.Screen name='nmmssoe2' component={Soce2} options={{ headerShown: false }} />
            <Stack.Screen name='nmmssoe3' component={Soce3} options={{ headerShown: false }} />
            <Stack.Screen name='nmmssoe4' component={Soce4} options={{ headerShown: false }} />
            <Stack.Screen name='nmmssoe5' component={Soce5} options={{ headerShown: false }} />
            <Stack.Screen name='nmmssoe6' component={Soce6} options={{ headerShown: false }} />
            <Stack.Screen name='nmmssoe7' component={Soce7} options={{ headerShown: false }} />
            <Stack.Screen name='nmmssoe8' component={Soce8} options={{ headerShown: false }} />
            <Stack.Screen name='nmmssoe9' component={Soce9} options={{ headerShown: false }} />
            <Stack.Screen name='nmmssoe10' component={Soce10} options={{ headerShown: false }} />


            <Stack.Screen name='nmmssot1' component={Soct1} options={{ headerShown: false }} />
            <Stack.Screen name='nmmssot2' component={Soct2} options={{ headerShown: false }} />
            <Stack.Screen name='nmmssot3' component={Soct3} options={{ headerShown: false }} />
            <Stack.Screen name='nmmssot4' component={Soct4} options={{ headerShown: false }} />
            <Stack.Screen name='nmmssot5' component={Soct5} options={{ headerShown: false }} />
            <Stack.Screen name='nmmssot6' component={Soct6} options={{ headerShown: false }} />
            <Stack.Screen name='nmmssot7' component={Soct7} options={{ headerShown: false }} />
            <Stack.Screen name='nmmssot8' component={Soct8} options={{ headerShown: false }} />
            <Stack.Screen name='nmmssot9' component={Soct9} options={{ headerShown: false }} />
            <Stack.Screen name='nmmssot10' component={Soct10} options={{ headerShown: false }} />

            <Stack.Screen name='nmmssie1' component={Scie1} options={{ headerShown: false }} />
            <Stack.Screen name='nmmssie2' component={Scie2} options={{ headerShown: false }} />
            <Stack.Screen name='nmmssie3' component={Scie3} options={{ headerShown: false }} />
            <Stack.Screen name='nmmssie4' component={Scie4} options={{ headerShown: false }} />


            <Stack.Screen name='nmmssit1' component={Scit1} options={{ headerShown: false }} />
            <Stack.Screen name='nmmssit2' component={Scit2} options={{ headerShown: false }} />
            <Stack.Screen name='nmmssit3' component={Scit3} options={{ headerShown: false }} />
            <Stack.Screen name='nmmssit4' component={Scit4} options={{ headerShown: false }} />





            <Stack.Screen name='nmms2014em' component={P2014e} options={{ headerShown: false }} />
            <Stack.Screen name='nmms2014tm' component={P2014t} options={{ headerShown: false }} />

            <Stack.Screen name='nmms2015em' component={P2015e} options={{ headerShown: false }} />
            <Stack.Screen name='nmms2015tm' component={P2015t} options={{ headerShown: false }} />

            <Stack.Screen name='nmms2016em' component={P2016e} options={{ headerShown: false }} />
            <Stack.Screen name='nmms2016tm' component={P2016t1} options={{ headerShown: false }} />

            <Stack.Screen name='nmms2017em' component={P2017e} options={{ headerShown: false }} />
            <Stack.Screen name='nmms2017tm' component={P2017t1} options={{ headerShown: false }} />

            <Stack.Screen name='nmms2022em' component={P2022e} options={{ headerShown: false }} />
            <Stack.Screen name='nmms2022tm' component={P2022t} options={{ headerShown: false }} />


            <Stack.Screen name='nmms2023em' component={P2023e} options={{ headerShown: false }} />
            <Stack.Screen name='nmms2023tm' component={P2023t} options={{ headerShown: false }} />


            <Stack.Screen name='nmms2018em1' component={P2018e1} options={{ headerShown: false }} />
            <Stack.Screen name='nmms2018em2' component={P2018e2} options={{ headerShown: false }} />
            <Stack.Screen name='nmms2018em3' component={P2018e3} options={{ headerShown: false }} />
            <Stack.Screen name='nmms2018em4' component={P2018e4} options={{ headerShown: false }} />


            <Stack.Screen name='nmms2018tm1' component={P2018t1} options={{ headerShown: false }} />
            <Stack.Screen name='nmms2018tm2' component={P2018t2} options={{ headerShown: false }} />
            <Stack.Screen name='nmms2018tm3' component={P2018t3} options={{ headerShown: false }} />
            <Stack.Screen name='nmms2018tm4' component={P2018t4} options={{ headerShown: false }} />


            <Stack.Screen name='nmms2019em1' component={P2019e1} options={{ headerShown: false }} />
            <Stack.Screen name='nmms2019em2' component={P2019e2} options={{ headerShown: false }} />
            <Stack.Screen name='nmms2019em3' component={P2019e3} options={{ headerShown: false }} />
            <Stack.Screen name='nmms2019em4' component={P2019e4} options={{ headerShown: false }} />

            <Stack.Screen name='nmms2019tm1' component={P2019t1} options={{ headerShown: false }} />
            <Stack.Screen name='nmms2019tm2' component={P2019t2} options={{ headerShown: false }} />
            <Stack.Screen name='nmms2019tm3' component={P2019t3} options={{ headerShown: false }} />
            <Stack.Screen name='nmms2019tm4' component={P2019t4} options={{ headerShown: false }} />






            <Stack.Screen name='interimp1' component={Impinter} options={{ headerShown: false }} />
            <Stack.Screen name='interprev1' component={Interprev} options={{ headerShown: false }} />
            <Stack.Screen name='interstudy1' component={Interstudy} options={{ headerShown: false }} />


            <Stack.Screen name='t1iapimp' component={Tel1ip} options={{ headerShown: false }} />
            <Stack.Screen name='h1iapimp' component={Hin1ip} options={{ headerShown: false }} />
            <Stack.Screen name='e1iapimp' component={Eng1ip} options={{ headerShown: false }} />
            <Stack.Screen name='s1iapimp' component={San1ip} options={{ headerShown: false }} />
            <Stack.Screen name='me1aiapimp' component={M1aeip} options={{ headerShown: false }} />
            <Stack.Screen name='mt1aiapimp' component={M1atip} options={{ headerShown: false }} />
            <Stack.Screen name='me1biapimp' component={M1beip} options={{ headerShown: false }} />
            <Stack.Screen name='mt1biapimp' component={M1btip} options={{ headerShown: false }} />
            <Stack.Screen name='pt1iapimp' component={Pht1tip} options={{ headerShown: false }} />
            <Stack.Screen name='pe1iapimp' component={Pht1eip} options={{ headerShown: false }} />
            <Stack.Screen name='be1iapimp' component={Bio1eip} options={{ headerShown: false }} />
            <Stack.Screen name='bt1iapimp' component={Bio1tip} options={{ headerShown: false }} />
            <Stack.Screen name='ce1iapimp' component={Che1eip} options={{ headerShown: false }} />
            <Stack.Screen name='ct1iapimp' component={Che1tip} options={{ headerShown: false }} />
            <Stack.Screen name='ze1iapimp' component={Zol1eip} options={{ headerShown: false }} />
            <Stack.Screen name='zt1iapimp' component={Zol1tip} options={{ headerShown: false }} />
            <Stack.Screen name='c1iapimp' component={Civ1ip} options={{ headerShown: false }} />
            <Stack.Screen name='eco1iapimp' component={Eco1ip} options={{ headerShown: false }} />
            <Stack.Screen name='cm1iapimp' component={Commer1ip} options={{ headerShown: false }} />
            <Stack.Screen name='hy1iapimp' component={His1ip} options={{ headerShown: false }} />
            <Stack.Screen name='ps1iapimp' component={Pol1ip} options={{ headerShown: false }} />




            <Stack.Screen name='t1iapst' component={Tel1st} options={{ headerShown: false }} />
            <Stack.Screen name='h1iapst' component={Hin1st} options={{ headerShown: false }} />
            <Stack.Screen name='e1iapst' component={Eng1st} options={{ headerShown: false }} />
            <Stack.Screen name='s1iapst' component={San1st} options={{ headerShown: false }} />
            <Stack.Screen name='me1aiapst' component={M1aest} options={{ headerShown: false }} />
            <Stack.Screen name='mt1aiapst' component={M1atst} options={{ headerShown: false }} />
            <Stack.Screen name='me1biapst' component={M1best} options={{ headerShown: false }} />
            <Stack.Screen name='mt1biapst' component={M1btst} options={{ headerShown: false }} />
            <Stack.Screen name='pt1iapst' component={Pht1tst} options={{ headerShown: false }} />
            <Stack.Screen name='pe1iapst' component={Pht1est} options={{ headerShown: false }} />
            <Stack.Screen name='be1iapst' component={Bio1est} options={{ headerShown: false }} />
            <Stack.Screen name='bt1iapst' component={Bio1tst} options={{ headerShown: false }} />
            <Stack.Screen name='ce1iapst' component={Che1est} options={{ headerShown: false }} />
            <Stack.Screen name='ct1iapst' component={Che1tst} options={{ headerShown: false }} />
            <Stack.Screen name='ze1iapst' component={Zol1est} options={{ headerShown: false }} />
            <Stack.Screen name='zt1iapst' component={Zol1tst} options={{ headerShown: false }} />
            <Stack.Screen name='c1iapst' component={Civ1st} options={{ headerShown: false }} />
            <Stack.Screen name='eco1iapst' component={Eco1st} options={{ headerShown: false }} />
            <Stack.Screen name='cm1iapst' component={Commer1st} options={{ headerShown: false }} />
            <Stack.Screen name='hy1iapst' component={His1st} options={{ headerShown: false }} />

            <Stack.Screen name='ps1iapst' component={Pol1st} options={{ headerShown: false }} />


            <Stack.Screen name='t1iapprev' component={Tel1} options={{ headerShown: false }} />
            <Stack.Screen name='h1iapprev' component={Hin1} options={{ headerShown: false }} />
            <Stack.Screen name='e1iapprev' component={Eng1} options={{ headerShown: false }} />
            <Stack.Screen name='s1iapprev' component={San1} options={{ headerShown: false }} />
            <Stack.Screen name='me1aiapprev' component={M1ae} options={{ headerShown: false }} />
            <Stack.Screen name='mt1aiapprev' component={M1at} options={{ headerShown: false }} />
            <Stack.Screen name='me1biapprev' component={M1be} options={{ headerShown: false }} />
            <Stack.Screen name='mt1biapprev' component={M1bt} options={{ headerShown: false }} />
            <Stack.Screen name='pt1iapprev' component={Phy1t} options={{ headerShown: false }} />
            <Stack.Screen name='pe1iapprev' component={Phy1e} options={{ headerShown: false }} />
            <Stack.Screen name='be1iapprev' component={Bio1} options={{ headerShown: false }} />
            <Stack.Screen name='bt1iapprev' component={Bio1t} options={{ headerShown: false }} />
            <Stack.Screen name='ce1iapprev' component={Che1e} options={{ headerShown: false }} />
            <Stack.Screen name='ct1iapprev' component={Che1t} options={{ headerShown: false }} />
            <Stack.Screen name='ze1iapprev' component={Zo1e} options={{ headerShown: false }} />
            <Stack.Screen name='zt1iapprev' component={Zo1t} options={{ headerShown: false }} />
            <Stack.Screen name='c1iapprev' component={Civ1} options={{ headerShown: false }} />
            <Stack.Screen name='eco1iapprev' component={Eco1} options={{ headerShown: false }} />
            <Stack.Screen name='cm1iapprev' component={Commer1} options={{ headerShown: false }} />
            <Stack.Screen name='hy1iapprev' component={His1} options={{ headerShown: false }} />

            <Stack.Screen name='ps1iapprev' component={Pol1} options={{ headerShown: false }} />


            <Stack.Screen name='2023Tel1' component={Tel123} options={{ headerShown: false }} />
            <Stack.Screen name='2023Hin1' component={Hin123} options={{ headerShown: false }} />
            <Stack.Screen name='2023Eng1' component={Eng123} options={{ headerShown: false }} />
            <Stack.Screen name='2023San1' component={San123} options={{ headerShown: false }} />
            <Stack.Screen name='2023M1ae' component={M1ae23} options={{ headerShown: false }} />
            <Stack.Screen name='2023M1at' component={M1at23} options={{ headerShown: false }} />
            <Stack.Screen name='2023M1be' component={M1be23} options={{ headerShown: false }} />
            <Stack.Screen name='2023M1bt' component={M1bt23} options={{ headerShown: false }} />
            <Stack.Screen name='2023Phy1t' component={Pht1t23} options={{ headerShown: false }} />
            <Stack.Screen name='2023Phy1e' component={Pht1e23} options={{ headerShown: false }} />
            <Stack.Screen name='2023Be1' component={Bio1e23} options={{ headerShown: false }} />
            <Stack.Screen name='2023Bt1' component={Bio1t23} options={{ headerShown: false }} />
            <Stack.Screen name='2023Che1e' component={Che1e23} options={{ headerShown: false }} />
            <Stack.Screen name='2023Che1t' component={Che1t23} options={{ headerShown: false }} />
            <Stack.Screen name='2023Zole1' component={Zol1e23} options={{ headerShown: false }} />
            <Stack.Screen name='2023Zolt1' component={Zol1t23} options={{ headerShown: false }} />
            <Stack.Screen name='2023Civ1' component={Civ123} options={{ headerShown: false }} />
            <Stack.Screen name='2023Eco1' component={Eco123} options={{ headerShown: false }} />
            <Stack.Screen name='2023Commer1' component={Commer123} options={{ headerShown: false }} />
            <Stack.Screen name='2023His1' component={His123} options={{ headerShown: false }} />
            <Stack.Screen name='2023Pol1' component={Pol123} options={{ headerShown: false }} />


            <Stack.Screen name='2022Tel1' component={Tel122} options={{ headerShown: false }} />
            <Stack.Screen name='2022Hin1' component={Hin122} options={{ headerShown: false }} />
            <Stack.Screen name='2022Eng1' component={Eng122} options={{ headerShown: false }} />
            <Stack.Screen name='2022San1' component={San122} options={{ headerShown: false }} />
            <Stack.Screen name='2022M1ae' component={M1ae22} options={{ headerShown: false }} />
            <Stack.Screen name='2022M1at' component={M1at22} options={{ headerShown: false }} />
            <Stack.Screen name='2022M1be' component={M1be22} options={{ headerShown: false }} />
            <Stack.Screen name='2022M1bt' component={M1bt22} options={{ headerShown: false }} />
            <Stack.Screen name='2022Phy1t' component={Pht1t22} options={{ headerShown: false }} />
            <Stack.Screen name='2022Phy1e' component={Pht1e22} options={{ headerShown: false }} />
            <Stack.Screen name='2022Be1' component={Bio1e22} options={{ headerShown: false }} />
            <Stack.Screen name='2022Bt1' component={Bio1t22} options={{ headerShown: false }} />
            <Stack.Screen name='2022Che1e' component={Che1e22} options={{ headerShown: false }} />
            <Stack.Screen name='2022Che1t' component={Che1t22} options={{ headerShown: false }} />
            <Stack.Screen name='2022Zole1' component={Zol1e22} options={{ headerShown: false }} />
            <Stack.Screen name='2022Zolt1' component={Zol1t22} options={{ headerShown: false }} />
            <Stack.Screen name='2022Civ1' component={Civ122} options={{ headerShown: false }} />
            <Stack.Screen name='2022Eco1' component={Eco122} options={{ headerShown: false }} />
            <Stack.Screen name='2022Commer1' component={Commer122} options={{ headerShown: false }} />
            <Stack.Screen name='2022His1' component={His122} options={{ headerShown: false }} />
            <Stack.Screen name='2022Pol1' component={Pol122} options={{ headerShown: false }} />


            <Stack.Screen name='2021Tel1' component={Tel121} options={{ headerShown: false }} />
            <Stack.Screen name='2021Hin1' component={Hin121} options={{ headerShown: false }} />
            <Stack.Screen name='2021Eng1' component={Eng121} options={{ headerShown: false }} />
            <Stack.Screen name='2021San1' component={San121} options={{ headerShown: false }} />
            <Stack.Screen name='2021M1ae' component={M1ae121} options={{ headerShown: false }} />
            <Stack.Screen name='2021M1at' component={M1at21} options={{ headerShown: false }} />
            <Stack.Screen name='2021M1be' component={M1be21} options={{ headerShown: false }} />
            <Stack.Screen name='2021M1bt' component={M1bt21} options={{ headerShown: false }} />
            <Stack.Screen name='2021Phy1t' component={Pht1t21} options={{ headerShown: false }} />
            <Stack.Screen name='2021Phy1e' component={Pht1e21} options={{ headerShown: false }} />
            <Stack.Screen name='2021Be1' component={Bio1e21} options={{ headerShown: false }} />
            <Stack.Screen name='2021Bt1' component={Bio1t21} options={{ headerShown: false }} />
            <Stack.Screen name='2021Che1e' component={Che1e21} options={{ headerShown: false }} />
            <Stack.Screen name='2021Che1t' component={Che1t21} options={{ headerShown: false }} />
            <Stack.Screen name='2021Zole1' component={Zol1e21} options={{ headerShown: false }} />
            <Stack.Screen name='2021Zolt1' component={Zol1t21} options={{ headerShown: false }} />
            <Stack.Screen name='2021Civ1' component={Civ121} options={{ headerShown: false }} />
            <Stack.Screen name='2021Eco1' component={Eco121} options={{ headerShown: false }} />
            <Stack.Screen name='2021Commer1' component={Commer121} options={{ headerShown: false }} />
            <Stack.Screen name='2021His1' component={His121} options={{ headerShown: false }} />
            <Stack.Screen name='2021Pol1' component={Pol121} options={{ headerShown: false }} />


            <Stack.Screen name='2020Tel1' component={Tel120} options={{ headerShown: false }} />
            <Stack.Screen name='2020Hin1' component={Hin120} options={{ headerShown: false }} />
            <Stack.Screen name='2020Eng1' component={Eng120} options={{ headerShown: false }} />
            <Stack.Screen name='2020San1' component={San120} options={{ headerShown: false }} />
            <Stack.Screen name='2020M1ae' component={M1ae20} options={{ headerShown: false }} />
            <Stack.Screen name='2020M1at' component={M1at20} options={{ headerShown: false }} />
            <Stack.Screen name='2020M1be' component={M1be20} options={{ headerShown: false }} />
            <Stack.Screen name='2020M1bt' component={M1bt20} options={{ headerShown: false }} />
            <Stack.Screen name='2020Phy1t' component={Pht1t20} options={{ headerShown: false }} />
            <Stack.Screen name='2020Phy1e' component={Pht1e20} options={{ headerShown: false }} />
            <Stack.Screen name='2020Be1' component={Bio1e20} options={{ headerShown: false }} />
            <Stack.Screen name='2020Bt1' component={Bio1t20} options={{ headerShown: false }} />
            <Stack.Screen name='2020Che1e' component={Che1e20} options={{ headerShown: false }} />
            <Stack.Screen name='2020Che1t' component={Che1t20} options={{ headerShown: false }} />
            <Stack.Screen name='2020Zole1' component={Zol1e20} options={{ headerShown: false }} />
            <Stack.Screen name='2020Zolt1' component={Zol1t20} options={{ headerShown: false }} />
            <Stack.Screen name='2020Civ1' component={Civ120} options={{ headerShown: false }} />
            <Stack.Screen name='2020Eco1' component={Eco120} options={{ headerShown: false }} />
            <Stack.Screen name='2020Commer1' component={Commer120} options={{ headerShown: false }} />
            <Stack.Screen name='2020His1' component={His120} options={{ headerShown: false }} />
            <Stack.Screen name='2020Pol1' component={Pol120} options={{ headerShown: false }} />



            <Stack.Screen name='2019Tel1' component={Tel119} options={{ headerShown: false }} />
            <Stack.Screen name='2019Hin1' component={Hin119} options={{ headerShown: false }} />
            <Stack.Screen name='2019Eng1' component={Eng119} options={{ headerShown: false }} />
            <Stack.Screen name='2019San1' component={San119} options={{ headerShown: false }} />
            <Stack.Screen name='2019M1ae' component={M1ae19} options={{ headerShown: false }} />
            <Stack.Screen name='2019M1at' component={M1at19} options={{ headerShown: false }} />
            <Stack.Screen name='2019M1be' component={M1be19} options={{ headerShown: false }} />
            <Stack.Screen name='2019M1bt' component={M1bt19} options={{ headerShown: false }} />
            <Stack.Screen name='2019Phy1t' component={Pht1t19} options={{ headerShown: false }} />
            <Stack.Screen name='2019Phy1e' component={Pht1e19} options={{ headerShown: false }} />
            <Stack.Screen name='2019Be1' component={Bio1e19} options={{ headerShown: false }} />
            <Stack.Screen name='2019Bt1' component={Bio1t19} options={{ headerShown: false }} />
            <Stack.Screen name='2019Che1e' component={Che1e19} options={{ headerShown: false }} />
            <Stack.Screen name='2019Che1t' component={Che1t19} options={{ headerShown: false }} />
            <Stack.Screen name='2019Zole1' component={Zol1e19} options={{ headerShown: false }} />
            <Stack.Screen name='2019Zolt1' component={Zol1t19} options={{ headerShown: false }} />
            <Stack.Screen name='2019Civ1' component={Civ119} options={{ headerShown: false }} />
            <Stack.Screen name='2019Eco1' component={Eco119} options={{ headerShown: false }} />
            <Stack.Screen name='2019Commer1' component={Commer119} options={{ headerShown: false }} />
            <Stack.Screen name='2019His1' component={His119} options={{ headerShown: false }} />
            <Stack.Screen name='2019Pol1' component={Pol119} options={{ headerShown: false }} />



            <Stack.Screen name='2018Tel1' component={Tel118} options={{ headerShown: false }} />
            <Stack.Screen name='2018Hin1' component={Hin118} options={{ headerShown: false }} />
            <Stack.Screen name='2018Eng1' component={Eng118} options={{ headerShown: false }} />
            <Stack.Screen name='2018San1' component={San118} options={{ headerShown: false }} />
            <Stack.Screen name='2018M1ae' component={M1ae18} options={{ headerShown: false }} />
            <Stack.Screen name='2018M1at' component={M1at18} options={{ headerShown: false }} />
            <Stack.Screen name='2018M1be' component={M1be18} options={{ headerShown: false }} />
            <Stack.Screen name='2018M1bt' component={M1bt18} options={{ headerShown: false }} />
            <Stack.Screen name='2018Phy1t' component={Pht1t18} options={{ headerShown: false }} />
            <Stack.Screen name='2018Phy1e' component={Pht1e18} options={{ headerShown: false }} />
            <Stack.Screen name='2018Be1' component={Bio1e18} options={{ headerShown: false }} />
            <Stack.Screen name='2018Bt1' component={Bio1t18} options={{ headerShown: false }} />
            <Stack.Screen name='2018Che1e' component={Che1e18} options={{ headerShown: false }} />
            <Stack.Screen name='2018Che1t' component={Che1t18} options={{ headerShown: false }} />
            <Stack.Screen name='2018Zole1' component={Zol1e18} options={{ headerShown: false }} />
            <Stack.Screen name='2018Zolt1' component={Zol1t18} options={{ headerShown: false }} />
            <Stack.Screen name='2018Civ1' component={Civ118} options={{ headerShown: false }} />
            <Stack.Screen name='2018Eco1' component={Eco118} options={{ headerShown: false }} />
            <Stack.Screen name='2018Commer1' component={Commer118} options={{ headerShown: false }} />
            <Stack.Screen name='2018His1' component={His118} options={{ headerShown: false }} />

            <Stack.Screen name='2018Pol1' component={Pol18} options={{ headerShown: false }} />


            <Stack.Screen name='2017Tel1' component={Tel117} options={{ headerShown: false }} />
            <Stack.Screen name='2017Hin1' component={Hin117} options={{ headerShown: false }} />
            <Stack.Screen name='2017Eng1' component={Eng117} options={{ headerShown: false }} />
            <Stack.Screen name='2017San1' component={San117} options={{ headerShown: false }} />
            <Stack.Screen name='2017M1ae' component={M1ae17} options={{ headerShown: false }} />
            <Stack.Screen name='2017M1at' component={M1at17} options={{ headerShown: false }} />
            <Stack.Screen name='2017M1be' component={M1be17} options={{ headerShown: false }} />
            <Stack.Screen name='2017M1bt' component={M1bt17} options={{ headerShown: false }} />
            <Stack.Screen name='2017Phy1t' component={Pht1t17} options={{ headerShown: false }} />
            <Stack.Screen name='2017Phy1e' component={Pht1e17} options={{ headerShown: false }} />
            <Stack.Screen name='2017Be1' component={Bio117} options={{ headerShown: false }} />
            <Stack.Screen name='2017Bt1' component={Bio1t17} options={{ headerShown: false }} />
            <Stack.Screen name='2017Che1e' component={Che1e17} options={{ headerShown: false }} />
            <Stack.Screen name='2017Che1t' component={Che1t17} options={{ headerShown: false }} />
            <Stack.Screen name='2017Zole1' component={Zol1e17} options={{ headerShown: false }} />
            <Stack.Screen name='2017Zolt1' component={Zol1t17} options={{ headerShown: false }} />
            <Stack.Screen name='2017Civ1' component={Civ117} options={{ headerShown: false }} />
            <Stack.Screen name='2017Eco1' component={Eco117} options={{ headerShown: false }} />
            <Stack.Screen name='2017Commer1' component={Commer117} options={{ headerShown: false }} />
            <Stack.Screen name='2017His1' component={His117} options={{ headerShown: false }} />

            <Stack.Screen name='2017Pol1' component={Pol117} options={{ headerShown: false }} />



            <Stack.Screen name='2016Tel1' component={Tel116} options={{ headerShown: false }} />
            <Stack.Screen name='2016Hin1' component={Hin116} options={{ headerShown: false }} />
            <Stack.Screen name='2016Eng1' component={Eng116} options={{ headerShown: false }} />
            <Stack.Screen name='2016San1' component={San116} options={{ headerShown: false }} />
            <Stack.Screen name='2016M1ae' component={M1ae16} options={{ headerShown: false }} />
            <Stack.Screen name='2016M1at' component={M1at16} options={{ headerShown: false }} />
            <Stack.Screen name='2016M1be' component={M1be16} options={{ headerShown: false }} />
            <Stack.Screen name='2016M1bt' component={M1bt16} options={{ headerShown: false }} />
            <Stack.Screen name='2016Phy1t' component={Pht1t16} options={{ headerShown: false }} />
            <Stack.Screen name='2016Phy1e' component={Pht1e16} options={{ headerShown: false }} />
            <Stack.Screen name='2016Be1' component={Bio1e16} options={{ headerShown: false }} />
            <Stack.Screen name='2016Bt1' component={Bio1t16} options={{ headerShown: false }} />
            <Stack.Screen name='2016Che1e' component={Che1e16} options={{ headerShown: false }} />
            <Stack.Screen name='2016Che1t' component={Che1t16} options={{ headerShown: false }} />
            <Stack.Screen name='2016Zole1' component={Zol1e16} options={{ headerShown: false }} />
            <Stack.Screen name='2016Zolt1' component={Zol1t16} options={{ headerShown: false }} />
            <Stack.Screen name='2016Civ1' component={Civ116} options={{ headerShown: false }} />
            <Stack.Screen name='2016Eco1' component={Eco116} options={{ headerShown: false }} />
            <Stack.Screen name='2016Commer1' component={Commer116} options={{ headerShown: false }} />
            <Stack.Screen name='2016His1' component={His116} options={{ headerShown: false }} />

            <Stack.Screen name='2016Pol1' component={Pol116} options={{ headerShown: false }} />


            <Stack.Screen name='2015Tel1' component={Tel115} options={{ headerShown: false }} />
            <Stack.Screen name='2015Hin1' component={Hin115} options={{ headerShown: false }} />
            <Stack.Screen name='2015Eng1' component={Eng115} options={{ headerShown: false }} />
            <Stack.Screen name='2015San1' component={San115} options={{ headerShown: false }} />
            <Stack.Screen name='2015M1ae' component={M1ae15} options={{ headerShown: false }} />
            <Stack.Screen name='2015M1at' component={M1at15} options={{ headerShown: false }} />
            <Stack.Screen name='2015M1be' component={M1be15} options={{ headerShown: false }} />
            <Stack.Screen name='2015M1bt' component={M1bt15} options={{ headerShown: false }} />
            <Stack.Screen name='2015Phy1t' component={Pht1t15} options={{ headerShown: false }} />
            <Stack.Screen name='2015Phy1e' component={Pht1e15} options={{ headerShown: false }} />
            <Stack.Screen name='2015Be1' component={Bio1e15} options={{ headerShown: false }} />
            <Stack.Screen name='2015Bt1' component={Bio1t15} options={{ headerShown: false }} />
            <Stack.Screen name='2015Che1e' component={Che1e15} options={{ headerShown: false }} />
            <Stack.Screen name='2015Che1t' component={Che1t15} options={{ headerShown: false }} />
            <Stack.Screen name='2015Zole1' component={Zol1e15} options={{ headerShown: false }} />
            <Stack.Screen name='2015Zolt1' component={Zol1t15} options={{ headerShown: false }} />
            <Stack.Screen name='2015Civ1' component={Civ115} options={{ headerShown: false }} />
            <Stack.Screen name='2015Eco1' component={Eco115} options={{ headerShown: false }} />
            <Stack.Screen name='2015Commer1' component={Commer115} options={{ headerShown: false }} />
            <Stack.Screen name='2015His1' component={His115} options={{ headerShown: false }} />
            <Stack.Screen name='2015Pol1' component={Pol115} options={{ headerShown: false }} />


            <Stack.Screen name='interimp2' component={Impinter2} options={{ headerShown: false }} />
            <Stack.Screen name='interprev2' component={Interprev2} options={{ headerShown: false }} />
            <Stack.Screen name='interstudy2' component={Interstudy2} options={{ headerShown: false }} />

            <Stack.Screen name='t2iapprev' component={Tel2} options={{ headerShown: false }} />
            <Stack.Screen name='h2iapprev' component={Hin2} options={{ headerShown: false }} />
            <Stack.Screen name='e2iapprev' component={Eng2} options={{ headerShown: false }} />
            <Stack.Screen name='s2iapprev' component={San2} options={{ headerShown: false }} />
            <Stack.Screen name='me2aiapprev' component={M2ae} options={{ headerShown: false }} />
            <Stack.Screen name='mt2aiapprev' component={M2at} options={{ headerShown: false }} />
            <Stack.Screen name='me2biapprev' component={M2be} options={{ headerShown: false }} />
            <Stack.Screen name='mt2biapprev' component={M2bt} options={{ headerShown: false }} />
            <Stack.Screen name='pt2iapprev' component={Phy2t} options={{ headerShown: false }} />
            <Stack.Screen name='pe2iapprev' component={Phy2e} options={{ headerShown: false }} />
            <Stack.Screen name='be2iapprev' component={Bio2e} options={{ headerShown: false }} />
            <Stack.Screen name='bt2iapprev' component={Bio2t} options={{ headerShown: false }} />
            <Stack.Screen name='ce2iapprev' component={Che2e} options={{ headerShown: false }} />
            <Stack.Screen name='ct2iapprev' component={Che2t} options={{ headerShown: false }} />
            <Stack.Screen name='ze2iapprev' component={Zo2e} options={{ headerShown: false }} />
            <Stack.Screen name='zt2iapprev' component={Zo2t} options={{ headerShown: false }} />
            <Stack.Screen name='c2iapprev' component={Civ2} options={{ headerShown: false }} />
            <Stack.Screen name='eco2iapprev' component={Eco2} options={{ headerShown: false }} />
            <Stack.Screen name='cm2iapprev' component={Commer2} options={{ headerShown: false }} />
            <Stack.Screen name='hy2iapprev' component={His2} options={{ headerShown: false }} />

            <Stack.Screen name='ps2iapprev' component={Pol2} options={{ headerShown: false }} />





            <Stack.Screen name='2023Tel2' component={Tel223} options={{ headerShown: false }} />
            <Stack.Screen name='2023Hin2' component={Hin223} options={{ headerShown: false }} />
            <Stack.Screen name='2023Eng2' component={Eng223} options={{ headerShown: false }} />
            <Stack.Screen name='2023San2' component={San223} options={{ headerShown: false }} />
            <Stack.Screen name='2023M2ae' component={M2ae23} options={{ headerShown: false }} />
            <Stack.Screen name='2023M2at' component={M2at23} options={{ headerShown: false }} />
            <Stack.Screen name='2023M2be' component={M2be23} options={{ headerShown: false }} />
            <Stack.Screen name='2023M2bt' component={M2bt23} options={{ headerShown: false }} />
            <Stack.Screen name='2023Phy2t' component={Pht2t23} options={{ headerShown: false }} />
            <Stack.Screen name='2023Phy2e' component={Pht2e23} options={{ headerShown: false }} />
            <Stack.Screen name='2023Be2' component={Bio2e23} options={{ headerShown: false }} />
            <Stack.Screen name='2023Bt2' component={Bio2t23} options={{ headerShown: false }} />
            <Stack.Screen name='2023Che2e' component={Che2e23} options={{ headerShown: false }} />
            <Stack.Screen name='2023Che2t' component={Che2t23} options={{ headerShown: false }} />
            <Stack.Screen name='2023Zole2' component={Zol2e23} options={{ headerShown: false }} />
            <Stack.Screen name='2023Zolt2' component={Zol2t23} options={{ headerShown: false }} />
            <Stack.Screen name='2023Civ2' component={Civ223} options={{ headerShown: false }} />
            <Stack.Screen name='2023Eco2' component={Eco223} options={{ headerShown: false }} />
            <Stack.Screen name='2023Commer2' component={Commer223} options={{ headerShown: false }} />
            <Stack.Screen name='2023His2' component={His223} options={{ headerShown: false }} />

            <Stack.Screen name='2023Pol2' component={Pol223} options={{ headerShown: false }} />


            <Stack.Screen name='2022Tel2' component={Tel222} options={{ headerShown: false }} />
            <Stack.Screen name='2022Hin2' component={Hin222} options={{ headerShown: false }} />
            <Stack.Screen name='2022Eng2' component={Eng222} options={{ headerShown: false }} />
            <Stack.Screen name='2022San2' component={San222} options={{ headerShown: false }} />
            <Stack.Screen name='2022M2ae' component={M2ae22} options={{ headerShown: false }} />
            <Stack.Screen name='2022M2at' component={M2at22} options={{ headerShown: false }} />
            <Stack.Screen name='2022M2be' component={M2be22} options={{ headerShown: false }} />
            <Stack.Screen name='2022M2bt' component={M2bt22} options={{ headerShown: false }} />
            <Stack.Screen name='2022Phy2t' component={Pht2t22} options={{ headerShown: false }} />
            <Stack.Screen name='2022Phy2e' component={Pht2e22} options={{ headerShown: false }} />
            <Stack.Screen name='2022Be2' component={Bio2e22} options={{ headerShown: false }} />
            <Stack.Screen name='2022Bt2' component={Bio2t22} options={{ headerShown: false }} />
            <Stack.Screen name='2022Che2e' component={Che2e22} options={{ headerShown: false }} />
            <Stack.Screen name='2022Che2t' component={Che2t22} options={{ headerShown: false }} />
            <Stack.Screen name='2022Zole2' component={Zol2e22} options={{ headerShown: false }} />
            <Stack.Screen name='2022Zolt2' component={Zol2t22} options={{ headerShown: false }} />
            <Stack.Screen name='2022Civ2' component={Civ222} options={{ headerShown: false }} />
            <Stack.Screen name='2022Eco2' component={Eco222} options={{ headerShown: false }} />
            <Stack.Screen name='2022Commer2' component={Commer222} options={{ headerShown: false }} />
            <Stack.Screen name='2022His2' component={His222} options={{ headerShown: false }} />

            <Stack.Screen name='2022Pol2' component={Pol222} options={{ headerShown: false }} />



            <Stack.Screen name='2021Tel2' component={Tel221} options={{ headerShown: false }} />
            <Stack.Screen name='2021Hin2' component={Hin221} options={{ headerShown: false }} />
            <Stack.Screen name='2021Eng2' component={Eng221} options={{ headerShown: false }} />
            <Stack.Screen name='2021San2' component={San221} options={{ headerShown: false }} />
            <Stack.Screen name='2021M2ae' component={M2ae21} options={{ headerShown: false }} />
            <Stack.Screen name='2021M2at' component={M2at21} options={{ headerShown: false }} />
            <Stack.Screen name='2021M2be' component={M2be21} options={{ headerShown: false }} />
            <Stack.Screen name='2021M2bt' component={M2bt21} options={{ headerShown: false }} />
            <Stack.Screen name='2021Phy2t' component={Pht2t21} options={{ headerShown: false }} />
            <Stack.Screen name='2021Phy2e' component={Pht2e21} options={{ headerShown: false }} />
            <Stack.Screen name='2021Be2' component={Bio2e21} options={{ headerShown: false }} />
            <Stack.Screen name='2021Bt2' component={Bio2t21} options={{ headerShown: false }} />
            <Stack.Screen name='2021Che2e' component={Che2e21} options={{ headerShown: false }} />
            <Stack.Screen name='2021Che2t' component={Che2t21} options={{ headerShown: false }} />
            <Stack.Screen name='2021Zole2' component={Zol2e21} options={{ headerShown: false }} />
            <Stack.Screen name='2021Zolt2' component={Zol2t21} options={{ headerShown: false }} />
            <Stack.Screen name='2021Civ2' component={Civ221} options={{ headerShown: false }} />
            <Stack.Screen name='2021Eco2' component={Eco221} options={{ headerShown: false }} />
            <Stack.Screen name='2021Commer2' component={Commer221} options={{ headerShown: false }} />
            <Stack.Screen name='2021His2' component={His221} options={{ headerShown: false }} />

            <Stack.Screen name='2021Pol2' component={Pol221} options={{ headerShown: false }} />


            <Stack.Screen name='2020Tel2' component={Tel220} options={{ headerShown: false }} />
            <Stack.Screen name='2020Hin2' component={Hin220} options={{ headerShown: false }} />
            <Stack.Screen name='2020Eng2' component={Eng220} options={{ headerShown: false }} />
            <Stack.Screen name='2020San2' component={San220} options={{ headerShown: false }} />
            <Stack.Screen name='2020M2ae' component={M2ae20} options={{ headerShown: false }} />
            <Stack.Screen name='2020M2at' component={M2at20} options={{ headerShown: false }} />
            <Stack.Screen name='2020M2be' component={M2be20} options={{ headerShown: false }} />
            <Stack.Screen name='2020M2bt' component={M2bt20} options={{ headerShown: false }} />
            <Stack.Screen name='2020Phy2t' component={Pht2t20} options={{ headerShown: false }} />
            <Stack.Screen name='2020Phy2e' component={Pht2e20} options={{ headerShown: false }} />
            <Stack.Screen name='2020Be2' component={Bio2e20} options={{ headerShown: false }} />
            <Stack.Screen name='2020Bt2' component={Bio2t20} options={{ headerShown: false }} />
            <Stack.Screen name='2020Che2e' component={Che2e20} options={{ headerShown: false }} />
            <Stack.Screen name='2020Che2t' component={Che2t20} options={{ headerShown: false }} />
            <Stack.Screen name='2020Zole2' component={Zol2e20} options={{ headerShown: false }} />
            <Stack.Screen name='2020Zolt2' component={Zol2t20} options={{ headerShown: false }} />
            <Stack.Screen name='2020Civ2' component={Civ220} options={{ headerShown: false }} />
            <Stack.Screen name='2020Commer2' component={Commer220} options={{ headerShown: false }} />
            <Stack.Screen name='2020His2' component={His220} options={{ headerShown: false }} />
            <Stack.Screen name='2020Pol2' component={Pol220} options={{ headerShown: false }} />
            <Stack.Screen name='2020Eco2' component={Eco220} options={{ headerShown: false }} />

            <Stack.Screen name='2019Tel2' component={Tel219} options={{ headerShown: false }} />
            <Stack.Screen name='2019Hin2' component={Hin219} options={{ headerShown: false }} />
            <Stack.Screen name='2019Eng2' component={Eng219} options={{ headerShown: false }} />
            <Stack.Screen name='2019San2' component={San219} options={{ headerShown: false }} />
            <Stack.Screen name='2019M2ae' component={M2ae19} options={{ headerShown: false }} />
            <Stack.Screen name='2019M2at' component={M2at19} options={{ headerShown: false }} />
            <Stack.Screen name='2019M2be' component={M2be19} options={{ headerShown: false }} />
            <Stack.Screen name='2019M2bt' component={M2bt19} options={{ headerShown: false }} />
            <Stack.Screen name='2019Phy2t' component={Pht2t19} options={{ headerShown: false }} />
            <Stack.Screen name='2019Phy2e' component={Pht2e19} options={{ headerShown: false }} />
            <Stack.Screen name='2019Be2' component={Bio2e19} options={{ headerShown: false }} />
            <Stack.Screen name='2019Bt2' component={Bio2t19} options={{ headerShown: false }} />
            <Stack.Screen name='2019Che2e' component={Che2e19} options={{ headerShown: false }} />
            <Stack.Screen name='2019Che2t' component={Che2t19} options={{ headerShown: false }} />
            <Stack.Screen name='2019Zole2' component={Zol2e19} options={{ headerShown: false }} />
            <Stack.Screen name='2019Zolt2' component={Zol2t19} options={{ headerShown: false }} />
            <Stack.Screen name='2019Civ2' component={Civ219} options={{ headerShown: false }} />
            <Stack.Screen name='2019Eco2' component={Eco219} options={{ headerShown: false }} />
            <Stack.Screen name='2019Commer2' component={Commer219} options={{ headerShown: false }} />
            <Stack.Screen name='2019His2' component={His219} options={{ headerShown: false }} />
            <Stack.Screen name='2019Pol2' component={Pol219} options={{ headerShown: false }} />








            <Stack.Screen name='2018Tel2' component={Tel218} options={{ headerShown: false }} />
            <Stack.Screen name='2018Hin2' component={Hin218} options={{ headerShown: false }} />
            <Stack.Screen name='2018Eng2' component={Eng218} options={{ headerShown: false }} />
            <Stack.Screen name='2018San2' component={San218} options={{ headerShown: false }} />
            <Stack.Screen name='2018M2ae' component={M2ae18} options={{ headerShown: false }} />
            <Stack.Screen name='2018M2at' component={M2at18} options={{ headerShown: false }} />
            <Stack.Screen name='2018M2be' component={M2be18} options={{ headerShown: false }} />
            <Stack.Screen name='2018M2bt' component={M2bt18} options={{ headerShown: false }} />
            <Stack.Screen name='2018Phy2t' component={Pht2t18} options={{ headerShown: false }} />
            <Stack.Screen name='2018Phy2e' component={Pht2e18} options={{ headerShown: false }} />
            <Stack.Screen name='2018Be2' component={Bio2e18} options={{ headerShown: false }} />
            <Stack.Screen name='2018Bt2' component={Bio2t18} options={{ headerShown: false }} />
            <Stack.Screen name='2018Che2e' component={Che2e18} options={{ headerShown: false }} />
            <Stack.Screen name='2018Che2t' component={Che2t18} options={{ headerShown: false }} />
            <Stack.Screen name='2018Zole2' component={Zol2e18} options={{ headerShown: false }} />
            <Stack.Screen name='2018Zolt2' component={Zol2t18} options={{ headerShown: false }} />
            <Stack.Screen name='2018Civ2' component={Civ218} options={{ headerShown: false }} />
            <Stack.Screen name='2018Eco2' component={Eco218} options={{ headerShown: false }} />
            <Stack.Screen name='2018Commer2' component={Commer218} options={{ headerShown: false }} />
            <Stack.Screen name='2018His2' component={His218} options={{ headerShown: false }} />
            <Stack.Screen name='2018Pol2' component={Pol218} options={{ headerShown: false }} />


            <Stack.Screen name='2017Tel2' component={Tel217} options={{ headerShown: false }} />
            <Stack.Screen name='2017Hin2' component={Hin217} options={{ headerShown: false }} />
            <Stack.Screen name='2017Eng2' component={Eng217} options={{ headerShown: false }} />
            <Stack.Screen name='2017San2' component={San217} options={{ headerShown: false }} />
            <Stack.Screen name='2017M2ae' component={M2ae17} options={{ headerShown: false }} />
            <Stack.Screen name='2017M2at' component={M2at17} options={{ headerShown: false }} />
            <Stack.Screen name='2017M2be' component={M2be17} options={{ headerShown: false }} />
            <Stack.Screen name='2017M2bt' component={M2bt17} options={{ headerShown: false }} />
            <Stack.Screen name='2017Phy2t' component={Pht2t17} options={{ headerShown: false }} />
            <Stack.Screen name='2017Phy2e' component={Pht2e17} options={{ headerShown: false }} />
            <Stack.Screen name='2017Be2' component={Bio2e17} options={{ headerShown: false }} />
            <Stack.Screen name='2017Bt2' component={Bio2t17} options={{ headerShown: false }} />
            <Stack.Screen name='2017Che2e' component={Che2e17} options={{ headerShown: false }} />
            <Stack.Screen name='2017Che2t' component={Che2t17} options={{ headerShown: false }} />
            <Stack.Screen name='2017Zole2' component={Zol2e17} options={{ headerShown: false }} />
            <Stack.Screen name='2017Zolt2' component={Zol2t17} options={{ headerShown: false }} />
            <Stack.Screen name='2017Civ2' component={Civ217} options={{ headerShown: false }} />
            <Stack.Screen name='2017Eco2' component={Eco217} options={{ headerShown: false }} />
            <Stack.Screen name='2017Commer2' component={Commer217} options={{ headerShown: false }} />
            <Stack.Screen name='2017His2' component={His217} options={{ headerShown: false }} />
            <Stack.Screen name='2017Pol2' component={Pol217} options={{ headerShown: false }} />



            <Stack.Screen name='2016Tel2' component={Tel216} options={{ headerShown: false }} />
            <Stack.Screen name='2016Hin2' component={Hin216} options={{ headerShown: false }} />
            <Stack.Screen name='2016Eng2' component={Eng216} options={{ headerShown: false }} />
            <Stack.Screen name='2016San2' component={San216} options={{ headerShown: false }} />
            <Stack.Screen name='2016M2ae' component={M2ae16} options={{ headerShown: false }} />
            <Stack.Screen name='2016M2at' component={M2at16} options={{ headerShown: false }} />
            <Stack.Screen name='2016M2be' component={M2be16} options={{ headerShown: false }} />
            <Stack.Screen name='2016M2bt' component={M2bt16} options={{ headerShown: false }} />
            <Stack.Screen name='2016Phy2t' component={Pht2t16} options={{ headerShown: false }} />
            <Stack.Screen name='2016Phy2e' component={Pht2e16} options={{ headerShown: false }} />
            <Stack.Screen name='2016Be2' component={Bio2e16} options={{ headerShown: false }} />
            <Stack.Screen name='2016Bt2' component={Bio2t16} options={{ headerShown: false }} />
            <Stack.Screen name='2016Che2e' component={Che2e16} options={{ headerShown: false }} />
            <Stack.Screen name='2016Che2t' component={Che2t16} options={{ headerShown: false }} />
            <Stack.Screen name='2016Zole2' component={Zol2e16} options={{ headerShown: false }} />
            <Stack.Screen name='2016Zolt2' component={Zol2t16} options={{ headerShown: false }} />
            <Stack.Screen name='2016Civ2' component={Civ216} options={{ headerShown: false }} />
            <Stack.Screen name='2016Eco2' component={Eco216} options={{ headerShown: false }} />
            <Stack.Screen name='2016Commer2' component={Commer216} options={{ headerShown: false }} />
            <Stack.Screen name='2016His2' component={His216} options={{ headerShown: false }} />
            <Stack.Screen name='2016Pol2' component={Pol216} options={{ headerShown: false }} />



            <Stack.Screen name='2015Tel2' component={Tel215} options={{ headerShown: false }} />
            <Stack.Screen name='2015Hin2' component={Hin215} options={{ headerShown: false }} />
            <Stack.Screen name='2015Eng2' component={Eng215} options={{ headerShown: false }} />
            <Stack.Screen name='2015San2' component={San215} options={{ headerShown: false }} />
            <Stack.Screen name='2015M2ae' component={M2ae15} options={{ headerShown: false }} />
            <Stack.Screen name='2015M2at' component={M2at15} options={{ headerShown: false }} />
            <Stack.Screen name='2015M2be' component={M2be15} options={{ headerShown: false }} />
            <Stack.Screen name='2015M2bt' component={M2bt15} options={{ headerShown: false }} />
            <Stack.Screen name='2015Phy2t' component={Pht2t15} options={{ headerShown: false }} />
            <Stack.Screen name='2015Phy2e' component={Pht2e15} options={{ headerShown: false }} />
            <Stack.Screen name='2015Be2' component={Bio2e15} options={{ headerShown: false }} />
            <Stack.Screen name='2015Bt2' component={Bio2t15} options={{ headerShown: false }} />
            <Stack.Screen name='2015Che2e' component={Che2e15} options={{ headerShown: false }} />
            <Stack.Screen name='2015Che2t' component={Che2t15} options={{ headerShown: false }} />
            <Stack.Screen name='2015Zole2' component={Zol2e15} options={{ headerShown: false }} />
            <Stack.Screen name='2015Zolt2' component={Zol2t15} options={{ headerShown: false }} />
            <Stack.Screen name='2015Civ2' component={Civ215} options={{ headerShown: false }} />
            <Stack.Screen name='2015Eco2' component={Eco215} options={{ headerShown: false }} />
            <Stack.Screen name='2015Commer2' component={Commer215} options={{ headerShown: false }} />
            <Stack.Screen name='2015His2' component={His215} options={{ headerShown: false }} />
            <Stack.Screen name='2015Pol2' component={Pol215} options={{ headerShown: false }} />



            <Stack.Screen name='t2iapimp' component={Tel2ip} options={{ headerShown: false }} />
            <Stack.Screen name='h2iapimp' component={Hin2ip} options={{ headerShown: false }} />
            <Stack.Screen name='e2iapimp' component={Eng2ip} options={{ headerShown: false }} />
            <Stack.Screen name='s2iapimp' component={San2ip} options={{ headerShown: false }} />
            <Stack.Screen name='me2aiapimp' component={M2aeip} options={{ headerShown: false }} />
            <Stack.Screen name='mt2aiapimp' component={M2atip} options={{ headerShown: false }} />
            <Stack.Screen name='me2biapimp' component={M2beip} options={{ headerShown: false }} />
            <Stack.Screen name='mt2biapimp' component={M2btip} options={{ headerShown: false }} />
            <Stack.Screen name='pt2iapimp' component={Pht2tip} options={{ headerShown: false }} />
            <Stack.Screen name='pe2iapimp' component={Pht2eip} options={{ headerShown: false }} />
            <Stack.Screen name='be2iapimp' component={Bio2eip} options={{ headerShown: false }} />
            <Stack.Screen name='bt2iapimp' component={Bio2tip} options={{ headerShown: false }} />
            <Stack.Screen name='ce2iapimp' component={Che2eip} options={{ headerShown: false }} />
            <Stack.Screen name='ct2iapimp' component={Che2tip} options={{ headerShown: false }} />
            <Stack.Screen name='ze2iapimp' component={Zol2eip} options={{ headerShown: false }} />
            <Stack.Screen name='zt2iapimp' component={Zol2tip} options={{ headerShown: false }} />
            <Stack.Screen name='c2iapimp' component={Civ2ip} options={{ headerShown: false }} />
            <Stack.Screen name='eco2iapimp' component={Eco2ip} options={{ headerShown: false }} />
            <Stack.Screen name='cm2iapimp' component={Commer2ip} options={{ headerShown: false }} />
            <Stack.Screen name='hy2iapimp' component={His2ip} options={{ headerShown: false }} />

            <Stack.Screen name='ps2iapimp' component={Pol2ip} options={{ headerShown: false }} />


            <Stack.Screen name='t2iapst' component={Tel2st} options={{ headerShown: false }} />
            <Stack.Screen name='h2iapst' component={Hin2st} options={{ headerShown: false }} />
            <Stack.Screen name='e2iapst' component={Eng2st} options={{ headerShown: false }} />
            <Stack.Screen name='s2iapst' component={San2st} options={{ headerShown: false }} />
            <Stack.Screen name='me2aiapst' component={M2aest} options={{ headerShown: false }} />
            <Stack.Screen name='mt2aiapst' component={M2atst} options={{ headerShown: false }} />
            <Stack.Screen name='me2biapst' component={M2best} options={{ headerShown: false }} />
            <Stack.Screen name='mt2biapst' component={M2btst} options={{ headerShown: false }} />
            <Stack.Screen name='pt2iapst' component={Pht2tst} options={{ headerShown: false }} />
            <Stack.Screen name='pe2iapst' component={Pht2est} options={{ headerShown: false }} />
            <Stack.Screen name='be2iapst' component={Bio2est} options={{ headerShown: false }} />
            <Stack.Screen name='bt2iapst' component={Bio2tst} options={{ headerShown: false }} />
            <Stack.Screen name='ce2iapst' component={Che2est} options={{ headerShown: false }} />
            <Stack.Screen name='ct2iapst' component={Che2tst} options={{ headerShown: false }} />
            <Stack.Screen name='ze2iapst' component={Zol2est} options={{ headerShown: false }} />
            <Stack.Screen name='zt2iapst' component={Zol2tst} options={{ headerShown: false }} />
            <Stack.Screen name='c2iapst' component={Civ2st} options={{ headerShown: false }} />
            <Stack.Screen name='eco2iapst' component={Eco2st} options={{ headerShown: false }} />
            <Stack.Screen name='cm2iapst' component={Commer2st} options={{ headerShown: false }} />
            <Stack.Screen name='hy2iapst' component={His2st} options={{ headerShown: false }} />

            <Stack.Screen name='ps2iapst' component={Pol2st} options={{ headerShown: false }} />



            <Stack.Screen name='polycet1' component={Polycet} options={{ headerShown: false }} />


            <Stack.Screen name='tspoly' component={Tspoly} options={{ headerShown: false }} />
            <Stack.Screen name='appoly' component={Appoly} options={{ headerShown: false }} />
            <Stack.Screen name='tsprev' component={Tsprev} options={{ headerShown: false }} />
            <Stack.Screen name='polymock' component={Mocktest} options={{ headerShown: false }} />
            <Stack.Screen name='polypre' component={Quiz} options={{ headerShown: false }} />

            <Stack.Screen name='mocktest Result' component={Mtres} options={{ headerShown: false }} />

            <Stack.Screen name='poly2016' component={P2016} options={{ headerShown: false }} />
            <Stack.Screen name='poly2017' component={P2017} options={{ headerShown: false }} />
            <Stack.Screen name='poly2018' component={P2018} options={{ headerShown: false }} />
            <Stack.Screen name='poly2019' component={P2019} options={{ headerShown: false }} />
            <Stack.Screen name='poly2020' component={P2020} options={{ headerShown: false }} />
            <Stack.Screen name='poly2021' component={P2021} options={{ headerShown: false }} />
            <Stack.Screen name='poly2022' component={P2022} options={{ headerShown: false }} />

            <Stack.Screen name='poly2016t' component={P2016t} options={{ headerShown: false }} />
            <Stack.Screen name='poly2017t' component={P2017t} options={{ headerShown: false }} />
            <Stack.Screen name='poly2018t' component={P2018t} options={{ headerShown: false }} />
            <Stack.Screen name='poly2019t' component={P2019t} options={{ headerShown: false }} />
            <Stack.Screen name='poly2020t' component={P2020t} options={{ headerShown: false }} />
            <Stack.Screen name='poly2021t' component={P2021t} options={{ headerShown: false }} />
            <Stack.Screen name='poly2022t' component={P2022t} options={{ headerShown: false }} />

            <Stack.Screen name='tsimp' component={Tsimp} options={{ headerShown: false }} />
            <Stack.Screen name='tsplan' component={Tsplan} options={{ headerShown: false }} />

            <Stack.Screen name='tssm' component={Tsstudy} options={{ headerShown: false }} />
            <Stack.Screen name='tsbp' component={Tsblue} options={{ headerShown: false }} />
            <Stack.Screen name='apblueprint' component={Apblue} options={{ headerShown: false }} />
            <Stack.Screen name='tstp' component={Tsmodel} options={{ headerShown: false }} />

            <Stack.Screen name='telugu ts' component={Tpfts} options={{ headerShown: false }} />
            <Stack.Screen name='hindi ts' component={Hpfts} options={{ headerShown: false }} />
            <Stack.Screen name='english ts' component={Epfts} options={{ headerShown: false }} />
            <Stack.Screen name='maths tm ts' component={Mtpfts} options={{ headerShown: false }} />
            <Stack.Screen name='maths em ts' component={Mepfts} options={{ headerShown: false }} />
            <Stack.Screen name='physics tm ts' component={Stpfts} options={{ headerShown: false }} />
            <Stack.Screen name='physics em ts' component={Sepfts} options={{ headerShown: false }} />
            <Stack.Screen name='biology tm ts' component={Ntpfts} options={{ headerShown: false }} />
            <Stack.Screen name='biology em ts' component={Nepfts} options={{ headerShown: false }} />
            <Stack.Screen name='social em ts' component={Ssepfts} options={{ headerShown: false }} />
            <Stack.Screen name='social tm ts' component={Sstpfts} options={{ headerShown: false }} />


            <Stack.Screen name='Telugu ImpTs' component={Ttsimp} options={{ headerShown: false }} />
            <Stack.Screen name='Hindi ImpTs' component={Htsimp} options={{ headerShown: false }} />
            <Stack.Screen name='English ImpTs' component={Etsimp} options={{ headerShown: false }} />
            <Stack.Screen name='Mathstm ImpTs' component={Mttsimp} options={{ headerShown: false }} />
            <Stack.Screen name='Mathsem ImpTs' component={Metsimp} options={{ headerShown: false }} />
            <Stack.Screen name='Physicstm ImpTs' component={Pttsimp} options={{ headerShown: false }} />
            <Stack.Screen name='Physicsem ImpTs' component={Petsimp} options={{ headerShown: false }} />
            <Stack.Screen name='Biologytm ImpTs' component={Nttsimp} options={{ headerShown: false }} />
            <Stack.Screen name='Biologyem ImpTs' component={Netsimp} options={{ headerShown: false }} />
            <Stack.Screen name='Socialem ImpTs' component={Setsimp} options={{ headerShown: false }} />
            <Stack.Screen name='Socialtm ImpTs' component={Sttsimp} options={{ headerShown: false }} />

            <Stack.Screen name='telugu tsb' component={Ttsb} options={{ headerShown: false }} />
            <Stack.Screen name='hindi tsb' component={Htsb} options={{ headerShown: false }} />
            <Stack.Screen name='english tsb' component={Etsb} options={{ headerShown: false }} />
            <Stack.Screen name='maths tm tsb' component={Mttsb} options={{ headerShown: false }} />
            <Stack.Screen name='maths em tsb' component={Metsb} options={{ headerShown: false }} />
            <Stack.Screen name='physics tm tsb' component={Pttsb} options={{ headerShown: false }} />
            <Stack.Screen name='physics em tsb' component={Petsb} options={{ headerShown: false }} />
            <Stack.Screen name='biology tm tsb' component={Nttsb} options={{ headerShown: false }} />
            <Stack.Screen name='biology em tsb' component={Netsb} options={{ headerShown: false }} />
            <Stack.Screen name='social em tsb' component={Setsb} options={{ headerShown: false }} />
            <Stack.Screen name='social tm tsb' component={Sttsb} options={{ headerShown: false }} />

            <Stack.Screen name='telugu apb' component={Tapb} options={{ headerShown: false }} />
            <Stack.Screen name='hindi apb' component={Hapb} options={{ headerShown: false }} />
            <Stack.Screen name='english apb' component={Eapb} options={{ headerShown: false }} />
            <Stack.Screen name='maths tm apb' component={Mtapb} options={{ headerShown: false }} />
            <Stack.Screen name='maths em apb' component={Meapb} options={{ headerShown: false }} />
            <Stack.Screen name='physics tm apb' component={Ptapb} options={{ headerShown: false }} />
            <Stack.Screen name='physics em apb' component={Peapb} options={{ headerShown: false }} />
            <Stack.Screen name='biology tm apb' component={Ntapb} options={{ headerShown: false }} />
            <Stack.Screen name='biology em apb' component={Neapb} options={{ headerShown: false }} />
            <Stack.Screen name='social em apb' component={Seapb} options={{ headerShown: false }} />
            <Stack.Screen name='social tm apb' component={Stapb} options={{ headerShown: false }} />


            <Stack.Screen name='telugu tsm' component={Ttssm} options={{ headerShown: false }} />
            <Stack.Screen name='hindi tsm' component={Htssm} options={{ headerShown: false }} />
            <Stack.Screen name='english tsm' component={Etsism} options={{ headerShown: false }} />
            <Stack.Screen name='maths tm tsm' component={Mttssm} options={{ headerShown: false }} />
            <Stack.Screen name='maths em tsm' component={Metssm} options={{ headerShown: false }} />
            <Stack.Screen name='physics tm tsm' component={Pttssm} options={{ headerShown: false }} />
            <Stack.Screen name='physics em tsm' component={Petssm} options={{ headerShown: false }} />
            <Stack.Screen name='biology tm tsm' component={Nttssm} options={{ headerShown: false }} />
            <Stack.Screen name='biology em tsm' component={Netssm} options={{ headerShown: false }} />
            <Stack.Screen name='social em tsm' component={Setssm} options={{ headerShown: false }} />
            <Stack.Screen name='social tm tsm' component={Sttssm} options={{ headerShown: false }} />

            <Stack.Screen name='telugu tsp' component={Teltspre} options={{ headerShown: false }} />
            <Stack.Screen name='hindi tsp' component={Hintspre} options={{ headerShown: false }} />
            <Stack.Screen name='english tsp' component={Engtspre} options={{ headerShown: false }} />
            <Stack.Screen name='maths tm tsp' component={Mttspre} options={{ headerShown: false }} />
            <Stack.Screen name='maths em tsp' component={Metspre} options={{ headerShown: false }} />
            <Stack.Screen name='physics tm tsp' component={Pttspre} options={{ headerShown: false }} />
            <Stack.Screen name='physics em tsp' component={Petspre} options={{ headerShown: false }} />
            <Stack.Screen name='biology tm tsp' component={Nttspre} options={{ headerShown: false }} />
            <Stack.Screen name='biology em tsp' component={Netspre} options={{ headerShown: false }} />
            <Stack.Screen name='social em tsp' component={Setspre} options={{ headerShown: false }} />
            <Stack.Screen name='social tm tsp' component={Sttspre} options={{ headerShown: false }} />


            <Stack.Screen name='class6to9' component={classes} options={{ headerShown: false }} />

            <Stack.Screen name='6thclass imp' component={Class6imp} options={{ headerShown: false }} />
            <Stack.Screen name='6thclass tb' component={Class6tb} options={{ headerShown: false }} />
            <Stack.Screen name='6thclass exam' component={Class6exam} options={{ headerShown: false }} />
            <Stack.Screen name='6thclass study' component={Class6study} options={{ headerShown: false }} />

            <Stack.Screen name='7thclass imp' component={Class7imp} options={{ headerShown: false }} />
            <Stack.Screen name='7thclass tb' component={Class7tb} options={{ headerShown: false }} />
            <Stack.Screen name='7thclass exam' component={Class7exam} options={{ headerShown: false }} />
            <Stack.Screen name='7thclass study' component={Class7study} options={{ headerShown: false }} />

            <Stack.Screen name='8thclass imp' component={Class8imp} options={{ headerShown: false }} />
            <Stack.Screen name='8thclass tb' component={Class8tb} options={{ headerShown: false }} />
            <Stack.Screen name='8thclass exam' component={Class8exam} options={{ headerShown: false }} />
            <Stack.Screen name='8thclass study' component={Class8study} options={{ headerShown: false }} />

            <Stack.Screen name='9thclass imp' component={Class9imp} options={{ headerShown: false }} />
            <Stack.Screen name='9thclass tb' component={Class9tb} options={{ headerShown: false }} />
            <Stack.Screen name='9thclass exam' component={Class9exam} options={{ headerShown: false }} />
            <Stack.Screen name='9thclass study' component={Class9study} options={{ headerShown: false }} />


            <Stack.Screen name='telugu imp6' component={Tel6imp} options={{ headerShown: false }} />
            <Stack.Screen name="hindi imp6" component={Hin6imp} options={{ headerShown: false }} />
            <Stack.Screen name="english imp6" component={Eng6imp} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm imp6" component={Mt6imp} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem imp6" component={Me6imp} options={{ headerShown: false }} />
            <Stack.Screen name="nsem imp6" component={Nse6imp} options={{ headerShown: false }} />
            <Stack.Screen name="nstm imp6" component={Nst6imp} options={{ headerShown: false }} />
            <Stack.Screen name="socialem imp6" component={Soce6imp} options={{ headerShown: false }} />
            <Stack.Screen name="socialtm imp6" component={Soct6imp} options={{ headerShown: false }} />

            <Stack.Screen name='telugu tb6' component={Tel6tb} options={{ headerShown: false }} />
            <Stack.Screen name="hindi tb6" component={Hin6tb} options={{ headerShown: false }} />
            <Stack.Screen name="english tb6" component={Eng6tb} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm tb6" component={M26tb} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem tb6" component={M16tb} options={{ headerShown: false }} />
            <Stack.Screen name="nsem tb6" component={Ns16tb} options={{ headerShown: false }} />
            <Stack.Screen name="nstm tb6" component={Ns26tb} options={{ headerShown: false }} />
            <Stack.Screen name="socialem tb6" component={Soc16tb} options={{ headerShown: false }} />
            <Stack.Screen name="socialtm tb6" component={Soc26tb} options={{ headerShown: false }} />


            <Stack.Screen name='telugu tb7' component={Tel7tb} options={{ headerShown: false }} />
            <Stack.Screen name="hindi tb7" component={Hin7tb} options={{ headerShown: false }} />
            <Stack.Screen name="english tb7" component={Eng7tb} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm tb7" component={M27tb} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem tb7" component={M17tb} options={{ headerShown: false }} />
            <Stack.Screen name="nsem tb7" component={Ns17tb} options={{ headerShown: false }} />
            <Stack.Screen name="nstm tb7" component={Ns27tb} options={{ headerShown: false }} />
            <Stack.Screen name="socialem tb7" component={Soc17tb} options={{ headerShown: false }} />
            <Stack.Screen name="socialtm tb7" component={Soc27tb} options={{ headerShown: false }} />



            <Stack.Screen name='telugu tb8' component={Tel8tb} options={{ headerShown: false }} />
            <Stack.Screen name="hindi tb8" component={Hin8tb} options={{ headerShown: false }} />
            <Stack.Screen name="english tb8" component={Eng8tb} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm tb8" component={M28tb} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem tb8" component={M18tb} options={{ headerShown: false }} />
            <Stack.Screen name="nsem tb8" component={Ns18tb} options={{ headerShown: false }} />
            <Stack.Screen name="nstm tb8" component={Ns28tb} options={{ headerShown: false }} />
            <Stack.Screen name="psem tb8" component={Ps18tb} options={{ headerShown: false }} />
            <Stack.Screen name="pstm tb8" component={Ps28tb} options={{ headerShown: false }} />
            <Stack.Screen name="socialem tb8" component={Soc18tb} options={{ headerShown: false }} />
            <Stack.Screen name="socialtm tb8" component={Soc28tb} options={{ headerShown: false }} />
            <Stack.Screen name="social3m tb8" component={Soc38tb} options={{ headerShown: false }} />


            <Stack.Screen name='telugu tb9' component={Tel9tb} options={{ headerShown: false }} />
            <Stack.Screen name="hindi tb9" component={Hin9tb} options={{ headerShown: false }} />
            <Stack.Screen name="english tb9" component={Eng9tb} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm tb9" component={M29tb} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem tb9" component={M19tb} options={{ headerShown: false }} />
            <Stack.Screen name="nsem tb9" component={Ns19tb} options={{ headerShown: false }} />
            <Stack.Screen name="nstm tb9" component={Ns29tb} options={{ headerShown: false }} />
            <Stack.Screen name="psem tb9" component={Ps19tb} options={{ headerShown: false }} />
            <Stack.Screen name="pstm tb9" component={Ps29tb} options={{ headerShown: false }} />
            <Stack.Screen name="socialem tb9" component={Soc19tb} options={{ headerShown: false }} />
            <Stack.Screen name="socialtm tb9" component={Soc29tb} options={{ headerShown: false }} />
            <Stack.Screen name="social3m tb9" component={Soc39tb} options={{ headerShown: false }} />

            <Stack.Screen name='telugu imp7' component={Tel7imp} options={{ headerShown: false }} />
            <Stack.Screen name="hindi imp7" component={Hin7imp} options={{ headerShown: false }} />
            <Stack.Screen name="english imp7" component={Eng7imp} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm imp7" component={Mt7imp} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem imp7" component={Me7imp} options={{ headerShown: false }} />
            <Stack.Screen name="nsem imp7" component={Nse7imp} options={{ headerShown: false }} />
            <Stack.Screen name="nstm imp7" component={Nst7imp} options={{ headerShown: false }} />
            <Stack.Screen name="socialem imp7" component={Soce7imp} options={{ headerShown: false }} />
            <Stack.Screen name="socialtm imp7" component={Soct7imp} options={{ headerShown: false }} />

            <Stack.Screen name='telugu imp8' component={Tel8imp} options={{ headerShown: false }} />
            <Stack.Screen name="hindi imp8" component={Hin8imp} options={{ headerShown: false }} />
            <Stack.Screen name="english imp8" component={Eng8imp} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm imp8" component={Mt8imp} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem imp8" component={Me8imp} options={{ headerShown: false }} />
            <Stack.Screen name="nsem imp8" component={Nse8imp} options={{ headerShown: false }} />
            <Stack.Screen name="nstm imp8" component={Nst8imp} options={{ headerShown: false }} />
            <Stack.Screen name="socialem imp8" component={Soce8imp} options={{ headerShown: false }} />
            <Stack.Screen name="socialtm imp8" component={Soct8imp} options={{ headerShown: false }} />

            <Stack.Screen name='telugu imp9' component={Tel9imp} options={{ headerShown: false }} />
            <Stack.Screen name="hindi imp9" component={Hin9imp} options={{ headerShown: false }} />
            <Stack.Screen name="english imp9" component={Eng9imp} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm imp9" component={Mt9imp} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem imp9" component={Me9imp} options={{ headerShown: false }} />
            <Stack.Screen name="nsem imp9" component={Nse9imp} options={{ headerShown: false }} />
            <Stack.Screen name="nstm imp9" component={Nst9imp} options={{ headerShown: false }} />
            <Stack.Screen name="socialem imp9" component={Soce9imp} options={{ headerShown: false }} />
            <Stack.Screen name="socialtm imp9" component={Soct9imp} options={{ headerShown: false }} />

            <Stack.Screen name='telugu syl6' component={Syl6} options={{ headerShown: false }} />
            <Stack.Screen name='telugu syl7' component={Syl7} options={{ headerShown: false }} />
            <Stack.Screen name='telugu syl8' component={Syl8} options={{ headerShown: false }} />
            <Stack.Screen name='telugu syl9' component={Syl9} options={{ headerShown: false }} />


            <Stack.Screen name='telugu study6' component={Tel6study} options={{ headerShown: false }} />
            <Stack.Screen name="hindi study6" component={Hin6study} options={{ headerShown: false }} />
            <Stack.Screen name="english study6" component={Eng6study} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm study6" component={Mt6study} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem study6" component={Me6study} options={{ headerShown: false }} />
            <Stack.Screen name="nsem study6" component={Nse6study} options={{ headerShown: false }} />
            <Stack.Screen name="nstm study6" component={Nst6study} options={{ headerShown: false }} />
            <Stack.Screen name="socialem study6" component={Soce6study} options={{ headerShown: false }} />
            <Stack.Screen name="socialtm study6" component={Soct6study} options={{ headerShown: false }} />

            <Stack.Screen name='telugu study7' component={Tel7study} options={{ headerShown: false }} />
            <Stack.Screen name="hindi study7" component={Hin7study} options={{ headerShown: false }} />
            <Stack.Screen name="english study7" component={Eng7study} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm study7" component={Mt7study} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem study7" component={Me7study} options={{ headerShown: false }} />
            <Stack.Screen name="nsem study7" component={Nse7study} options={{ headerShown: false }} />
            <Stack.Screen name="nstm study7" component={Nst7study} options={{ headerShown: false }} />
            <Stack.Screen name="socialem study7" component={Soce7study} options={{ headerShown: false }} />
            <Stack.Screen name="socialtm study7" component={Soct7study} options={{ headerShown: false }} />


            <Stack.Screen name='telugu study8' component={Tel8study} options={{ headerShown: false }} />
            <Stack.Screen name="hindi study8" component={Hin8study} options={{ headerShown: false }} />
            <Stack.Screen name="english study8" component={Eng8study} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm study8" component={Mt8study} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem study8" component={Me8study} options={{ headerShown: false }} />
            <Stack.Screen name="nsem study8" component={Nse8study} options={{ headerShown: false }} />
            <Stack.Screen name="nstm study8" component={Nst8study} options={{ headerShown: false }} />
            <Stack.Screen name="socialem study8" component={Soce8study} options={{ headerShown: false }} />
            <Stack.Screen name="socialtm study8" component={Soct8study} options={{ headerShown: false }} />

            <Stack.Screen name='telugu study9' component={Tel9study} options={{ headerShown: false }} />
            <Stack.Screen name="hindi study9" component={Hin9study} options={{ headerShown: false }} />
            <Stack.Screen name="english study9" component={Eng9study} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm study9" component={Mt9study} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem study9" component={Me9study} options={{ headerShown: false }} />
            <Stack.Screen name="nsem study9" component={Nse9study} options={{ headerShown: false }} />
            <Stack.Screen name="nstm study9" component={Nst9study} options={{ headerShown: false }} />
            <Stack.Screen name="socialem study9" component={Soce9study} options={{ headerShown: false }} />
            <Stack.Screen name="socialtm study9" component={Soct9study} options={{ headerShown: false }} />


            <Stack.Screen name='telugu exam6' component={Tel6exam} options={{ headerShown: false }} />
            <Stack.Screen name="hindi exam6" component={Hin6exam} options={{ headerShown: false }} />
            <Stack.Screen name="english exam6" component={Eng6exam} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm exam6" component={Mt6exam} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem exam6" component={Me6exam} options={{ headerShown: false }} />
            <Stack.Screen name="nsem exam6" component={NSe6exam} options={{ headerShown: false }} />
            <Stack.Screen name="nstm exam6" component={NSt6exam} options={{ headerShown: false }} />
            <Stack.Screen name="socialem exam6" component={Soce6exam} options={{ headerShown: false }} />
            <Stack.Screen name="socialtm exam6" component={Soct6exam} options={{ headerShown: false }} />

            <Stack.Screen name='telugu exam7' component={Tel7exam} options={{ headerShown: false }} />
            <Stack.Screen name="hindi exam7" component={Hin7exam} options={{ headerShown: false }} />
            <Stack.Screen name="english exam7" component={Eng7exam} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm exam7" component={Mt7exam} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem exam7" component={Me7exam} options={{ headerShown: false }} />
            <Stack.Screen name="nsem exam7" component={NSe7exam} options={{ headerShown: false }} />
            <Stack.Screen name="nstm exam7" component={NSt7exam} options={{ headerShown: false }} />
            <Stack.Screen name="socialem exam7" component={Soce7exam} options={{ headerShown: false }} />
            <Stack.Screen name="socialtm exam7" component={Soct7exam} options={{ headerShown: false }} />

            <Stack.Screen name='telugu exam8' component={Tel8exam} options={{ headerShown: false }} />
            <Stack.Screen name="hindi exam8" component={Hin8exam} options={{ headerShown: false }} />
            <Stack.Screen name="english exam8" component={Eng8exam} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm exam8" component={Mt8exam} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem exam8" component={Me8exam} options={{ headerShown: false }} />
            <Stack.Screen name="nsem exam8" component={NSe8exam} options={{ headerShown: false }} />
            <Stack.Screen name="nstm exam8" component={NSt8exam} options={{ headerShown: false }} />
            <Stack.Screen name="socialem exam8" component={Soce8exam} options={{ headerShown: false }} />
            <Stack.Screen name="socialtm exam8" component={Soct8exam} options={{ headerShown: false }} />

            <Stack.Screen name='telugu exam9' component={Tel9exam} options={{ headerShown: false }} />
            <Stack.Screen name="hindi exam9" component={Hin9exam} options={{ headerShown: false }} />
            <Stack.Screen name="english exam9" component={Eng9exam} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm exam9" component={Mt9exam} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem exam9" component={Me9exam} options={{ headerShown: false }} />
            <Stack.Screen name="nsem exam9" component={NSe9exam} options={{ headerShown: false }} />
            <Stack.Screen name="nstm exam9" component={NSt9exam} options={{ headerShown: false }} />
            <Stack.Screen name="socialem exam9" component={Soce9exam} options={{ headerShown: false }} />
            <Stack.Screen name="socialtm exam9" component={Soct9exam} options={{ headerShown: false }} />

            <Stack.Screen name='Question' component={TodayQues} options={{ headerShown: false }} />
            <Stack.Screen name='Question6' component={Quiz6} options={{ headerShown: false }} />
            <Stack.Screen name='Question7' component={Quiz7} options={{ headerShown: false }} />
            <Stack.Screen name='Question8' component={Quiz8} options={{ headerShown: false }} />
            <Stack.Screen name='Question9' component={Quiz9} options={{ headerShown: false }} />
            <Stack.Screen name='Question11' component={Quiz11} options={{ headerShown: false }} />
            <Stack.Screen name='Question12' component={Quiz12} options={{ headerShown: false }} />


            <Stack.Screen name='emcet11' component={Emcet11} options={{ headerShown: false }} />
            <Stack.Screen name='emcet12' component={Emcet12} options={{ headerShown: false }} />


            <Stack.Screen name='Daily Result' component={DailyResult} options={{ headerShown: false }} />
            <Stack.Screen name='Result6' component={Qres6} options={{ headerShown: false }} />
            <Stack.Screen name='Result7' component={Qres7} options={{ headerShown: false }} />
            <Stack.Screen name='Result8' component={Qres8} options={{ headerShown: false }} />
            <Stack.Screen name='Result9' component={Qres9} options={{ headerShown: false }} />
            <Stack.Screen name='Result11' component={Qres11} options={{ headerShown: false }} />
            <Stack.Screen name='Result12' component={Qres12} options={{ headerShown: false }} />

            <Stack.Screen name='Today Answer' component={Todayans} options={{ headerShown: false }} />

            <Stack.Screen name='6thToday Answer' component={qans6} options={{ headerShown: false }} />
            <Stack.Screen name='7thToday Answer' component={qans7} options={{ headerShown: false }} />
            <Stack.Screen name='8thToday Answer' component={qans8} options={{ headerShown: false }} />
            <Stack.Screen name='9thToday Answer' component={qans9} options={{ headerShown: false }} />
            <Stack.Screen name='11thToday Answer' component={qans11} options={{ headerShown: false }} />
            <Stack.Screen name='12thToday Answer' component={qans12} options={{ headerShown: false }} />

            <Stack.Screen name='Weekly Questions' component={WeekQues} options={{ headerShown: false }} />
            <Stack.Screen name='Weekly Result' component={WeekResult} options={{ headerShown: false }} />
            <Stack.Screen name='Weekly Answer' component={Weekans} options={{ headerShown: false }} />

            <Stack.Screen name='FA1' component={Fa1} options={{ headerShown: false }} />
            <Stack.Screen name='FA2' component={Fa2} options={{ headerShown: false }} />
            <Stack.Screen name='FA3' component={Fa3} options={{ headerShown: false }} />
            <Stack.Screen name='FA4' component={Fa4} options={{ headerShown: false }} />
            <Stack.Screen name='SA1' component={Sa1} options={{ headerShown: false }} />
            <Stack.Screen name='sylabus SA1' component={Syl} options={{ headerShown: false }} />
            <Stack.Screen name='sylabus FA3' component={Sylfa3} options={{ headerShown: false }} />
            <Stack.Screen name='sylabus FA1' component={Sylfa1} options={{ headerShown: false }} />
            <Stack.Screen name='sylabus FA2' component={Sylfa2} options={{ headerShown: false }} />
            <Stack.Screen name='sylabus FA4' component={Sylfa4} options={{ headerShown: false }} />
            <Stack.Screen name='ssc' component={Ssc} options={{ headerShown: false }} />

            <Stack.Screen name='telugu FA1' component={Telfa1} options={{ headerShown: false }} />

            <Stack.Screen name="hindi FA1" component={Hinfa1} options={{ headerShown: false }} />
            <Stack.Screen name="english FA1" component={Engfa1} options={{ headerShown: false }} />
            <Stack.Screen name="maths em FA1" component={Matefa1} options={{ headerShown: false }} />
            <Stack.Screen name="maths tm FA1" component={Mattfa1} options={{ headerShown: false }} />
            <Stack.Screen name="physics em FA1" component={Sciefa1} options={{ headerShown: false }} />
            <Stack.Screen name="physics tm FA1" component={Scitfa1} options={{ headerShown: false }} />

            <Stack.Screen name="social em FA1" component={Socefa1} options={{ headerShown: false }} />
            <Stack.Screen name="social tm FA1" component={Soctfa1} options={{ headerShown: false }} />


            <Stack.Screen name='telugu FA3' component={Telfa3} options={{ headerShown: false }} />

            <Stack.Screen name="hindi FA3" component={Hinfa3} options={{ headerShown: false }} />
            <Stack.Screen name="english FA3" component={Engfa3} options={{ headerShown: false }} />
            <Stack.Screen name="maths em FA3" component={Matefa3} options={{ headerShown: false }} />
            <Stack.Screen name="maths tm FA3" component={Mattfa3} options={{ headerShown: false }} />
            <Stack.Screen name="physics em FA3" component={Sciefa3} options={{ headerShown: false }} />
            <Stack.Screen name="physics tm FA3" component={Scitfa3} options={{ headerShown: false }} />

            <Stack.Screen name="social em FA3" component={Socefa3} options={{ headerShown: false }} />
            <Stack.Screen name="social tm FA3" component={Soctfa3} options={{ headerShown: false }} />

            <Stack.Screen name='telugu FA4' component={Telfa4} options={{ headerShown: false }} />

            <Stack.Screen name="hindi FA4" component={Hinfa4} options={{ headerShown: false }} />
            <Stack.Screen name="english FA4" component={Engfa4} options={{ headerShown: false }} />
            <Stack.Screen name="maths em FA4" component={Matefa4} options={{ headerShown: false }} />
            <Stack.Screen name="maths tm FA4" component={Mattfa4} options={{ headerShown: false }} />
            <Stack.Screen name="physics em FA4" component={Sciefa4} options={{ headerShown: false }} />
            <Stack.Screen name="physics tm FA4" component={Scitfa4} options={{ headerShown: false }} />

            <Stack.Screen name="social em FA4" component={Socefa4} options={{ headerShown: false }} />
            <Stack.Screen name="social tm FA4" component={Soctfa4} options={{ headerShown: false }} />


            <Stack.Screen name='telugu FA2' component={Telfa2} options={{ headerShown: false }} />

            <Stack.Screen name="hindi FA2" component={Hinfa2} options={{ headerShown: false }} />
            <Stack.Screen name="english FA2" component={Engfa2} options={{ headerShown: false }} />
            <Stack.Screen name="maths em FA2" component={Matefa2} options={{ headerShown: false }} />
            <Stack.Screen name="maths tm FA2" component={Mattfa2} options={{ headerShown: false }} />
            <Stack.Screen name="physics em FA2" component={Sciefa2} options={{ headerShown: false }} />
            <Stack.Screen name="physics tm FA2" component={Scitfa2} options={{ headerShown: false }} />

            <Stack.Screen name="social em FA2" component={Socefa2} options={{ headerShown: false }} />
            <Stack.Screen name="social tm FA2" component={Soctfa2} options={{ headerShown: false }} />

            <Stack.Screen name='telugu SA1' component={Telsa1} options={{ headerShown: false }} />

            <Stack.Screen name="hindi SA1" component={Hinsa1} options={{ headerShown: false }} />
            <Stack.Screen name="english SA1" component={Engsa1} options={{ headerShown: false }} />
            <Stack.Screen name="maths em SA1" component={Matesa1} options={{ headerShown: false }} />
            <Stack.Screen name="maths tm SA1" component={Mattsa1} options={{ headerShown: false }} />
            <Stack.Screen name="physics em SA1" component={Sciesa1} options={{ headerShown: false }} />
            <Stack.Screen name="physics tm SA1" component={Scitsa1} options={{ headerShown: false }} />

            <Stack.Screen name="social em SA1" component={Socesa1} options={{ headerShown: false }} />
            <Stack.Screen name="social tm SA1" component={Soctsa1} options={{ headerShown: false }} />

            <Stack.Screen name="Textbook" component={Textbook} options={{ headerShown: false }} />

            <Stack.Screen name="telugu textbook" component={Telt} options={{ headerShown: false }} />
            <Stack.Screen name="hindi textbook" component={Hindit} options={{ headerShown: false }} />
            <Stack.Screen name="english textbook" component={Engt} options={{ headerShown: false }} />
            <Stack.Screen name="maths em textbook" component={Mathset} options={{ headerShown: false }} />
            <Stack.Screen name="maths tm textbook" component={Mathtt} options={{ headerShown: false }} />
            <Stack.Screen name="physics em textbook" component={Phyet} options={{ headerShown: false }} />
            <Stack.Screen name="physics tm textbook" component={Phytt} options={{ headerShown: false }} />
            <Stack.Screen name="biology em textbook" component={Nset} options={{ headerShown: false }} />
            <Stack.Screen name="biology tm textbook" component={Nstt} options={{ headerShown: false }} />
            <Stack.Screen name="social em textbook" component={Societ} options={{ headerShown: false }} />
            <Stack.Screen name="social tm textbook" component={Socitt} options={{ headerShown: false }} />

            <Stack.Screen name="telugu ssc2023" component={Telpre} options={{ headerShown: false }} />
            <Stack.Screen name="hindi ssc2023" component={Hinpre} options={{ headerShown: false }} />
            <Stack.Screen name="english ssc2023" component={Engpre} options={{ headerShown: false }} />
            <Stack.Screen name="maths em ssc2023" component={Mepre} options={{ headerShown: false }} />
            <Stack.Screen name="maths tm ssc2023" component={Mtpre} options={{ headerShown: false }} />
            <Stack.Screen name="physics em ssc2023" component={Pepre} options={{ headerShown: false }} />
            <Stack.Screen name="physics tm ssc2023" component={Ptpre} options={{ headerShown: false }} />
            <Stack.Screen name="biology em ssc2023" component={Nepre} options={{ headerShown: false }} />
            <Stack.Screen name="biology tm ssc2023" component={Ntpre} options={{ headerShown: false }} />
            <Stack.Screen name="social em ssc2023" component={Sepre} options={{ headerShown: false }} />
            <Stack.Screen name="social tm ssc2023" component={Stpre} options={{ headerShown: false }} />

            <Stack.Screen name='Importent'
                component={Importe} options={{ headerShown: false }} />


            <Stack.Screen name="Telugu Imp" component={Teli} options={{ headerShown: false }} />
            <Stack.Screen name="Hindi Imp" component={Himp} options={{ headerShown: false }} />
            <Stack.Screen name="English Imp" component={Eimp} options={{ headerShown: false }} />
            <Stack.Screen name="Mathstm Imp" component={Matti} options={{ headerShown: false }} />
            <Stack.Screen name="Mathsem Imp" component={Matei} options={{ headerShown: false }} />
            <Stack.Screen name="Biologytm Imp" component={Nsti} options={{ headerShown: false }} />
            <Stack.Screen name="Physicstm Imp" component={Phyti} options={{ headerShown: false }} />
            <Stack.Screen name="Biologyem Imp" component={Nsei} options={{ headerShown: false }} />
            <Stack.Screen name="Physicsem Imp" component={Phyei} options={{ headerShown: false }} />
            <Stack.Screen name="Socialem Imp" component={Socei} options={{ headerShown: false }} />
            <Stack.Screen name="Socialtm Imp" component={Socti} options={{ headerShown: false }} />


            <Stack.Screen name="telugu grammer" component={Telgra} options={{ headerShown: false }} />
            <Stack.Screen name="telugu imp" component={Telimp} options={{ headerShown: false }} />
            <Stack.Screen name="telugu poems" component={Telpo} options={{ headerShown: false }} />
            <Stack.Screen name="telugu material" component={Telmat} options={{ headerShown: false }} />

            <Stack.Screen name="mathsem material" component={Mema} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem 1m" component={Me1m} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem 2m" component={Me2m} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem 4m" component={Me4m} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem 8m" component={Me8m} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem bits" component={Mebi} options={{ headerShown: false }} />

            <Stack.Screen name="mathstm 1m" component={Mt1m} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm 2m" component={Mt2m} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm 4m" component={Mt4m} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm 8m" component={Mt8m} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm bits" component={Mtbi} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm material" component={Mtma} options={{ headerShown: false }} />

            <Stack.Screen name="phytm 1m" component={Phyt1m} options={{ headerShown: false }} />
            <Stack.Screen name="phytm 2m" component={Phyt2m} options={{ headerShown: false }} />
            <Stack.Screen name="phytm 4m" component={Phyt4m} options={{ headerShown: false }} />
            <Stack.Screen name="phytm 8m" component={Phyt8m} options={{ headerShown: false }} />
            <Stack.Screen name="phytm bits" component={Phytbi} options={{ headerShown: false }} />
            <Stack.Screen name="phytm material" component={Phytma} options={{ headerShown: false }} />



            <Stack.Screen name="phyem 1m" component={Phye1m} options={{ headerShown: false }} />
            <Stack.Screen name="phyem 2m" component={Phye2m} options={{ headerShown: false }} />
            <Stack.Screen name="phyem 4m" component={Phye4m} options={{ headerShown: false }} />
            <Stack.Screen name="phyem 8m" component={Phye8m} options={{ headerShown: false }} />
            <Stack.Screen name="phyem bits" component={Phyebi} options={{ headerShown: false }} />
            <Stack.Screen name="phyem material" component={Phyema} options={{ headerShown: false }} />

            <Stack.Screen name="nsem 1m" component={Nse1m} options={{ headerShown: false }} />
            <Stack.Screen name="nsem 2m" component={Nse2m} options={{ headerShown: false }} />
            <Stack.Screen name="nsem 4m" component={Nse4m} options={{ headerShown: false }} />
            <Stack.Screen name="nsem 8m" component={Nse8m} options={{ headerShown: false }} />
            <Stack.Screen name="nsem bits" component={Nsebi} options={{ headerShown: false }} />
            <Stack.Screen name="nsem material" component={Nsema} options={{ headerShown: false }} />


            <Stack.Screen name="nstm 1m" component={Nst1m} options={{ headerShown: false }} />
            <Stack.Screen name="nstm 2m" component={Nst2m} options={{ headerShown: false }} />
            <Stack.Screen name="nstm 4m" component={Nst4m} options={{ headerShown: false }} />
            <Stack.Screen name="nstm 8m" component={Nst8m} options={{ headerShown: false }} />
            <Stack.Screen name="nstm bits" component={Nstbi} options={{ headerShown: false }} />
            <Stack.Screen name="nstm material" component={Nstma} options={{ headerShown: false }} />

            <Stack.Screen name="soctm 1m" component={Soct1m} options={{ headerShown: false }} />
            <Stack.Screen name="soctm 2m" component={Soct2m} options={{ headerShown: false }} />
            <Stack.Screen name="soctm 4m" component={Soct4m} options={{ headerShown: false }} />
            <Stack.Screen name="soctm 8m" component={Soct8m} options={{ headerShown: false }} />
            <Stack.Screen name="soctm bits" component={Soctbi} options={{ headerShown: false }} />
            <Stack.Screen name="soctm material" component={Soctma} options={{ headerShown: false }} />

            <Stack.Screen name="socem 1m" component={Soce1m} options={{ headerShown: false }} />
            <Stack.Screen name="socem 2m" component={Soce2m} options={{ headerShown: false }} />
            <Stack.Screen name="socem 4m" component={Soce4m} options={{ headerShown: false }} />
            <Stack.Screen name="socem 8m" component={Soce8m} options={{ headerShown: false }} />
            <Stack.Screen name="socem bits" component={Socebi} options={{ headerShown: false }} />
            <Stack.Screen name="socem material" component={Socema} options={{ headerShown: false }} />

            <Stack.Screen name="IIItp" component={Iiit} options={{ headerShown: false }} />
            <Stack.Screen name="im" component={Mathsiiit} options={{ headerShown: false }} />
            <Stack.Screen name="ip" component={Phyiiit} options={{ headerShown: false }} />
            <Stack.Screen name="syllabus" component={Syllabusi} options={{ headerShown: false }} />
            <Stack.Screen name="phyics material" component={Materialphy} options={{ headerShown: false }} />
            <Stack.Screen name="ib" component={Materialbio} options={{ headerShown: false }} />
            <Stack.Screen name="maths Material" component={Materialmaths} options={{ headerShown: false }} />

            <Stack.Screen name='testpapers'
                component={Testpapers} options={{ headerShown: false }} />
            <Stack.Screen name="telugu testpapers" component={Teltp} options={{ headerShown: false }} />
            <Stack.Screen name="hindi testpapers" component={Hintp} options={{ headerShown: false }} />
            <Stack.Screen name="english testpapers" component={Engtp} options={{ headerShown: false }} />
            <Stack.Screen name="maths em testpapers" component={Matetp} options={{ headerShown: false }} />
            <Stack.Screen name="maths tm testpapers" component={Matttp} options={{ headerShown: false }} />
            <Stack.Screen name="physics em testpapers" component={Phyetp} options={{ headerShown: false }} />
            <Stack.Screen name="physics tm testpapers" component={Phyttp} options={{ headerShown: false }} />
            <Stack.Screen name="social em testpapers" component={Socetp} options={{ headerShown: false }} />
            <Stack.Screen name="social tm testpapers" component={Socttp} options={{ headerShown: false }} />


            <Stack.Screen name="telugu tp1" component={Ttp1} options={{ headerShown: false }} />
            <Stack.Screen name="telugu tp2" component={Ttp2} options={{ headerShown: false }} />
            <Stack.Screen name="telugu tp3" component={Ttp3} options={{ headerShown: false }} />
            <Stack.Screen name="telugu tp4" component={Ttp4} options={{ headerShown: false }} />
            <Stack.Screen name="hindi tp1" component={Htp1} options={{ headerShown: false }} />
            <Stack.Screen name="hindi tp2" component={Htp2} options={{ headerShown: false }} />
            <Stack.Screen name="hindi tp3" component={Htp3} options={{ headerShown: false }} />
            <Stack.Screen name="hindi tp4" component={Htp4} options={{ headerShown: false }} />
            <Stack.Screen name="english tp1" component={Etp1} options={{ headerShown: false }} />
            <Stack.Screen name="english tp2" component={Etp2} options={{ headerShown: false }} />
            <Stack.Screen name="english tp3" component={Etp3} options={{ headerShown: false }} />
            <Stack.Screen name="english tp4" component={Etp4} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem tp1" component={Metp1} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem tp2" component={Metp2} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem tp3" component={Metp3} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem tp4" component={Metp4} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm tp1" component={Mttp1} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm tp2" component={Mttp2} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm tp3" component={Mttp3} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm tp4" component={Mttp4} options={{ headerShown: false }} />
            <Stack.Screen name="phytm tp1" component={Sttp1} options={{ headerShown: false }} />
            <Stack.Screen name="phytm tp2" component={Sttp2} options={{ headerShown: false }} />
            <Stack.Screen name="phytm tp3" component={Sttp3} options={{ headerShown: false }} />
            <Stack.Screen name="phytm tp4" component={Sttp4} options={{ headerShown: false }} />
            <Stack.Screen name="phyem tp1" component={Setp1} options={{ headerShown: false }} />
            <Stack.Screen name="phyem tp2" component={Setp2} options={{ headerShown: false }} />
            <Stack.Screen name="phyem tp3" component={Setp3} options={{ headerShown: false }} />
            <Stack.Screen name="phyem tp4" component={Setp4} options={{ headerShown: false }} />

            <Stack.Screen name="socialem tp1" component={Ssetp1} options={{ headerShown: false }} />

            <Stack.Screen name="socialem tp2" component={Ssetp2} options={{ headerShown: false }} />

            <Stack.Screen name="socialem tp3" component={Ssetp3} options={{ headerShown: false }} />

            <Stack.Screen name="socialem tp4" component={Ssetp4} options={{ headerShown: false }} />

            <Stack.Screen name="socialtm tp1" component={Ssttp1} options={{ headerShown: false }} />
            <Stack.Screen name="socialtm tp2" component={Ssttp2} options={{ headerShown: false }} />
            <Stack.Screen name="socialtm tp3" component={Ssttp3} options={{ headerShown: false }} />
            <Stack.Screen name="socialtm tp4" component={Ssttp4} options={{ headerShown: false }} />





            <Stack.Screen name="telugu testpapersTS" component={Teltpts} options={{ headerShown: false }} />
            <Stack.Screen name="hindi testpapersTS" component={Hintpts} options={{ headerShown: false }} />
            <Stack.Screen name="english testpapersTS" component={Engtpts} options={{ headerShown: false }} />
            <Stack.Screen name="maths em testpapersTS" component={Matetpts} options={{ headerShown: false }} />
            <Stack.Screen name="maths tm testpapersTS" component={Matttpts} options={{ headerShown: false }} />
            <Stack.Screen name="physics em testpapersTS" component={Phyetpts} options={{ headerShown: false }} />
            <Stack.Screen name="physics tm testpapersTS" component={Phyttpts} options={{ headerShown: false }} />
            <Stack.Screen name="ns em testpapersTS" component={Netpts} options={{ headerShown: false }} />
            <Stack.Screen name="ns tm testpapersTS" component={Nttpts} options={{ headerShown: false }} />
            <Stack.Screen name="social em testpapersTS" component={Socetpts} options={{ headerShown: false }} />
            <Stack.Screen name="social tm testpapersTS" component={Socttpts} options={{ headerShown: false }} />

            <Stack.Screen name="telugu ts tp1" component={Ttpts1} options={{ headerShown: false }} />
            <Stack.Screen name="telugu ts tp2" component={Ttpts2} options={{ headerShown: false }} />
            <Stack.Screen name="telugu ts tp3" component={Ttpts3} options={{ headerShown: false }} />
            <Stack.Screen name="telugu ts tp4" component={Ttpts4} options={{ headerShown: false }} />
            <Stack.Screen name="hindi ts tp1" component={Htpts1} options={{ headerShown: false }} />
            <Stack.Screen name="hindi ts tp2" component={Htpts2} options={{ headerShown: false }} />
            <Stack.Screen name="hindi ts tp3" component={Htpts3} options={{ headerShown: false }} />
            <Stack.Screen name="hindi ts tp4" component={Htpts4} options={{ headerShown: false }} />
            <Stack.Screen name="english ts tp1" component={Etpts1} options={{ headerShown: false }} />
            <Stack.Screen name="english ts tp2" component={Etpts2} options={{ headerShown: false }} />
            <Stack.Screen name="english ts tp3" component={Etpts3} options={{ headerShown: false }} />
            <Stack.Screen name="english ts tp4" component={Etpts4} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem ts tp1" component={Metpts1} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem ts tp2" component={Metpts2} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem ts tp3" component={Metpts3} options={{ headerShown: false }} />
            <Stack.Screen name="mathsem ts tp4" component={Metpts4} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm ts tp1" component={Mttpts1} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm ts tp2" component={Mttpts2} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm ts tp3" component={Mttpts3} options={{ headerShown: false }} />
            <Stack.Screen name="mathstm ts tp4" component={Mttpts4} options={{ headerShown: false }} />

            <Stack.Screen name="phytm ts tp1" component={Sttpts1} options={{ headerShown: false }} />
            <Stack.Screen name="phytm ts tp2" component={Sttpts2} options={{ headerShown: false }} />
            <Stack.Screen name="phytm ts tp3" component={Sttpts3} options={{ headerShown: false }} />
            <Stack.Screen name="phytm ts tp4" component={Sttpts4} options={{ headerShown: false }} />
            <Stack.Screen name="phyem ts tp1" component={Setpts1} options={{ headerShown: false }} />
            <Stack.Screen name="phyem ts tp2" component={Setpts2} options={{ headerShown: false }} />
            <Stack.Screen name="phyem ts tp3" component={Setpts3} options={{ headerShown: false }} />
            <Stack.Screen name="phyem ts tp4" component={Setpts4} options={{ headerShown: false }} />

            <Stack.Screen name="nstm ts tp1" component={Nttpts1} options={{ headerShown: false }} />
            <Stack.Screen name="nstm ts tp2" component={Nttpts2} options={{ headerShown: false }} />
            <Stack.Screen name="nstm ts tp3" component={Nttpts3} options={{ headerShown: false }} />
            <Stack.Screen name="nstm ts tp4" component={Nttpts4} options={{ headerShown: false }} />
            <Stack.Screen name="nsem ts tp1" component={Netpts1} options={{ headerShown: false }} />
            <Stack.Screen name="nsem ts tp2" component={Netpts2} options={{ headerShown: false }} />
            <Stack.Screen name="nsem ts tp3" component={Netpts3} options={{ headerShown: false }} />
            <Stack.Screen name="nsem ts tp4" component={Netpts4} options={{ headerShown: false }} />

            <Stack.Screen name="socialem ts tp1" component={Ssetpts1} options={{ headerShown: false }} />

            <Stack.Screen name="socialem ts tp2" component={Ssetpts2} options={{ headerShown: false }} />

            <Stack.Screen name="socialem ts tp3" component={Ssetpts3} options={{ headerShown: false }} />

            <Stack.Screen name="socialem ts tp4" component={Ssetpts4} options={{ headerShown: false }} />

            <Stack.Screen name="socialtm ts tp1" component={Ssttpts1} options={{ headerShown: false }} />
            <Stack.Screen name="socialtm ts tp2" component={Ssttpts2} options={{ headerShown: false }} />
            <Stack.Screen name="socialtm ts tp3" component={Ssttpts3} options={{ headerShown: false }} />
            <Stack.Screen name="socialtm ts tp4" component={Ssttpts4} options={{ headerShown: false }} />


            <Stack.Screen name='prefinal'
                component={Prefinal} options={{ headerShown: false }} />

            <Stack.Screen name="telugu prefinal" component={Tpf} options={{ headerShown: false }} />
            <Stack.Screen name="hindi prefinal" component={Hpf} options={{ headerShown: false }} />
            <Stack.Screen name="english prefinal" component={Epf} options={{ headerShown: false }} />
            <Stack.Screen name="maths em prefinal" component={Mepf} options={{ headerShown: false }} />
            <Stack.Screen name="maths tm prefinal" component={Mtpf} options={{ headerShown: false }} />
            <Stack.Screen name="physics em prefinal" component={Sepf} options={{ headerShown: false }} />
            <Stack.Screen name="physics tm prefinal" component={Stpf} options={{ headerShown: false }} />

            <Stack.Screen name="social em prefinal" component={Ssepf} options={{ headerShown: false }} />
            <Stack.Screen name="social tm prefinal" component={Sstpf} options={{ headerShown: false }} />


            <Stack.Screen name='rivision'
                component={rivision} options={{ headerShown: false }} />
            <Stack.Screen name="rivisiontest1" component={Rvtest1} options={{ headerShown: false }} />
            <Stack.Screen name="rivisiontest2" component={Rvtest2} options={{ headerShown: false }} />
            <Stack.Screen name="rivisiontest3" component={Rvtest3} options={{ headerShown: false }} />
            <Stack.Screen name="rivisiontest4" component={Rvtest4} options={{ headerShown: false }} />

            <Stack.Screen name="telugu rvtest1" component={Tr1} options={{ headerShown: false }} />
            <Stack.Screen name="telugu rvtest2" component={Tr2} options={{ headerShown: false }} />
            <Stack.Screen name="telugu rvtest3" component={Tr3} options={{ headerShown: false }} />
            <Stack.Screen name="telugu rvtest4" component={Tr4} options={{ headerShown: false }} />

            <Stack.Screen name="hindi rvtest1" component={Hr1} options={{ headerShown: false }} />
            <Stack.Screen name="hindi rvtest2" component={Hr2} options={{ headerShown: false }} />
            <Stack.Screen name="hindi rvtest3" component={Hr3} options={{ headerShown: false }} />
            <Stack.Screen name="hindi rvtest4" component={Hr4} options={{ headerShown: false }} />

            <Stack.Screen name="english rvtest1" component={Er1} options={{ headerShown: false }} />
            <Stack.Screen name="english rvtest2" component={Er2} options={{ headerShown: false }} />
            <Stack.Screen name="english rvtest3" component={Er3} options={{ headerShown: false }} />
            <Stack.Screen name="english rvtest4" component={Er4} options={{ headerShown: false }} />

            <Stack.Screen name="maths em rvtest1" component={Mer1} options={{ headerShown: false }} />
            <Stack.Screen name="maths em rvtest2" component={Mer2} options={{ headerShown: false }} />
            <Stack.Screen name="maths em rvtest3" component={Mer3} options={{ headerShown: false }} />
            <Stack.Screen name="maths em rvtest4" component={Mer4} options={{ headerShown: false }} />

            <Stack.Screen name="maths tm rvtest1" component={Mtr1} options={{ headerShown: false }} />
            <Stack.Screen name="maths tm rvtest2" component={Mtr2} options={{ headerShown: false }} />
            <Stack.Screen name="maths tm rvtest3" component={Mtr3} options={{ headerShown: false }} />
            <Stack.Screen name="maths tm rvtest4" component={Mtr4} options={{ headerShown: false }} />

            <Stack.Screen name="physics em rvtest1" component={Ser1} options={{ headerShown: false }} />
            <Stack.Screen name="physics em rvtest2" component={Ser2} options={{ headerShown: false }} />
            <Stack.Screen name="physics em rvtest3" component={Ser3} options={{ headerShown: false }} />
            <Stack.Screen name="physics em rvtest4" component={Ser4} options={{ headerShown: false }} />

            <Stack.Screen name="physics tm rvtest1" component={Str1} options={{ headerShown: false }} />
            <Stack.Screen name="physics tm rvtest2" component={Str2} options={{ headerShown: false }} />
            <Stack.Screen name="physics tm rvtest3" component={Str3} options={{ headerShown: false }} />
            <Stack.Screen name="physics tm rvtest4" component={Str4} options={{ headerShown: false }} />

            <Stack.Screen name="social tm rvtest1" component={Sstr1} options={{ headerShown: false }} />
            <Stack.Screen name="social tm rvtest2" component={Sstr2} options={{ headerShown: false }} />
            <Stack.Screen name="social tm rvtest3" component={Sstr3} options={{ headerShown: false }} />
            <Stack.Screen name="social tm rvtest4" component={Sstr4} options={{ headerShown: false }} />

            <Stack.Screen name="social em rvtest1" component={Sser1} options={{ headerShown: false }} />
            <Stack.Screen name="social em rvtest2" component={Sser2} options={{ headerShown: false }} />
            <Stack.Screen name="social em rvtest3" component={Sser3} options={{ headerShown: false }} />
            <Stack.Screen name="social em rvtest4" component={Sser4} options={{ headerShown: false }} />


            <Stack.Screen name='sliptest'
                component={Sliptest} options={{ headerShown: false }} />

            <Stack.Screen name="telugu sliptest" component={Tst} options={{ headerShown: false }} />
            <Stack.Screen name="hindi sliptest" component={Hst} options={{ headerShown: false }} />
            <Stack.Screen name="english sliptest" component={Est} options={{ headerShown: false }} />
            <Stack.Screen name="maths em sliptest" component={Mest} options={{ headerShown: false }} />
            <Stack.Screen name="maths tm sliptest" component={Mtst} options={{ headerShown: false }} />
            <Stack.Screen name="physics em sliptest" component={Pest} options={{ headerShown: false }} />
            <Stack.Screen name="physics tm sliptest" component={Ptst} options={{ headerShown: false }} />
            <Stack.Screen name="ns em sliptest" component={Nest} options={{ headerShown: false }} />
            <Stack.Screen name="ns tm sliptest" component={Ntst} options={{ headerShown: false }} />

            <Stack.Screen name="social em sliptest" component={Sest} options={{ headerShown: false }} />
            <Stack.Screen name="social tm sliptest" component={Stst} options={{ headerShown: false }} />


            <Stack.Screen name='quiz'
                component={Quiz} options={{ headerShown: false }} />
            <Stack.Screen name="Physics tmq" component={Physicst1} options={{ headerShown: false }} />
            <Stack.Screen name="Physics emq" component={Phyequiz} options={{ headerShown: false }} />
            <Stack.Screen name="Biology tmq" component={Nste1} options={{ headerShown: false }} />

            <Stack.Screen name="Social tmq" component={Socialte1} options={{ headerShown: false }} />

            <Stack.Screen name="St1" component={St1} options={{ headerShown: false }} />
            <Stack.Screen name="St5" component={St5} options={{ headerShown: false }} />
            <Stack.Screen name="St2" component={St2} options={{ headerShown: false }} />
            <Stack.Screen name="St3" component={St3} options={{ headerShown: false }} />
            <Stack.Screen name="St4" component={St4} options={{ headerShown: false }} />
            <Stack.Screen name="St6" component={St6} options={{ headerShown: false }} />
            <Stack.Screen name="St7" component={St7} options={{ headerShown: false }} />
            <Stack.Screen name="St8" component={St8} options={{ headerShown: false }} />
            <Stack.Screen name="St9" component={St9} options={{ headerShown: false }} />
            <Stack.Screen name="St10" component={St10} options={{ headerShown: false }} />
            <Stack.Screen name="St11" component={St11} options={{ headerShown: false }} />
            <Stack.Screen name="St12" component={St12} options={{ headerShown: false }} />
            <Stack.Screen name="St13" component={St13} options={{ headerShown: false }} />
            <Stack.Screen name="St14" component={St14} options={{ headerShown: false }} />
            <Stack.Screen name="St15" component={St15} options={{ headerShown: false }} />
            <Stack.Screen name="St16" component={St16} options={{ headerShown: false }} />
            <Stack.Screen name="St17" component={St17} options={{ headerShown: false }} />
            <Stack.Screen name="St18" component={St18} options={{ headerShown: false }} />
            <Stack.Screen name="St19" component={St19} options={{ headerShown: false }} />
            <Stack.Screen name="St20" component={St20} options={{ headerShown: false }} />
            <Stack.Screen name="St21" component={St21} options={{ headerShown: false }} />
            <Stack.Screen name="St22" component={St22} options={{ headerShown: false }} />

            <Stack.Screen name="Nt1" component={Nt1} options={{ headerShown: false }} />
            <Stack.Screen name="Nt2" component={Nt2} options={{ headerShown: false }} />
            <Stack.Screen name="Nt3" component={Nt3} options={{ headerShown: false }} />
            <Stack.Screen name="Nt4" component={Nt4} options={{ headerShown: false }} />
            <Stack.Screen name="Nt5" component={Nt5} options={{ headerShown: false }} />
            <Stack.Screen name="Nt6" component={Nt6} options={{ headerShown: false }} />
            <Stack.Screen name="Nt7" component={Nt7} options={{ headerShown: false }} />


            <Stack.Screen name="Pt1" component={Pt1} options={{ headerShown: false }} />
            <Stack.Screen name="Pt2" component={Pt2} options={{ headerShown: false }} />
            <Stack.Screen name="Pt3" component={Pt3} options={{ headerShown: false }} />
            <Stack.Screen name="Pt4" component={Pt4} options={{ headerShown: false }} />
            <Stack.Screen name="Pt5" component={Pt5} options={{ headerShown: false }} />
            <Stack.Screen name="Pt6" component={Pt6} options={{ headerShown: false }} />
            <Stack.Screen name="Pt7" component={Pt7} options={{ headerShown: false }} />
            <Stack.Screen name="Pt8" component={Pt8} options={{ headerShown: false }} />
            <Stack.Screen name="Pt9" component={Pt9} options={{ headerShown: false }} />
            <Stack.Screen name="Pt10" component={Pt10} options={{ headerShown: false }} />
            <Stack.Screen name="Pt11" component={Pt11} options={{ headerShown: false }} />
            <Stack.Screen name="Pt12" component={Pt12} options={{ headerShown: false }} />


            <Stack.Screen name="Pe1" component={Pe1} options={{ headerShown: false }} />
            <Stack.Screen name="Pe2" component={Pe2} options={{ headerShown: false }} />
            <Stack.Screen name="Pe3" component={Pe3} options={{ headerShown: false }} />
            <Stack.Screen name="Pe4" component={Pe4} options={{ headerShown: false }} />
            <Stack.Screen name="Pe5" component={Pe5} options={{ headerShown: false }} />
            <Stack.Screen name="Pe6" component={Pe6} options={{ headerShown: false }} />
            <Stack.Screen name="Pe7" component={Pe7} options={{ headerShown: false }} />
            <Stack.Screen name="Pe8" component={Pe8} options={{ headerShown: false }} />
            <Stack.Screen name="Pe9" component={Pe9} options={{ headerShown: false }} />
            <Stack.Screen name="Pe10" component={Pe10} options={{ headerShown: false }} />
            <Stack.Screen name="Pe11" component={Pe11} options={{ headerShown: false }} />


            <Stack.Screen name='Prev Papers'
                component={Home} options={{ headerShown: false }} />

            <Stack.Screen name="telugu" component={Tpop} options={{ headerShown: false }} />
            <Stack.Screen name="hindi" component={Hpqp} options={{ headerShown: false }} />
            <Stack.Screen name="english" component={Epop} options={{ headerShown: false }} />
            <Stack.Screen name="maths em" component={Mepqp} options={{ headerShown: false }} />
            <Stack.Screen name="maths tm" component={Mtpop} options={{ headerShown: false }} />
            <Stack.Screen name="physics em" component={Pepop} options={{ headerShown: false }} />
            <Stack.Screen name="physics tm" component={Ptpop} options={{ headerShown: false }} />
            <Stack.Screen name="biology em" component={Nepop} options={{ headerShown: false }} />
            <Stack.Screen name="biology tm" component={Ntpop} options={{ headerShown: false }} />
            <Stack.Screen name="social em" component={Sepop} options={{ headerShown: false }} />
            <Stack.Screen name="social tm" component={Stpop} options={{ headerShown: false }} />



            <Stack.Screen name="Telugu 2023" component={Telp1} options={{ headerShown: false }} />
            <Stack.Screen name="Hindi 2023" component={Hinp1} options={{ headerShown: false }} />
            <Stack.Screen name="English 2023" component={Engp1} options={{ headerShown: false }} />
            <Stack.Screen name="MathsTm 2023" component={Mathtp1} options={{ headerShown: false }} />
            <Stack.Screen name="MathsEm 2023" component={Mathep1} options={{ headerShown: false }} />
            <Stack.Screen name="BiologyTm 2023" component={Nstp1} options={{ headerShown: false }} />
            <Stack.Screen name="PhysicsTm 2023" component={Nstp1} options={{ headerShown: false }} />
            <Stack.Screen name="BiologyEM 2023" component={Nsep1} options={{ headerShown: false }} />
            <Stack.Screen name="PhysicsEm 2023" component={Nsep1} options={{ headerShown: false }} />
            <Stack.Screen name="SocialEm 2023" component={Socep1} options={{ headerShown: false }} />
            <Stack.Screen name="SocialTm 2023" component={Soctp1} options={{ headerShown: false }} />

            <Stack.Screen name="Telugu 2022p" component={Telp2} options={{ headerShown: false }} />
            <Stack.Screen name="Hindi 2022p" component={Hinp2} options={{ headerShown: false }} />
            <Stack.Screen name="English 2022p" component={Engp2} options={{ headerShown: false }} />
            <Stack.Screen name="MathsEm 2022p" component={Mathtp2} options={{ headerShown: false }} />
            <Stack.Screen name="MathsTm 2022p" component={Mathep2} options={{ headerShown: false }} />
            <Stack.Screen name="BiologyTm 2022p" component={Nstp2} options={{ headerShown: false }} />
            <Stack.Screen name="BiologyEM 2022p" component={Nsep2} options={{ headerShown: false }} />
            <Stack.Screen name="SocialEm 2022p" component={Socep2} options={{ headerShown: false }} />
            <Stack.Screen name="SocialTm 2022p" component={Soctp2} options={{ headerShown: false }} />
            <Stack.Screen name="PhysicsEm 2022p" component={Phyep2} options={{ headerShown: false }} />
            <Stack.Screen name="PhysicsTm 2022p" component={Phytp2} options={{ headerShown: false }} />

            <Stack.Screen name="Telugu Blueprint" component={Telp3} options={{ headerShown: false }} />
            <Stack.Screen name="Hindi Blueprint" component={Hinp3} options={{ headerShown: false }} />
            <Stack.Screen name="English Blueprint" component={Engp3} options={{ headerShown: false }} />
            <Stack.Screen name="MathsEm Blueprint" component={Mathep3} options={{ headerShown: false }} />
            <Stack.Screen name="MathsTm Blueprint" component={Mathep3} options={{ headerShown: false }} />
            <Stack.Screen name="ScienceEM1 Blueprint" component={Nsep3} options={{ headerShown: false }} />
            <Stack.Screen name="ScienceTM1 Blueprint" component={Nsep3} options={{ headerShown: false }} />
            <Stack.Screen name="ScienceEM2 Blueprint" component={Nsep3} options={{ headerShown: false }} />
            <Stack.Screen name="ScienceTM Blueprint" component={Nsep3} options={{ headerShown: false }} />
            <Stack.Screen name="SocialEm Blueprint" component={Socep3} options={{ headerShown: false }} />
            <Stack.Screen name="SocialTm Blueprint" component={Socep3} options={{ headerShown: false }} />



            <Stack.Screen name="Telugu 2019p1" component={Telp4} options={{ headerShown: false }} />
            <Stack.Screen name="Hindi 2019p" component={Hinp4} options={{ headerShown: false }} />
            <Stack.Screen name="English 2019p1" component={Engp4} options={{ headerShown: false }} />
            <Stack.Screen name="MathsEm 2019p1" component={Mathep4} options={{ headerShown: false }} />
            <Stack.Screen name="BiologyEM 2019p" component={Nsep4} options={{ headerShown: false }} />
            <Stack.Screen name="SocialEm 2019p1" component={Socep4} options={{ headerShown: false }} />
            <Stack.Screen name="PhysicsEm 2019p" component={Phyep4} options={{ headerShown: false }} />

            <Stack.Screen name="Telugu 2019p2" component={Telp5} options={{ headerShown: false }} />
            <Stack.Screen name="English 2019p2" component={Engp5} options={{ headerShown: false }} />
            <Stack.Screen name="MathsEm 2019p2" component={Mathep5} options={{ headerShown: false }} />
            <Stack.Screen name="SocialEm 2019p2" component={Socep5} options={{ headerShown: false }} />

            <Stack.Screen name="Telugu 2018p1" component={Telp6} options={{ headerShown: false }} />
            <Stack.Screen name="Hindi 2018p" component={Hinp6} options={{ headerShown: false }} />
            <Stack.Screen name="English 2018p1" component={Engp6} options={{ headerShown: false }} />
            <Stack.Screen name="MathsEm 2018p1" component={Mathep6} options={{ headerShown: false }} />
            <Stack.Screen name="BiologyEM 2018p" component={Nsep6} options={{ headerShown: false }} />
            <Stack.Screen name="SocialEm 2018p1" component={Socep6} options={{ headerShown: false }} />
            <Stack.Screen name="PhysicsEm 2018p" component={Phyp6} options={{ headerShown: false }} />


            <Stack.Screen name="Telugu 2018p2" component={Telp7} options={{ headerShown: false }} />
            <Stack.Screen name="English 2018p2" component={Engp7} options={{ headerShown: false }} />
            <Stack.Screen name="MathsEm 2018p2" component={Mathep7} options={{ headerShown: false }} />
            <Stack.Screen name="SocialEm 2018p2" component={Socep7} options={{ headerShown: false }} />


            <Stack.Screen name="Telugu 2017p1" component={Telp8} options={{ headerShown: false }} />
            <Stack.Screen name="Hindi 2017p" component={Hinp8} options={{ headerShown: false }} />
            <Stack.Screen name="English 2017p1" component={Engp8} options={{ headerShown: false }} />
            <Stack.Screen name="MathsEm 2017p1" component={Mathep8} options={{ headerShown: false }} />
            <Stack.Screen name="BiologyEM 2017p" component={Nsep8} options={{ headerShown: false }} />
            <Stack.Screen name="SocialEm 2017p1" component={Socep8} options={{ headerShown: false }} />
            <Stack.Screen name="PhysicsEm 2017p" component={Phyp8} options={{ headerShown: false }} />

            <Stack.Screen name="Telugu 2016p1" component={Telp11} options={{ headerShown: false }} />
            <Stack.Screen name="Hindi 2016p" component={Hinp11} options={{ headerShown: false }} />
            <Stack.Screen name="English 2016p1" component={Engp11} options={{ headerShown: false }} />
            <Stack.Screen name="MathsEm 2016p1" component={Mathep11} options={{ headerShown: false }} />
            <Stack.Screen name="BiologyEM 2016p" component={Nsep11} options={{ headerShown: false }} />
            <Stack.Screen name="SocialEm 2016p1" component={Socep11} options={{ headerShown: false }} />
            <Stack.Screen name="PhysicsEm 2016p" component={Phyp11} options={{ headerShown: false }} />

            <Stack.Screen name="Telugu 2015p1" component={Telp13} options={{ headerShown: false }} />
            <Stack.Screen name="Hindi 2015p" component={Hinp13} options={{ headerShown: false }} />
            <Stack.Screen name="English 2015p1" component={Engp13} options={{ headerShown: false }} />
            <Stack.Screen name="MathsEm 2015p1" component={Mathep13} options={{ headerShown: false }} />
            <Stack.Screen name="BiologyEM 2015p" component={Nsep13} options={{ headerShown: false }} />
            <Stack.Screen name="SocialEm 2015p1" component={Socep13} options={{ headerShown: false }} />
            <Stack.Screen name="PhysicsEm 2015p" component={Phyp13} options={{ headerShown: false }} />

            <Stack.Screen name="Telugu 2017p2" component={Telp10} options={{ headerShown: false }} />
            <Stack.Screen name="English 2017p2" component={Engp10} options={{ headerShown: false }} />
            <Stack.Screen name="MathsEm 2017p2" component={Mathep10} options={{ headerShown: false }} />
            <Stack.Screen name="SocialEm 2017p2" component={Socep10} options={{ headerShown: false }} />

            <Stack.Screen name="Telugu 2016p2" component={Telp12} options={{ headerShown: false }} />
            <Stack.Screen name="English 2016p2" component={Engp12} options={{ headerShown: false }} />
            <Stack.Screen name="MathsEm 2016p2" component={Mathep12} options={{ headerShown: false }} />
            <Stack.Screen name="SocialEm 2016p2" component={Socep12} options={{ headerShown: false }} />

            <Stack.Screen name="Telugu 2015p2" component={Telp14} options={{ headerShown: false }} />
            <Stack.Screen name="English 2015p2" component={Engp14} options={{ headerShown: false }} />
            <Stack.Screen name="MathsEm 2015p2" component={Mathep14} options={{ headerShown: false }} />
            <Stack.Screen name="SocialEm 2015p2" component={Socep14} options={{ headerShown: false }} />



            <Stack.Screen name="Telugu 2022" component={Telp} options={{ headerShown: false }} />
            <Stack.Screen name="Hindi 2022" component={Hinp} options={{ headerShown: false }} />
            <Stack.Screen name="English 2022" component={Engp} options={{ headerShown: false }} />
            <Stack.Screen name="MathsEm 2022" component={Mathep} options={{ headerShown: false }} />
            <Stack.Screen name="MathsTm 2022" component={Mathep} options={{ headerShown: false }} />
            <Stack.Screen name="BiologyTm 2022" component={Nstp} options={{ headerShown: false }} />
            <Stack.Screen name="BiologyEM 2022" component={Nsep} options={{ headerShown: false }} />
            <Stack.Screen name="SocialEm 2022" component={Socep} options={{ headerShown: false }} />
            <Stack.Screen name="SocialTm 2022" component={Soctp} options={{ headerShown: false }} />
            <Stack.Screen name="PhysicsEm 2022" component={Phyep} options={{ headerShown: false }} />
            <Stack.Screen name="PhysicsTm 2022" component={Phytp} options={{ headerShown: false }} />
        </Stack.Navigator>


    );





};



const ContactStackNavigator = () => {



    return (

        <Stack.Navigator>


            <Stack.Screen name='Videos'
                component={Videos} options={{ headerShown: false }} />
            <Stack.Screen name="Telugu" component={Telv} options={{ headerShown: false }} />
            <Stack.Screen name="Hindi" component={Hindiv} options={{ headerShown: false }} />
            <Stack.Screen name="English" component={Englishv} options={{ headerShown: false }} />
            <Stack.Screen name="Maths em" component={Mathsee} options={{ headerShown: false }} />
            <Stack.Screen name="Maths tm" component={Mathste} options={{ headerShown: false }} />
            <Stack.Screen name="Physics em" component={Physicse} options={{ headerShown: false }} />
            <Stack.Screen name="Physics tm" component={Physicst} options={{ headerShown: false }} />
            <Stack.Screen name="Biology em" component={Nsee} options={{ headerShown: false }} />
            <Stack.Screen name="Biology tm" component={Nste} options={{ headerShown: false }} />
            <Stack.Screen name="Social em" component={Socialee} options={{ headerShown: false }} />
            <Stack.Screen name="Social tm" component={Socialte} options={{ headerShown: false }} />


            <Stack.Screen name="coordinations" component={Coordination} options={{ headerShown: false }} />
            <Stack.Screen name="environment" component={Envi} options={{ headerShown: false }} />
            <Stack.Screen name="Chapter8" component={Anu} options={{ headerShown: false }} />
            <Stack.Screen name="Chapter7" component={Jivakriya} options={{ headerShown: false }} />
            <Stack.Screen name="Chapter9" component={Mana} options={{ headerShown: false }} />
            <Stack.Screen name="Chapter4" component={Prasarana} options={{ headerShown: false }} />
            <Stack.Screen name="Chapter5" component={Prasarana} options={{ headerShown: false }} />
            <Stack.Screen name="Chapter10" component={Sahaja} options={{ headerShown: false }} />

            <Stack.Screen name="coordinate" component={Coord} options={{ headerShown: false }} />
            <Stack.Screen name="polynomials" component={Poly} options={{ headerShown: false }} />
            <Stack.Screen name="probability" component={Prob} options={{ headerShown: false }} />
            <Stack.Screen name="real numbers" component={Real} options={{ headerShown: false }} />
            <Stack.Screen name="sets" component={Sets} options={{ headerShown: false }} />
            <Stack.Screen name="similar" component={Similar} options={{ headerShown: false }} />
            <Stack.Screen name="stats" component={Stats} options={{ headerShown: false }} />
            <Stack.Screen name="tangent" component={Tangent} options={{ headerShown: false }} />
            <Stack.Screen name="trigonometry" component={Trigy} options={{ headerShown: false }} />

            <Stack.Screen name="chapter1" component={One} options={{ headerShown: false }} />
            <Stack.Screen name="chapter2" component={Two} options={{ headerShown: false }} />
            <Stack.Screen name="chapter3" component={Thr} options={{ headerShown: false }} />
            <Stack.Screen name="chapter4" component={Four} options={{ headerShown: false }} />
            <Stack.Screen name="chapter5" component={Five} options={{ headerShown: false }} />
            <Stack.Screen name="chapter6" component={Six} options={{ headerShown: false }} />
            <Stack.Screen name="chapter7" component={Sev} options={{ headerShown: false }} />
            <Stack.Screen name="chapter8" component={Eig} options={{ headerShown: false }} />
            <Stack.Screen name="chapter9" component={Nine} options={{ headerShown: false }} />
            <Stack.Screen name="chapter10" component={Ten} options={{ headerShown: false }} />
            <Stack.Screen name="chapter11" component={Leve} options={{ headerShown: false }} />
            <Stack.Screen name="chapter12" component={Twve} options={{ headerShown: false }} />
            <Stack.Screen name="chapter13" component={Thre} options={{ headerShown: false }} />
            <Stack.Screen name="chapter14" component={Fourt} options={{ headerShown: false }} />

            <Stack.Screen name="atom" component={Atom} options={{ headerShown: false }} />
            <Stack.Screen name="chemical" component={Chemical} options={{ headerShown: false }} />
            <Stack.Screen name="curent" component={Curent} options={{ headerShown: false }} />
            <Stack.Screen name="eye" component={Eye} options={{ headerShown: false }} />
            <Stack.Screen name="Heat" component={Heet} options={{ headerShown: false }} />

            <Stack.Screen name="elctro" component={Magn} options={{ headerShown: false }} />
            <Stack.Screen name="plane" component={Planee} options={{ headerShown: false }} />
            <Stack.Screen name="curved" component={Refraction} options={{ headerShown: false }} />

            <Stack.Screen name="2nd" component={Amlalu} options={{ headerShown: false }} />
            <Stack.Screen name="4th" component={Curved} options={{ headerShown: false }} />
            <Stack.Screen name="9th" component={Electri} options={{ headerShown: false }} />
            <Stack.Screen name="10th" component={Electro} options={{ headerShown: false }} />
            <Stack.Screen name="1st" component={Heat} options={{ headerShown: false }} />
            <Stack.Screen name="5th" component={Human} options={{ headerShown: false }} />
            <Stack.Screen name="6th" component={Param} options={{ headerShown: false }} />
            <Stack.Screen name="3rd" component={Plane} options={{ headerShown: false }} />

        </Stack.Navigator>

    );




};

const MainStackNavigator2 = () => {




    return (

        <Stack.Screen name="Latest Updates" component={News} options={{ headerShown: false }} />

    );






}

export { MainStackNavigator1, ContactStackNavigator, MainStackNavigator2, };