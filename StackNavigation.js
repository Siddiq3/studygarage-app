


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


import Importe from "./Importe";









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




import Testpapers from "./Testpapers";



import Ssc from "./SSC";


import rivision from "./RIVISION";






import Polycet from "./Polycet";


import Tsimp from "./Tsimp";
import Tsplan from "./Tsplan";
import Tsprev from "./Tsprev";
import Tsstudy from "./Tsstudy";
import Tsmodel from "./Tsmodel";
import Tsblue from "./Tsblueprint";


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







import Quizques from "./Quizdq";
import QuizResults from "./Quizres";
import TotalScorePage from "./TotalScorePage";
import WithdrawalHistoryPage from "./Whistory";
import WithdrawalFormPage from "./Withdraw";
import Blueprintdata from "./tenth/blueprintdata";
import Blueprintpdf from "./tenth/blueprintpdf";


import Fa16data from "./6thclass/fa1data";
import Fa16pdf from "./6thclass/fa1pdf";
import Fa26data from "./6thclass/fa2data";
import Fa36data from "./6thclass/fa3data";
import Fa46data from "./6thclass/fa4data";
import Sa16data from "./6thclass/sa1data";
import Sa26data from "./6thclass/sa2data";
import Fa26pdf from "./6thclass/fa2pdf";
import Fa36pdf from "./6thclass/fa3pdf";
import Fa46pdf from "./6thclass/fa4pdf";
import Sa16pdf from "./6thclass/sa1pdf";
import Sa26pdf from "./6thclass/sa2pdf";
import Fa17data from "./7thclass/fa1data";
import Fa27data from "./7thclass/fa2data";
import Fa37data from "./7thclass/fa3data";
import Fa47data from "./7thclass/fa4data";
import Sa17data from "./7thclass/sa1data";
import Sa27data from "./7thclass/sa2data";
import Fa17pdf from "./7thclass/fa1pdf";
import Fa27pdf from "./7thclass/fa2pdf";
import Fa37pdf from "./7thclass/fa3pdf";
import Fa47pdf from "./7thclass/fa4pdf";
import Sa17pdf from "./7thclass/sa1pdf";
import Sa27pdf from "./7thclass/sa2pdf";
import Fa18data from "./8thclass/fa1data";
import Fa28data from "./8thclass/fa2data";
import Fa38data from "./8thclass/fa3data";
import Fa48data from "./8thclass/fa4data";
import Sa18data from "./8thclass/sa1data";
import Sa28data from "./8thclass/sa2data";
import Fa18pdf from "./8thclass/fa1pdf";
import Fa28pdf from "./8thclass/fa2pdf";
import Fa38pdf from "./8thclass/fa3pdf";
import Fa48pdf from "./8thclass/fa4pdf";
import Sa18pdf from "./8thclass/sa1pdf";
import Sa28pdf from "./8thclass/sa2pdf";
import Fa19data from "./9thclass/fa1data";
import Fa29data from "./9thclass/fa2data";
import Fa39data from "./9thclass/fa3data";
import Fa49data from "./9thclass/fa4data";
import Sa19data from "./9thclass/sa1data";
import Sa29data from "./9thclass/sa2data";
import Fa19pdf from "./9thclass/fa1pdf";
import Fa29pdf from "./9thclass/fa2pdf";
import Fa39pdf from "./9thclass/fa3pdf";
import Fa49pdf from "./9thclass/fa4pdf";
import Sa19pdf from "./9thclass/sa1pdf";
import Sa29pdf from "./9thclass/sa2pdf";
import Imp6data from "./6thclass/impdata";
import Imp7data from "./7thclass/impdata";
import Imp8data from "./8thclass/impdata";
import Imp9data from "./9thclass/impdata";
import Imp6pdf from "./6thclass/imppdf";
import Imp7pdf from "./7thclass/imppdf";
import Imp8pdf from "./8thclass/imppdf";
import Imp9pdf from "./9thclass/imppdf";
import Prefinaldata from "./tenth/prefinaldata";
import Prefinalpdf from "./tenth/prefinalpdf";
import Fa1data from "./tenth/fa1data";
import Fa1pdf from "./tenth/fa1pdf";
import Fa2data from "./tenth/fa2data";
import Fa2pdf from "./tenth/fa2pdf";
import Fa3data from "./tenth/fa3data";
import Fa3pdf from "./tenth/fa3pdf";
import Fa4data from "./tenth/fa4data";
import Fa4pdf from "./tenth/fa4pdf";
import Sa1pdf from "./tenth/sa1pdf";
import Sa1data from "./tenth/sa1data";
import Rv1data from "./tenth/rv1data";
import Rv2data from "./tenth/rv2data";
import Rv3data from "./tenth/rv3data";
import Rv4data from "./tenth/rv4data";
import Rv1pdf from "./tenth/rv1pdf";
import Minidata from "./tenth/minidata";
import Minipdf from "./tenth/minipdf";
import Weeklytestdata from "./tenth/weeklytestdata";
import Weeklytestpdf from "./tenth/weeklytestpdf";
import Dailytestdata from "./tenth/dailytestdata";
import Dailytestpdf from "./tenth/dailytestpdf";
import Grandtestdata from "./tenth/grandtestdata";
import Grandtestpdf from "./tenth/grandtestpdf";
import Public2023data from "./tenth/pub2023data";
import Pub2023pdf from "./tenth/pub2023pdf";
import Modelpaperdata from "./tenth/modelpdata";
import Modelpaperpdf from "./tenth/modepppdf";

import Inter1stimpdata from "./INTER/inter1stimpdata";
import Inter1stpqpdata from "./INTER/inter1stpqpdata";
import Inter2ndimpdata from "./INTER/inter2ndimpdata";
import Inter2ndpqpdata from "./INTER/inter2ndpqpdata";
import Inter1stimppdf from "./INTER/inter1stimppdf";
import Inter1stpqppdf from "./INTER/inter1stpqppdf";
import Inter2ndimppdf from "./INTER/inter2ndimppdf";
import Inter2ndpqppdf from "./INTER/inter2ndpqppdf";

import Inter1stmdata from "./INTER/inter1stmdata";

import Inter1stmpdf from "./INTER/inter1stmpdf";
import Inter2ndmpdf from "./INTER/inter2ndmpdf";
import Inter2ndmdata from "./INTER/inter2ndmdata";


import Mcasem1Pdf from "./MCA/sem1pdf";
import Mcasem2Pdf from "./MCA/sem2pdf";
import Mcasem3Pdf from "./MCA/sem3pdf";
import Mcasem4Pdf from "./MCA/sem4pdf";

import Mbasem1Pdf from "./MBA/sem1pdf";
import Mbasem2Pdf from "./MBA/sem2pdf";
import Mbasem3Pdf from "./MBA/sem3pdf";
import Mbasem4Pdf from "./MBA/sem4pdf";
import Impteldata from "./tenth/Impteld";
import Imphindata from "./tenth/Imphindata";
import Impengdata from "./tenth/Impengdata";
import Impmtdata from "./tenth/Impmtdata";
import Impmedata from "./tenth/Impmedata";
import Impntdata from "./tenth/Impntdata";
import Impptdata from "./tenth/Impptdata";
import Impnedata from "./tenth/Impnedata";
import Imppedata from "./tenth/Imppedata";
import Impsedata from "./tenth/Impsedata";
import Impstdata from "./tenth/Impstdata";
import Imptelpdf from "./tenth/Imptelpdf";
import Imphinpdf from "./tenth/Imphinpdf";
import Impengpdf from "./tenth/Impengpdf";
import Impmtpdf from "./tenth/Impmtpdf";
import Impmepdf from "./tenth/Impmepdf";
import Impntpdf from "./tenth/Impntpddf";
import Impnepdf from "./tenth/impnepdf";
import Imppepdf from "./tenth/Imppepdf";
import Impptpdf from "./tenth/Impptpdf";
import Impsepdf from "./tenth/Impsepdf";
import Impstpdf from "./tenth/Impstpdf";

import Mapdata from "./tenth/Mapdata";
import Mappdf from "./tenth/mappdf";

import Home from "./Home";
import Tpop from "./pqp/Tpqp";
import Hpqp from "./pqp/Hpqp";
import Epop from "./pqp/Epqp";
import Mepqp from "./pqp/Mepqp";
import Mtpop from "./pqp/Mtpop";
import Pepop from "./pqp/Pepqp";
import Ptpop from "./pqp/Ptpqp";
import Nepop from "./pqp/Nepqp";
import Ntpop from "./pqp/Ntpqp";
import Sepop from "./pqp/Sepqp";
import Stpop from "./pqp/Stpqp";


import Fa1pdfka from "./KASSC/fa1pdf";

import Fa3dataka from "./KASSC/fa3data";
import Fa3pdfka from "./KASSC/fa3pdf";
import Fa4dataka from "./KASSC/fa4data";
import Fa4pdfka from "./KASSC/fa4pdf";
import Sa1dataka from "./KASSC/sa1data";
import Sa1pdfka from "./KASSC/sa1pdf";

import Prefinaldataka from "./KASSC/prefinaldata";
import Prefinalpdfka from "./KASSC/prefinalpdf";
import Public2023dataka from "./KASSC/pub2023data";
import Pub2023pdfka from "./KASSC/pub2023pdf";
import Blueprintdataka from "./KASSC/blueprintdata";
import Blueprintpdfka from "./KASSC/blueprintpdf";
import Modelpaperpdfka from "./KASSC/modepppdf";
import Modelpaperdataka from "./KASSC/modelpdata";

import Solutiondataka from "./KASSC/solutinsdata";
import Solutionpdfka from "./KASSC/solutionspdf";
import Sscka from "./10thka";
import Fa1dataka from "./KASSC/fa1data";

import Kapqp from "./KApqp";
import Kanadapqpdataka from "./KASSC/kanadapqpdata";
import Hinpqpdataka from "./KASSC/hinpqpdata";
import Engpqpdataka from "./KASSC/Engpqpdata";
import Matpqpdataka from "./KASSC/Matpqpdata";
import Scipqpdataka from "./KASSC/sciencepqpdata";
import Socpqpdataka from "./KASSC/socialpqpdata";
import Kanpqppdfka from "./KASSC/kanadapqppdf";
import Hinpqppdfka from "./KASSC/hinpqppdf";
import Enfpqppdfka from "./KASSC/Engpqppdf";
import Matpqppdfka from "./KASSC/Matpqppdf";
import Scipqppdfka from "./KASSC/sciencepqppdf";
import Socpqppdfka from "./KASSC/socialpqppdf";
import Fa2dataka from "./KASSC/fa2data";
import Fa2pdfka from "./KASSC/fa2pdf";
import Textbookka from "./KASSC/textbook";
import Textbookpdfka from "./KASSC/textbookpdf";
import Impquestiondataka from "./KASSC/impquestionsdata";
import Impquestionspdfka from "./KASSC/impquestionspdf";




import FirstPage from './firstpage';
import SecondPage from './secondpage';
import class6ka from "./KA CLASS 6TO9/Class6";
import class7ka from "./KA CLASS 6TO9/Class7";
import class8ka from "./KA CLASS 6TO9/Class8";
import class9ka from "./KA CLASS 6TO9/Class9";
import Fa16dataka from "./KA6THCLASS/fa1data";
import Fa26dataka from "./KA6THCLASS/fa2data";
import Fa36dataka from "./KA6THCLASS/fa3data";
import Fa46dataka from "./KA6THCLASS/fa4data";
import Sa16dataka from "./KA6THCLASS/sa1data";
import Sa26dataka from "./KA6THCLASS/sa2data";
import Imp6dataka from "./KA6THCLASS/impdata";
import Fa16pdfka from "./KA6THCLASS/fa1pdf";
import Fa26pdfka from "./KA6THCLASS/fa2pdf";
import Fa36pdfka from "./KA6THCLASS/fa3pdf";
import Fa46pdfka from "./KA6THCLASS/fa4pdf";
import Sa16pdfka from "./KA6THCLASS/sa1pdf";
import Sa26pdfka from "./KA6THCLASS/sa2pdf";
import Imp6pdfka from "./KA6THCLASS/imppdf";
import Fa17dataka from "./7thclass/fa1data";
import Sa27dataka from "./KA7THCLASS/sa2data";
import Sa27pdfka from "./KA7THCLASS/sa2pdf";
import Fa18dataka from "./KA8THCLASS/fa1data";
import Fa28dataka from "./KA8THCLASS/fa2data";
import Fa38dataka from "./KA8THCLASS/fa3data";
import Fa48dataka from "./KA8THCLASS/fa4data";
import Sa18dataka from "./KA8THCLASS/sa1data";
import Sa28dataka from "./KA8THCLASS/sa2data";
import Imp8dataka from "./KA8THCLASS/impdata";
import Fa18pdfka from "./KA8THCLASS/fa1pdf";
import Fa28pdfka from "./KA8THCLASS/fa2pdf";
import Fa38pdfka from "./KA8THCLASS/fa3pdf";
import Fa48pdfka from "./KA8THCLASS/fa4pdf";
import Sa18pdfka from "./KA8THCLASS/sa1pdf";
import Sa28pdfka from "./KA8THCLASS/sa2pdf";
import Imp8pdfka from "./KA8THCLASS/imppdf";
import Fa19dataka from "./KA9THCLASS/fa1data";
import Fa29dataka from "./KA9THCLASS/fa2data";
import Fa39dataka from "./KA9THCLASS/fa3data";
import Fa49dataka from "./KA9THCLASS/fa4data";
import Sa19dataka from "./KA9THCLASS/sa1data";
import Sa29dataka from "./KA9THCLASS/sa2data";
import Imp9dataka from "./KA9THCLASS/impdata";
import Fa19pdfka from "./KA9THCLASS/fa1pdf";
import Fa29pdfka from "./KA9THCLASS/fa2pdf";
import Fa39pdfka from "./KA9THCLASS/fa3pdf";
import Fa49pdfka from "./KA9THCLASS/fa4pdf";
import Sa19pdfka from "./KA9THCLASS/sa1pdf";
import Sa29pdfka from "./KA9THCLASS/sa2pdf";
import Imp9pdfka from "./KA9THCLASS/imppdf";
import Quiz6ka from "./Dailyquiz/Quiz6ka";
import Quiz7ka from "./Dailyquiz/Quiz7ka";
import Quiz8ka from "./Dailyquiz/Quiz8ka";
import Quiz9ka from "./Dailyquiz/Quiz9ka";
import Quiz10ka from "./Dailyquiz/Quiz10ka";
import Qres6ka from "./Results/6kaqres";
import Qres7ka from "./Results/7kaqres";
import Qres8ka from "./Results/8kaqres";
import Qres9ka from "./Results/9kaqres";
import Qres10ka from "./Results/10kares";
import ChapterDetails from "./Chapter";
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fa27dataka from "./KA7THCLASS/fa2data";
import Fa37dataka from "./KA7THCLASS/fa3data";
import Fa47dataka from "./KA7THCLASS/fa4data";
import Sa17dataka from "./KA7THCLASS/sa1data";
import Imp7dataka from "./KA7THCLASS/impdata";
import Fa17pdfka from "./KA7THCLASS/fa1pdf";
import Fa27pdfka from "./KA7THCLASS/fa2pdf";
import Fa37pdfka from "./KA7THCLASS/fa3pdf";
import Fa47pdfka from "./KA7THCLASS/fa4pdf";
import Sa17pdfka from "./KA7THCLASS/sa1pdf";
import Imp7pdfka from "./KA7THCLASS/imppdf";
import Quiz10ts from "./Dailyquiz/Quiz10ts";
import Qres10ts from "./Results/10tsqres";
import SubjectData from "./Subjectdetails";


const Stack = createNativeStackNavigator();

const MainStackNavigator1 = () => {


    const [userDataExists, setUserDataExists] = useState(false);


    useEffect(() => {
        checkUserData();
    }, []);

    const checkUserData = async () => {
        try {
            const userName = await AsyncStorage.getItem('userName');
            if (userName) {
                setUserDataExists(true);
            }
        } catch (error) {
            console.error('Error checking user data:', error);
        }

    };


    return (


        <Stack.Navigator initialRouteName={userDataExists ? 'SecondPage' : 'FirstPage'} headerMode="none" >
            <Stack.Screen name="FirstPage" component={FirstPage} options={{ headerShown: false }} />
            <Stack.Screen name="SecondPage" component={SecondPage} options={{ headerShown: false }} />



            <Stack.Screen name='ChapterDetails' component={ChapterDetails} options={{ headerShown: false }} />
            <Stack.Screen name='Quiz' component={Quizques} options={{ headerShown: false }} />
            <Stack.Screen name='Quiz Results' component={QuizResults} options={{ headerShown: false }} />
            <Stack.Screen name='SubjectDataPage' component={SubjectData} options={{ headerShown: false }} />
            <Stack.Screen name='TotalScorePage' component={TotalScorePage} options={{ headerShown: false }} />
            <Stack.Screen name="WithdrawalHistoryPage" component={WithdrawalHistoryPage} />
            <Stack.Screen name='WithdrawalFormPage' component={WithdrawalFormPage} options={{ headerShown: false }} />

            <Stack.Screen name='apssc' component={Menu} options={{ headerShown: false }} />





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






            <Stack.Screen name='interimp1' component={Inter1stimpdata} options={{ headerShown: false }} />
            <Stack.Screen name='Inter1stimpPage' component={Inter1stimppdf} options={{ headerShown: false }} />
            <Stack.Screen name='interprev1' component={Inter1stpqpdata} options={{ headerShown: false }} />
            <Stack.Screen name='Inter1stpqpPage' component={Inter1stpqppdf} options={{ headerShown: false }} />
            <Stack.Screen name='year1m' component={Inter1stmdata} options={{ headerShown: false }} />
            <Stack.Screen name='Inter1stmPage' component={Inter1stmpdf} options={{ headerShown: false }} />




            <Stack.Screen name='interimp2' component={Inter2ndimpdata} options={{ headerShown: false }} />
            <Stack.Screen name='Inter2ndimpPage' component={Inter2ndimppdf} options={{ headerShown: false }} />
            <Stack.Screen name='interprev2' component={Inter2ndpqpdata} options={{ headerShown: false }} />
            <Stack.Screen name='Inter2ndpqpPage' component={Inter2ndpqppdf} options={{ headerShown: false }} />
            <Stack.Screen name='year2m' component={Inter2ndmdata} options={{ headerShown: false }} />
            <Stack.Screen name='Inter2ndmPage' component={Inter2ndmpdf} options={{ headerShown: false }} />



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



            <Stack.Screen name='6thclass tb' component={Class6tb} options={{ headerShown: false }} />



            <Stack.Screen name='7thclass tb' component={Class7tb} options={{ headerShown: false }} />



            <Stack.Screen name='8thclass tb' component={Class8tb} options={{ headerShown: false }} />


            <Stack.Screen name='9thclass tb' component={Class9tb} options={{ headerShown: false }} />





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







            <Stack.Screen name='Question' component={TodayQues} options={{ headerShown: false }} />
            <Stack.Screen name='Weekly Questions' component={WeekQues} options={{ headerShown: false }} />
            <Stack.Screen name='Question6' component={Quiz6} options={{ headerShown: false }} />
            <Stack.Screen name='Question7' component={Quiz7} options={{ headerShown: false }} />
            <Stack.Screen name='Question8' component={Quiz8} options={{ headerShown: false }} />
            <Stack.Screen name='Question9' component={Quiz9} options={{ headerShown: false }} />
            <Stack.Screen name='Question11' component={Quiz11} options={{ headerShown: false }} />
            <Stack.Screen name='Question12' component={Quiz12} options={{ headerShown: false }} />

            <Stack.Screen name='Question6ka' component={Quiz6ka} options={{ headerShown: false }} />
            <Stack.Screen name='Question7ka' component={Quiz7ka} options={{ headerShown: false }} />
            <Stack.Screen name='Question8ka' component={Quiz8ka} options={{ headerShown: false }} />
            <Stack.Screen name='Question9ka' component={Quiz9ka} options={{ headerShown: false }} />
            <Stack.Screen name='Question10ka' component={Quiz10ka} options={{ headerShown: false }} />
            <Stack.Screen name='Question10ts' component={Quiz10ts} options={{ headerShown: false }} />



            <Stack.Screen name='Daily Result' component={DailyResult} options={{ headerShown: false }} />
            <Stack.Screen name='Result6' component={Qres6} options={{ headerShown: false }} />
            <Stack.Screen name='Result7' component={Qres7} options={{ headerShown: false }} />
            <Stack.Screen name='Result8' component={Qres8} options={{ headerShown: false }} />
            <Stack.Screen name='Result9' component={Qres9} options={{ headerShown: false }} />
            <Stack.Screen name='Result11' component={Qres11} options={{ headerShown: false }} />
            <Stack.Screen name='Result12' component={Qres12} options={{ headerShown: false }} />


            <Stack.Screen name='Result6ka' component={Qres6ka} options={{ headerShown: false }} />
            <Stack.Screen name='Result7ka' component={Qres7ka} options={{ headerShown: false }} />
            <Stack.Screen name='Result8ka' component={Qres8ka} options={{ headerShown: false }} />
            <Stack.Screen name='Result9ka' component={Qres9ka} options={{ headerShown: false }} />
            <Stack.Screen name='Result10ka' component={Qres10ka} options={{ headerShown: false }} />

            <Stack.Screen name='Result10ts' component={Qres10ts} options={{ headerShown: false }} />

            <Stack.Screen name='Today Answer' component={Todayans} options={{ headerShown: false }} />

            <Stack.Screen name='6thToday Answer' component={qans6} options={{ headerShown: false }} />
            <Stack.Screen name='7thToday Answer' component={qans7} options={{ headerShown: false }} />
            <Stack.Screen name='8thToday Answer' component={qans8} options={{ headerShown: false }} />

            <Stack.Screen name='11thToday Answer' component={qans11} options={{ headerShown: false }} />
            <Stack.Screen name='12thToday Answer' component={qans12} options={{ headerShown: false }} />


            <Stack.Screen name='Weekly Result' component={WeekResult} options={{ headerShown: false }} />
            <Stack.Screen name='Weekly Answer' component={Weekans} options={{ headerShown: false }} />


            <Stack.Screen name='ssc' component={Ssc} options={{ headerShown: false }} />


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






            <Stack.Screen name="IIItp" component={Iiit} options={{ headerShown: false }} />
            <Stack.Screen name="im" component={Mathsiiit} options={{ headerShown: false }} />
            <Stack.Screen name="ip" component={Phyiiit} options={{ headerShown: false }} />
            <Stack.Screen name="syllabus" component={Syllabusi} options={{ headerShown: false }} />
            <Stack.Screen name="phyics material" component={Materialphy} options={{ headerShown: false }} />
            <Stack.Screen name="ib" component={Materialbio} options={{ headerShown: false }} />
            <Stack.Screen name="maths Material" component={Materialmaths} options={{ headerShown: false }} />

            <Stack.Screen name='testpapers'
                component={Testpapers} options={{ headerShown: false }} />








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


            <Stack.Screen name='apblueprint1'
                component={Blueprintdata} options={{ headerShown: false }} />
            <Stack.Screen name='UrlPage'
                component={Blueprintpdf} options={{ headerShown: false }} />

            <Stack.Screen name='Importent'
                component={Importe} options={{ headerShown: false }} />


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

            <Stack.Screen name="Telugu Imp" component={Impteldata} options={{ headerShown: false }} />
            <Stack.Screen name="Hindi Imp" component={Imphindata} options={{ headerShown: false }} />
            <Stack.Screen name="English Imp" component={Impengdata} options={{ headerShown: false }} />
            <Stack.Screen name="Mathstm Imp" component={Impmtdata} options={{ headerShown: false }} />
            <Stack.Screen name="Mathsem Imp" component={Impmedata} options={{ headerShown: false }} />
            <Stack.Screen name="Biologytm Imp" component={Impntdata} options={{ headerShown: false }} />
            <Stack.Screen name="Physicstm Imp" component={Impptdata} options={{ headerShown: false }} />
            <Stack.Screen name="Biologyem Imp" component={Impnedata} options={{ headerShown: false }} />
            <Stack.Screen name="Physicsem Imp" component={Imppedata} options={{ headerShown: false }} />
            <Stack.Screen name="Socialem Imp" component={Impsedata} options={{ headerShown: false }} />
            <Stack.Screen name="Socialtm Imp" component={Impstdata} options={{ headerShown: false }} />

            <Stack.Screen name="ImptelPage" component={Imptelpdf} options={{ headerShown: false }} />
            <Stack.Screen name="ImphinPage" component={Imphinpdf} options={{ headerShown: false }} />
            <Stack.Screen name="ImpengPage" component={Impengpdf} options={{ headerShown: false }} />
            <Stack.Screen name="ImpmtPage" component={Impmtpdf} options={{ headerShown: false }} />
            <Stack.Screen name="ImpmePage" component={Impmepdf} options={{ headerShown: false }} />
            <Stack.Screen name="ImpntPage" component={Impntpdf} options={{ headerShown: false }} />
            <Stack.Screen name="ImpnePage" component={Impnepdf} options={{ headerShown: false }} />
            <Stack.Screen name="ImppePage" component={Imppepdf} options={{ headerShown: false }} />
            <Stack.Screen name="ImpptPage" component={Impptpdf} options={{ headerShown: false }} />
            <Stack.Screen name="ImpsePage" component={Impsepdf} options={{ headerShown: false }} />
            <Stack.Screen name="ImpstPage" component={Impstpdf} options={{ headerShown: false }} />

            <Stack.Screen name='modelpapers' component={Modelpaperdata} options={{ headerShown: false }} />
            <Stack.Screen name='ModelpaperPage' component={Modelpaperpdf} options={{ headerShown: false }} />

            <Stack.Screen name='prefinal1' component={Prefinaldata} options={{ headerShown: false }} />
            <Stack.Screen name='PrefinalPage' component={Prefinalpdf} options={{ headerShown: false }} />

            <Stack.Screen name='ssc2023' component={Public2023data} options={{ headerShown: false }} />
            <Stack.Screen name='Public2023Page' component={Pub2023pdf} options={{ headerShown: false }} />
            <Stack.Screen name='map' component={Mapdata} options={{ headerShown: false }} />
            <Stack.Screen name='MapPage' component={Mappdf} options={{ headerShown: false }} />






            <Stack.Screen name='FA11'
                component={Fa1data} options={{ headerShown: false }} />

            <Stack.Screen name='Fa1Page'
                component={Fa1pdf} options={{ headerShown: false }} />


            <Stack.Screen name='FA21'
                component={Fa2data} options={{ headerShown: false }} />

            <Stack.Screen name='Fa2Page'
                component={Fa2pdf} options={{ headerShown: false }} />

            <Stack.Screen name='FA31'
                component={Fa3data} options={{ headerShown: false }} />

            <Stack.Screen name='Fa3Page'
                component={Fa3pdf} options={{ headerShown: false }} />

            <Stack.Screen name='FA41'
                component={Fa4data} options={{ headerShown: false }} />

            <Stack.Screen name='Fa4Page'
                component={Fa4pdf} options={{ headerShown: false }} />


            <Stack.Screen name='SA11'
                component={Sa1data} options={{ headerShown: false }} />

            <Stack.Screen name='Sa1Page' component={Sa1pdf} options={{ headerShown: false }} />

            <Stack.Screen name="rivision" component={rivision} options={{ headerShown: false }} />
            <Stack.Screen name="rivisiontest11" component={Rv1data} options={{ headerShown: false }} />
            <Stack.Screen name="rivisiontest21" component={Rv2data} options={{ headerShown: false }} />
            <Stack.Screen name="rivisiontest31" component={Rv3data} options={{ headerShown: false }} />
            <Stack.Screen name="rivisiontest41" component={Rv4data} options={{ headerShown: false }} />


            <Stack.Screen name='Rv1Page' component={Rv1pdf} options={{ headerShown: false }} />
            <Stack.Screen name='Rv2Page' component={Rv1pdf} options={{ headerShown: false }} />
            <Stack.Screen name='Rv3Page' component={Rv1pdf} options={{ headerShown: false }} />
            <Stack.Screen name='Rv4Page' component={Rv1pdf} options={{ headerShown: false }} />

            <Stack.Screen name='mini1' component={Minidata} options={{ headerShown: false }} />
            <Stack.Screen name='MiniPage' component={Minipdf} options={{ headerShown: false }} />

            <Stack.Screen name="weeklytest1" component={Weeklytestdata} options={{ headerShown: false }} />
            <Stack.Screen name='WeeklytestPage' component={Weeklytestpdf} options={{ headerShown: false }} />

            <Stack.Screen name="dailytest" component={Dailytestdata} options={{ headerShown: false }} />
            <Stack.Screen name='DailytestPage' component={Dailytestpdf} options={{ headerShown: false }} />

            <Stack.Screen name="grandtest" component={Grandtestdata} options={{ headerShown: false }} />
            <Stack.Screen name='GrandtestPage' component={Grandtestpdf} options={{ headerShown: false }} />



            <Stack.Screen name="6thclass fa1" component={Fa16data} options={{ headerShown: false }} />
            <Stack.Screen name="6thclass fa2" component={Fa26data} options={{ headerShown: false }} />
            <Stack.Screen name="6thclass fa3" component={Fa36data} options={{ headerShown: false }} />
            <Stack.Screen name="6thclass fa4" component={Fa46data} options={{ headerShown: false }} />
            <Stack.Screen name="6thclass sa1" component={Sa16data} options={{ headerShown: false }} />
            <Stack.Screen name="6thclass sa2" component={Sa26data} options={{ headerShown: false }} />

            <Stack.Screen name="6thclass imp" component={Imp6data} options={{ headerShown: false }} />

            <Stack.Screen name="Fa16Page" component={Fa16pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Fa26Page" component={Fa26pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Fa36Page" component={Fa36pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Fa46Page" component={Fa46pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Sa16Page" component={Sa16pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Sa26Page" component={Sa26pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Imp6Page" component={Imp6pdf} options={{ headerShown: false }} />


            <Stack.Screen name="7thclass fa1" component={Fa17data} options={{ headerShown: false }} />
            <Stack.Screen name="7thclass fa2" component={Fa27data} options={{ headerShown: false }} />
            <Stack.Screen name="7thclass fa3" component={Fa37data} options={{ headerShown: false }} />
            <Stack.Screen name="7thclass fa4" component={Fa47data} options={{ headerShown: false }} />
            <Stack.Screen name="7thclass sa1" component={Sa17data} options={{ headerShown: false }} />
            <Stack.Screen name="7thclass sa2" component={Sa27data} options={{ headerShown: false }} />
            <Stack.Screen name="7thclass imp" component={Imp7data} options={{ headerShown: false }} />

            <Stack.Screen name="Fa17Page" component={Fa17pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Fa27Page" component={Fa27pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Fa37Page" component={Fa37pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Fa47Page" component={Fa47pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Sa17Page" component={Sa17pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Sa27Page" component={Sa27pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Imp7Page" component={Imp7pdf} options={{ headerShown: false }} />


            <Stack.Screen name="8thclass fa1" component={Fa18data} options={{ headerShown: false }} />
            <Stack.Screen name="8thclass fa2" component={Fa28data} options={{ headerShown: false }} />
            <Stack.Screen name="8thclass fa3" component={Fa38data} options={{ headerShown: false }} />
            <Stack.Screen name="8thclass fa4" component={Fa48data} options={{ headerShown: false }} />
            <Stack.Screen name="8thclass sa1" component={Sa18data} options={{ headerShown: false }} />
            <Stack.Screen name="8thclass sa2" component={Sa28data} options={{ headerShown: false }} />
            <Stack.Screen name="8thclass imp" component={Imp8data} options={{ headerShown: false }} />

            <Stack.Screen name="Fa18Page" component={Fa18pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Fa28Page" component={Fa28pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Fa38Page" component={Fa38pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Fa48Page" component={Fa48pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Sa18Page" component={Sa18pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Sa28Page" component={Sa28pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Imp8Page" component={Imp8pdf} options={{ headerShown: false }} />

            <Stack.Screen name="9thclass fa1" component={Fa19data} options={{ headerShown: false }} />
            <Stack.Screen name="9thclass fa2" component={Fa29data} options={{ headerShown: false }} />
            <Stack.Screen name="9thclass fa3" component={Fa39data} options={{ headerShown: false }} />
            <Stack.Screen name="9thclass fa4" component={Fa49data} options={{ headerShown: false }} />
            <Stack.Screen name="9thclass sa1" component={Sa19data} options={{ headerShown: false }} />
            <Stack.Screen name="9thclass sa2" component={Sa29data} options={{ headerShown: false }} />
            <Stack.Screen name="9thclass imp" component={Imp9data} options={{ headerShown: false }} />


            <Stack.Screen name="Fa19Page" component={Fa19pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Fa29Page" component={Fa29pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Fa39Page" component={Fa39pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Fa49Page" component={Fa49pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Sa19Page" component={Sa19pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Sa29Page" component={Sa29pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Imp9Page" component={Imp9pdf} options={{ headerShown: false }} />



            <Stack.Screen name="Mcasem1dataPage" component={Mcasem1Pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Mcasem2dataPage" component={Mcasem2Pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Mcasem3dataPage" component={Mcasem3Pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Mcasem4dataPage" component={Mcasem4Pdf} options={{ headerShown: false }} />





            <Stack.Screen name="Mbasem1dataPage" component={Mbasem1Pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Mbasem2dataPage" component={Mbasem2Pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Mbasem3dataPage" component={Mbasem3Pdf} options={{ headerShown: false }} />
            <Stack.Screen name="Mbasem4dataPage" component={Mbasem4Pdf} options={{ headerShown: false }} />



            <Stack.Screen name='FA1ka'
                component={Fa1dataka} options={{ headerShown: false }} />

            <Stack.Screen name='Fa1Pageka'
                component={Fa1pdfka} options={{ headerShown: false }} />




            <Stack.Screen name='FA3ka'
                component={Fa3dataka} options={{ headerShown: false }} />

            <Stack.Screen name='Fa3Pageka'
                component={Fa3pdfka} options={{ headerShown: false }} />

            <Stack.Screen name='FA4ka'
                component={Fa4dataka} options={{ headerShown: false }} />

            <Stack.Screen name='Fa4Pageka'
                component={Fa4pdfka} options={{ headerShown: false }} />


            <Stack.Screen name='SA1ka'
                component={Sa1dataka} options={{ headerShown: false }} />

            <Stack.Screen name='Sa1Pageka' component={Sa1pdfka} options={{ headerShown: false }} />



            <Stack.Screen name='modelpaperska' component={Modelpaperdataka} options={{ headerShown: false }} />
            <Stack.Screen name='ModelpaperPageka' component={Modelpaperpdfka} options={{ headerShown: false }} />

            <Stack.Screen name='prefinalka' component={Prefinaldataka} options={{ headerShown: false }} />
            <Stack.Screen name='PrefinalPageka' component={Prefinalpdfka} options={{ headerShown: false }} />

            <Stack.Screen name='ssc2023ka' component={Public2023dataka} options={{ headerShown: false }} />
            <Stack.Screen name='Public2023Pageka' component={Pub2023pdfka} options={{ headerShown: false }} />


            <Stack.Screen name='kablueprint1'
                component={Blueprintdataka} options={{ headerShown: false }} />
            <Stack.Screen name='blueprintka'
                component={Blueprintpdfka} options={{ headerShown: false }} />



            <Stack.Screen name='solutionka' component={Solutiondataka} options={{ headerShown: false }} />
            <Stack.Screen name='solutionPageka' component={Solutionpdfka} options={{ headerShown: false }} />

            <Stack.Screen name='Importentka' component={Impquestiondataka} options={{ headerShown: false }} />
            <Stack.Screen name='imppqpPageka' component={Impquestionspdfka} options={{ headerShown: false }} />


            <Stack.Screen name='textbookska' component={Textbookka} options={{ headerShown: false }} />
            <Stack.Screen name='textbooksPageka' component={Textbookpdfka} options={{ headerShown: false }} />

            <Stack.Screen name='Prev Paperska' component={Kapqp} options={{ headerShown: false }} />

            <Stack.Screen name='kanada ka' component={Kanadapqpdataka} options={{ headerShown: false }} />
            <Stack.Screen name='KanPqpPageka' component={Kanpqppdfka} options={{ headerShown: false }} />

            <Stack.Screen name='hindi ka' component={Hinpqpdataka} options={{ headerShown: false }} />
            <Stack.Screen name='HinPqpPageka' component={Hinpqppdfka} options={{ headerShown: false }} />

            <Stack.Screen name='english ka' component={Engpqpdataka} options={{ headerShown: false }} />
            <Stack.Screen name='EngPqpPageka' component={Enfpqppdfka} options={{ headerShown: false }} />

            <Stack.Screen name='maths ka' component={Matpqpdataka} options={{ headerShown: false }} />
            <Stack.Screen name='MatPqpPageka' component={Matpqppdfka} options={{ headerShown: false }} />

            <Stack.Screen name='biology ka' component={Scipqpdataka} options={{ headerShown: false }} />
            <Stack.Screen name='SciPqpPageka' component={Scipqppdfka} options={{ headerShown: false }} />

            <Stack.Screen name='social ka' component={Socpqpdataka} options={{ headerShown: false }} />
            <Stack.Screen name='SocPqpPageka' component={Socpqppdfka} options={{ headerShown: false }} />

            <Stack.Screen name='FA2ka'
                component={Fa2dataka} options={{ headerShown: false }} />

            <Stack.Screen name='Fa2Pageka'
                component={Fa2pdfka} options={{ headerShown: false }} />




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











            <Stack.Screen name="class6ka" component={class6ka} options={{ headerShown: false }} />
            <Stack.Screen name="class7ka" component={class7ka} options={{ headerShown: false }} />
            <Stack.Screen name="class8ka" component={class8ka} options={{ headerShown: false }} />
            <Stack.Screen name="class9ka" component={class9ka} options={{ headerShown: false }} />


            <Stack.Screen name="6thclass fa1ka" component={Fa16dataka} options={{ headerShown: false }} />
            <Stack.Screen name="6thclass fa2ka" component={Fa26dataka} options={{ headerShown: false }} />
            <Stack.Screen name="6thclass fa3ka" component={Fa36dataka} options={{ headerShown: false }} />
            <Stack.Screen name="6thclass fa4ka" component={Fa46dataka} options={{ headerShown: false }} />
            <Stack.Screen name="6thclass sa1ka" component={Sa16dataka} options={{ headerShown: false }} />
            <Stack.Screen name="6thclass sa2ka" component={Sa26dataka} options={{ headerShown: false }} />

            <Stack.Screen name="6thclass impka" component={Imp6dataka} options={{ headerShown: false }} />

            <Stack.Screen name="Fa16Pageka" component={Fa16pdfka} options={{ headerShown: false }} />
            <Stack.Screen name="Fa26Pageka" component={Fa26pdfka} options={{ headerShown: false }} />
            <Stack.Screen name="Fa36Pageka" component={Fa36pdfka} options={{ headerShown: false }} />
            <Stack.Screen name="Fa46Pageka" component={Fa46pdfka} options={{ headerShown: false }} />
            <Stack.Screen name="Sa16Pageka" component={Sa16pdfka} options={{ headerShown: false }} />
            <Stack.Screen name="Sa26Pageka" component={Sa26pdfka} options={{ headerShown: false }} />
            <Stack.Screen name="Imp6Pageka" component={Imp6pdfka} options={{ headerShown: false }} />


            <Stack.Screen name="7thclass fa1ka" component={Fa17dataka} options={{ headerShown: false }} />
            <Stack.Screen name="7thclass fa2ka" component={Fa27dataka} options={{ headerShown: false }} />
            <Stack.Screen name="7thclass fa3ka" component={Fa37dataka} options={{ headerShown: false }} />
            <Stack.Screen name="7thclass fa4ka" component={Fa47dataka} options={{ headerShown: false }} />
            <Stack.Screen name="7thclass sa1ka" component={Sa17dataka} options={{ headerShown: false }} />
            <Stack.Screen name="7thclass sa2ka" component={Sa27dataka} options={{ headerShown: false }} />
            <Stack.Screen name="7thclass impka" component={Imp7dataka} options={{ headerShown: false }} />

            <Stack.Screen name="Fa17Pageka" component={Fa17pdfka} options={{ headerShown: false }} />
            <Stack.Screen name="Fa27Pageka" component={Fa27pdfka} options={{ headerShown: false }} />
            <Stack.Screen name="Fa37Pageka" component={Fa37pdfka} options={{ headerShown: false }} />
            <Stack.Screen name="Fa47Pageka" component={Fa47pdfka} options={{ headerShown: false }} />
            <Stack.Screen name="Sa17Pageka" component={Sa17pdfka} options={{ headerShown: false }} />
            <Stack.Screen name="Sa27Pageka" component={Sa27pdfka} options={{ headerShown: false }} />
            <Stack.Screen name="Imp7Pageka" component={Imp7pdfka} options={{ headerShown: false }} />


            <Stack.Screen name="8thclass fa1ka" component={Fa18dataka} options={{ headerShown: false }} />
            <Stack.Screen name="8thclass fa2ka" component={Fa28dataka} options={{ headerShown: false }} />
            <Stack.Screen name="8thclass fa3ka" component={Fa38dataka} options={{ headerShown: false }} />
            <Stack.Screen name="8thclass fa4ka" component={Fa48dataka} options={{ headerShown: false }} />
            <Stack.Screen name="8thclass sa1ka" component={Sa18dataka} options={{ headerShown: false }} />
            <Stack.Screen name="8thclass sa2ka" component={Sa28dataka} options={{ headerShown: false }} />
            <Stack.Screen name="8thclass impka" component={Imp8dataka} options={{ headerShown: false }} />

            <Stack.Screen name="Fa18Pageka" component={Fa18pdfka} options={{ headerShown: false }} />
            <Stack.Screen name="Fa28Pageka" component={Fa28pdfka} options={{ headerShown: false }} />
            <Stack.Screen name="Fa38Pageka" component={Fa38pdfka} options={{ headerShown: false }} />
            <Stack.Screen name="Fa48Pageka" component={Fa48pdfka} options={{ headerShown: false }} />
            <Stack.Screen name="Sa18Pageka" component={Sa18pdfka} options={{ headerShown: false }} />
            <Stack.Screen name="Sa28Pageka" component={Sa28pdfka} options={{ headerShown: false }} />
            <Stack.Screen name="Imp8Pageka" component={Imp8pdfka} options={{ headerShown: false }} />

            <Stack.Screen name="9thclass fa1ka" component={Fa19dataka} options={{ headerShown: false }} />
            <Stack.Screen name="9thclass fa2ka" component={Fa29dataka} options={{ headerShown: false }} />
            <Stack.Screen name="9thclass fa3ka" component={Fa39dataka} options={{ headerShown: false }} />
            <Stack.Screen name="9thclass fa4ka" component={Fa49dataka} options={{ headerShown: false }} />
            <Stack.Screen name="9thclass sa1ka" component={Sa19dataka} options={{ headerShown: false }} />
            <Stack.Screen name="9thclass sa2ka" component={Sa29dataka} options={{ headerShown: false }} />
            <Stack.Screen name="9thclass impka" component={Imp9dataka} options={{ headerShown: false }} />


            <Stack.Screen name="Fa19Pageka" component={Fa19pdfka} options={{ headerShown: false }} />
            <Stack.Screen name="Fa29Pageka" component={Fa29pdfka} options={{ headerShown: false }} />
            <Stack.Screen name="Fa39Pageka" component={Fa39pdfka} options={{ headerShown: false }} />
            <Stack.Screen name="Fa49Pageka" component={Fa49pdfka} options={{ headerShown: false }} />
            <Stack.Screen name="Sa19Pageka" component={Sa19pdfka} options={{ headerShown: false }} />
            <Stack.Screen name="Sa29Pageka" component={Sa29pdfka} options={{ headerShown: false }} />
            <Stack.Screen name="Imp9Pageka" component={Imp9pdfka} options={{ headerShown: false }} />

        </Stack.Navigator>






    );





};







export { MainStackNavigator1, };