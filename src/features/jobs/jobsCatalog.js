// Every `verified` job was read from the official notice in `source`. Others say so on screen.
// accepts: any clause qualifies. Levels: tenth, inter, iti, diploma, degree, btech.
const CHECKED = "2 Nov 2026";
const SSC = "https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards";
const UPSC = "https://www.upsc.gov.in/sites/default/files";
const RRB = "https://rrb.indianrailways.gov.in/";
const ANY_DEGREE = [{ level: "degree" }, { level: "btech" }];

export const JOB_CATEGORIES = [
  { id: "state", label: "Your state", icon: "flag", color: "#C4481A" },
  { id: "central", label: "Central government", icon: "business", color: "#2B6A8F" },
  { id: "railways", label: "Railways", icon: "train", color: "#8C2F4B" },
  { id: "banks", label: "Banks", icon: "cash", color: "#17694F" },
  { id: "insurance", label: "Insurance", icon: "umbrella", color: "#2F5D8A" },
  { id: "teaching", label: "Teaching", icon: "book", color: "#6B4E9B" },
  { id: "defence", label: "Defence", icon: "shield-checkmark", color: "#46524B" },
  { id: "engineering", label: "Engineering", icon: "construct", color: "#8F5E00" },
  { id: "health", label: "Health", icon: "medkit", color: "#1C7C55" },
  { id: "law", label: "Law", icon: "document-text", color: "#7A3B2E" },
  { id: "agriculture", label: "Agriculture", icon: "leaf", color: "#4F7A28" },
  { id: "software", label: "Software", icon: "laptop", color: "#0F6E78" },
  { id: "higher", label: "Higher studies", icon: "school", color: "#14342A" },
];

const verified = (job) => ({ verified: true, lastVerified: CHECKED, ...job });
const unverified = (job) => ({ verified: false, ...job });
const company = (job) => ({ company: true, source: null, ...job });

export const JOBS = [
  // Central government
  verified({ id: "ssc-chsl", name: "SSC CHSL", full: "Combined Higher Secondary Level", category: "central", accepts: [{ level: "inter" }, ...ANY_DEGREE], finalYear: "can_apply", ageMin: 18, ageMax: 27, ageText: "18 to 27 years", qual: "12th pass in any group.", roles: ["Lower Division Clerk", "Junior Secretariat Assistant", "Data Entry Operator"], note: "Data Entry Operator posts in some ministries need 12th Science with Maths.", source: `${SSC}/Notice_of_adv_chsle_2026.pdf` }),
  verified({ id: "ssc-steno", name: "SSC Stenographer", full: "Grade C and D", category: "central", accepts: [{ level: "inter" }, ...ANY_DEGREE], finalYear: "after_result", ageMin: 18, ageMax: 30, ageText: "Grade C: 18 to 30. Grade D: 18 to 27.", qual: "12th pass in any group.", roles: ["Stenographer"], note: "There is also a shorthand skill test.", source: `${SSC}/Notice_of_adv_steno_2026.pdf` }),
  { id: "ssc-cgl", examId: "ssc-cgl", name: "SSC CGL", full: "Combined Graduate Level", category: "central", verified: true, accepts: ANY_DEGREE, roles: ["Inspector", "Assistant Section Officer", "Auditor"] },
  verified({ id: "ssc-capf", name: "SSC CAPF SI", full: "Sub Inspector in Delhi Police and CAPFs", category: "central", accepts: ANY_DEGREE, finalYear: "can_apply", ageMin: 20, ageMax: 25, ageText: "20 to 25 years", qual: "Any degree.", roles: ["Sub Inspector"], note: "SI (Fire) has different rules: B.Sc with Physics, Chemistry and Maths, or an engineering diploma, and age 18 to 30. Physical standards apply.", source: `${SSC}/Notice_of_adv_capf_2026.pdf` }),
  verified({ id: "upsc-cse", name: "UPSC Civil Services", full: "IAS, IPS, IFS and other services", category: "central", accepts: ANY_DEGREE, finalYear: "can_apply", ageMin: 21, ageMax: 32, ageText: "21 to 32 years", qual: "Any degree. Students awaiting results can write the Preliminary exam.", roles: ["IAS / IPS officer"], source: `${UPSC}/Notif-CSP-2026-Engl-060226Rev.pdf` }),
  verified({ id: "upsc-capf-ac", name: "UPSC CAPF AC", full: "Assistant Commandant in BSF, CRPF, CISF, ITBP, SSB", category: "central", accepts: ANY_DEGREE, finalYear: "can_apply", ageMin: 20, ageMax: 24, ageText: "20 years, and under 25", qual: "Any degree. Students awaiting results can apply, with proof of passing later.", roles: ["Assistant Commandant"], note: "Physical standards and efficiency tests apply.", source: "https://www.upsc.gov.in/sites/default/files/ExamNotifi_CAPF_AC_Exam_2026_Eng_20022026.pdf" }),
  verified({ id: "upsc-ifos", name: "UPSC Indian Forest Service", full: "Forest officer", category: "central", accepts: [{ level: "btech" }, { level: "degree", courses: ["bsc"], subjects: ["maths", "physics", "chemistry", "statistics", "life"] }], finalYear: "after_result", ageMin: 21, ageMax: 31, ageText: "21 years, and under 32", qual: "Engineering, Agriculture or Forestry degree, or a degree with one of: Animal Husbandry and Veterinary Science, Botany, Chemistry, Geology, Maths, Physics, Statistics, Zoology.", roles: ["Forest officer"], source: "https://www.upsc.gov.in/sites/default/files/Notif-IFSP-2026-Engl-060226Rev.pdf" }),
  unverified({ id: "ssc-selection", name: "SSC Selection Posts", full: "Many posts at 10th, 12th and degree level", category: "central", accepts: [{ level: "tenth" }], roles: ["Posts differ in each phase"], source: "https://ssc.gov.in" }),
  unverified({ id: "epfo", name: "EPFO", full: "Provident fund organisation", category: "central", accepts: ANY_DEGREE, roles: ["Enforcement Officer", "Social Security Assistant"], source: "https://www.epfindia.gov.in" }),
  unverified({ id: "fci", name: "FCI", full: "Food Corporation of India", category: "central", accepts: ANY_DEGREE, roles: ["Manager", "Assistant"], source: "https://fci.gov.in" }),
  unverified({ id: "ceptam", name: "DRDO CEPTAM", full: "Technical and admin posts in DRDO", category: "central", accepts: [{ level: "iti" }, { level: "diploma" }, { level: "degree", courses: ["bsc"] }], roles: ["Technician", "Senior Technical Assistant"], source: "https://drdo.gov.in" }),
  unverified({ id: "ssc-mts", name: "SSC MTS", full: "Multi Tasking Staff and Havaldar", category: "central", accepts: [{ level: "tenth" }], roles: ["Office assistant", "Havaldar"], source: "https://ssc.gov.in" }),
  unverified({ id: "ssc-gd", name: "SSC GD Constable", full: "Constable in armed police forces", category: "central", accepts: [{ level: "tenth" }], roles: ["Constable"], source: "https://ssc.gov.in" }),
  unverified({ id: "india-post-gds", name: "India Post GDS", full: "Gramin Dak Sevak", category: "central", accepts: [{ level: "tenth" }], roles: ["Branch Postmaster", "Postal worker"], source: "https://indiapostgdsonline.gov.in" }),

  // Railways: the official notices could not be read yet, so no eligibility is claimed.
  { id: "rrb-ntpc-graduate", examId: "rrb-ntpc-graduate", name: "RRB NTPC Graduate", full: "Graduate-level posts", category: "railways", verified: false, accepts: ANY_DEGREE, roles: ["Station master", "Goods guard", "Senior clerk"], source: RRB },
  unverified({ id: "rrb-ntpc-ug", name: "RRB NTPC Undergraduate", full: "12th-level posts", category: "railways", accepts: [{ level: "inter" }, ...ANY_DEGREE], roles: ["Ticket clerk", "Train clerk", "Clerk"], source: RRB }),
  unverified({ id: "rrb-group-d", name: "RRB Group D", full: "Level 1 posts", category: "railways", accepts: [{ level: "tenth" }], roles: ["Track maintainer", "Railway helper"], source: RRB }),
  unverified({ id: "rrb-alp-tech", name: "RRB ALP and Technician", full: "Loco pilot and technician posts", category: "railways", accepts: [{ level: "iti" }, { level: "diploma" }], roles: ["Assistant Loco Pilot", "Technician"], source: RRB }),
  unverified({ id: "rrb-je", name: "RRB JE", full: "Junior Engineer", category: "railways", accepts: [{ level: "diploma" }, { level: "btech" }], roles: ["Junior Engineer"], source: RRB }),

  // Banks
  { id: "ibps-po", examId: "ibps-po", name: "IBPS PO", full: "Probationary Officer", category: "banks", verified: true, accepts: ANY_DEGREE, roles: ["Bank officer"] },
  verified({ id: "ibps-clerk", name: "IBPS Clerk", full: "Customer Service Associate", category: "banks", accepts: ANY_DEGREE, finalYear: "after_result", ageMin: 20, ageMax: 28, ageText: "20 to 28 years", qual: "Any degree.", roles: ["Clerk"], note: "There is a local language proficiency test.", source: "https://www.ibps.in/wp-content/uploads/Notification_CRP_CSA_XVI-Final.pdf" }),
  verified({ id: "sbi-po", name: "SBI PO", full: "Probationary Officer", category: "banks", accepts: ANY_DEGREE, finalYear: "can_apply", ageMin: 21, ageMax: 30, ageText: "21 to 30 years", qual: "Any degree. Final-year students may apply, with proof of passing by the date in the notice.", roles: ["Bank officer"], note: "Selected candidates sign a service bond.", source: "https://sbi.bank.in/web/careers/probationary-officers" }),
  verified({ id: "rbi-grade-b", name: "RBI Grade B", full: "Officer in the Reserve Bank", category: "banks", accepts: ANY_DEGREE, finalYear: "after_result", marksRule: true, ageMin: 21, ageMax: 29, ageText: "21 years, and under 30", qual: "Any degree with at least 60% (50% for SC/ST/PwBD).", roles: ["RBI officer"], source: "https://opportunities.rbi.org.in/scripts/bs_viewcontent.aspx?Id=4997" }),

  verified({ id: "sbi-clerk", name: "SBI Clerk", full: "Junior Associate, Customer Support and Sales", category: "banks", accepts: ANY_DEGREE, finalYear: "can_apply", ageMin: 20, ageMax: 28, ageText: "20 to 28 years", qual: "Any degree. Final-year students may apply, with proof of passing by the date in the notice.", roles: ["Clerk"], note: "You apply for one state and must know its local language.", source: "https://sbi.bank.in/webfiles/uploads/files_2627/08/JA_2026_Detailed_Advt_Eng.pdf" }),
  verified({ id: "ibps-rrb-assistant", name: "IBPS RRB Office Assistant", full: "Clerk in regional rural banks", category: "banks", accepts: ANY_DEGREE, finalYear: "after_result", ageMin: 18, ageMax: 28, ageText: "18 to 28 years", qual: "Any degree, and the local language of the bank's area.", roles: ["Office Assistant"], source: "https://www.ibps.in/wp-content/uploads/CRP-RRBs-XV-notification.pdf" }),
  verified({ id: "ibps-rrb-officer", name: "IBPS RRB Officer Scale I", full: "Assistant Manager in regional rural banks", category: "banks", accepts: ANY_DEGREE, finalYear: "after_result", ageMin: 18, ageMax: 29, ageText: "Above 18, and below 30", qual: "Any degree. Preference goes to some subjects, such as Agriculture, IT, Management, Law, Economics or Accountancy.", roles: ["Assistant Manager"], note: "Scale II and III posts need work experience, so they are not fresher jobs.", source: "https://www.ibps.in/wp-content/uploads/CRP-RRBs-XV-notification.pdf" }),
  verified({ id: "ibps-so-it", name: "IBPS SO IT Officer", full: "Specialist Officer in public sector banks", category: "banks", accepts: [{ level: "btech", branches: ["cse", "it", "ece"] }], finalYear: "after_result", ageMin: 20, ageMax: 30, ageText: "20 to 30 years", qual: "4-year engineering degree in Computer Science, Computer Applications, IT or Electronics branches. A postgraduate degree in these subjects also qualifies.", roles: ["IT Officer"], source: "https://www.ibps.in/wp-content/uploads/Detailed-Notification-CRP-SPL-XVI_Final_V1_30.06.2026.pdf" }),
  verified({ id: "ibps-so-other", name: "IBPS SO other posts", full: "Agriculture, Law, HR, Marketing and Rajbhasha", category: "banks", accepts: [{ level: "degree", courses: ["other", "llb", "agri", "masters"] }], variesByNotice: true, ageMin: 20, ageMax: 30, ageText: "20 to 30 years", qual: "Agriculture needs a 4-year agriculture-related degree. Law needs an LL.B and Bar Council enrolment. Rajbhasha needs a postgraduate degree. Check HR and Marketing in the notification.", roles: ["Agricultural Field Officer", "Law Officer", "Rajbhasha Adhikari", "HR Officer", "Marketing Officer"], source: "https://www.ibps.in/wp-content/uploads/Detailed-Notification-CRP-SPL-XVI_Final_V1_30.06.2026.pdf" }),
  unverified({ id: "rbi-assistant", name: "RBI Assistant", full: "Clerk-level job in the Reserve Bank", category: "banks", accepts: ANY_DEGREE, roles: ["Assistant"], source: "https://opportunities.rbi.org.in" }),
  unverified({ id: "nabard-da", name: "NABARD Development Assistant", full: "National Bank for Agriculture and Rural Development", category: "banks", accepts: ANY_DEGREE, roles: ["Development Assistant"], source: "https://www.nabard.org" }),
  unverified({ id: "nabard-grade-a", name: "NABARD Grade A", full: "Assistant Manager", category: "banks", accepts: ANY_DEGREE, roles: ["Assistant Manager"], source: "https://www.nabard.org" }),
  unverified({ id: "sidbi-grade-a", name: "SIDBI Grade A", full: "Small Industries Development Bank", category: "banks", accepts: ANY_DEGREE, roles: ["Assistant Manager"], source: "https://www.sidbi.in" }),
  unverified({ id: "sbi-so", name: "SBI Specialist Officer", full: "Posts differ in each advertisement", category: "banks", accepts: ANY_DEGREE, roles: ["Specialist Officer"], source: "https://sbi.bank.in/web/careers/current-openings" }),

  // Insurance
  verified({ id: "lic-aao", name: "LIC AAO", full: "Assistant Administrative Officer, Generalist", category: "insurance", accepts: ANY_DEGREE, finalYear: "after_result", ageMin: 21, ageMax: 30, ageText: "21 to 30 years", qual: "Any degree. The result must be declared by the date in the notice. Rules read are from the 2025 notification.", roles: ["Administrative Officer"], note: "Specialist posts have other rules, such as a law degree with 50%.", source: "https://licindia.in/documents/d/guest/aao-generalist-notification-2025-final" }),
  unverified({ id: "lic-ado", name: "LIC ADO", full: "Apprentice Development Officer", category: "insurance", accepts: ANY_DEGREE, roles: ["Development Officer"], source: "https://licindia.in" }),
  unverified({ id: "general-insurance-ao", name: "General insurance AO", full: "NIACL, Oriental, National, United India, GIC", category: "insurance", accepts: ANY_DEGREE, roles: ["Administrative Officer"], source: "https://www.newindia.co.in" }),

  // Teaching
  unverified({ id: "kvs-nvs", name: "KVS and NVS teacher", full: "Central government school teacher", category: "teaching", accepts: ANY_DEGREE, qual: "Posts differ by subject. Most need a degree in the subject with B.Ed or a similar teaching course, and some need CTET.", roles: ["TGT", "PGT", "PRT"], source: "https://kvsangathan.nic.in" }),
  unverified({ id: "ctet", name: "CTET", full: "Central Teacher Eligibility Test", category: "teaching", accepts: ANY_DEGREE, qual: "Rules follow NCTE and depend on your teaching course. Passing CTET is not itself a job.", roles: ["Teaching eligibility"], source: "https://ctet.nic.in/eligibility-criteria/" }),

  // Your state: shown only to students of that state.
  unverified({ id: "appsc-group1", name: "APPSC Group 1", full: "Deputy Collector, DSP and other top state posts", category: "state", states: ["Andhra Pradesh"], accepts: ANY_DEGREE, qual: "Usually a degree. Check the post table in each notification.", roles: ["Deputy Collector", "Deputy Superintendent of Police"], source: "https://portal-psc.ap.gov.in/" }),
  unverified({ id: "appsc-group2", name: "APPSC Group 2", full: "State executive and non-executive posts", category: "state", states: ["Andhra Pradesh"], accepts: ANY_DEGREE, roles: ["State government officer"], source: "https://portal-psc.ap.gov.in/" }),
  unverified({ id: "ap-secretariat", name: "AP Grama and Ward Sachivalayam", full: "Village and ward secretariat posts", category: "state", states: ["Andhra Pradesh"], accepts: ANY_DEGREE, roles: ["Secretariat staff"], source: "https://portal-psc.ap.gov.in/" }),
  unverified({ id: "ap-police", name: "AP Police SI and Constable", full: "State Level Police Recruitment Board", category: "state", states: ["Andhra Pradesh"], accepts: [{ level: "inter" }, ...ANY_DEGREE], qual: "SI usually needs a degree and Constable usually needs 12th. Physical tests apply.", roles: ["Sub Inspector", "Constable"], source: "https://slprb.ap.gov.in" }),
  verified({ id: "ap-power-aee", name: "AP Power AEE", full: "Assistant Executive Engineer in APSPDCL, APEPDCL, APCPDCL, APTRANSCO, APGENCO", category: "state", states: ["Andhra Pradesh"], accepts: [{ level: "btech", branches: ["electrical", "eee", "ece", "civil"] }], finalYear: "after_result", ageMin: 18, ageMax: 42, ageText: "18 to 42 years", qual: "Engineering degree in Electrical or EEE, Telecom or Electronics, or Civil, depending on the post.", roles: ["Assistant Executive Engineer"], source: "https://apspdcl.in/files/pdf/FINAL%20WEBSITE%20NOTIFICATION%20OF%20AEEs%20RECRUITMENT%2024.06.2026.pdf" }),
  unverified({ id: "ap-power-other", name: "AP Power other posts", full: "Sub Engineer, Junior Assistant, Lineman", category: "state", states: ["Andhra Pradesh"], accepts: [{ level: "iti" }, { level: "diploma" }, { level: "inter" }, ...ANY_DEGREE], roles: ["Sub Engineer", "Junior Assistant", "Lineman"], source: "https://www.apspdcl.in/careers.php" }),
  unverified({ id: "tgpsc-group1", name: "TGPSC Group 1", full: "Top Telangana state posts", category: "state", states: ["Telangana"], accepts: ANY_DEGREE, roles: ["State government officer"], source: "https://websitenew.tgpsc.gov.in" }),
  unverified({ id: "tgpsc-group2", name: "TGPSC Group 2 and 3", full: "State government posts", category: "state", states: ["Telangana"], accepts: ANY_DEGREE, roles: ["State government officer"], source: "https://websitenew.tgpsc.gov.in" }),
  unverified({ id: "tgpsc-group4", name: "TGPSC Group 4", full: "Junior Assistant and similar posts", category: "state", states: ["Telangana"], accepts: [{ level: "inter" }, ...ANY_DEGREE], roles: ["Junior Assistant"], source: "https://websitenew.tgpsc.gov.in" }),
  verified({ id: "tg-police-si", name: "Telangana Police SI", full: "Sub Inspector, Telangana Police Recruitment Board", category: "state", states: ["Telangana"], accepts: ANY_DEGREE, finalYear: "after_result", ageText: "General rule 21 to 25, and the 2026 notification adds relaxations. Check your category.", qual: "Any degree. Physical tests apply.", roles: ["Sub Inspector"], source: "https://www.tgprb.in/SI_PC_2026/SI%20(Civil%20et%20al)%202026%20Notification%20dated%2029-07-2026.pdf" }),
  verified({ id: "tg-police-pc", name: "Telangana Police Constable", full: "Telangana Police Recruitment Board", category: "state", states: ["Telangana"], accepts: [{ level: "inter" }, ...ANY_DEGREE], finalYear: "after_result", ageText: "General rule 18 to 22, and the 2026 notification adds relaxations. Check your category.", qual: "Intermediate or equivalent. Physical tests apply.", roles: ["Police Constable"], source: "https://doc.tgprb.in/PC+(Civil+et+al)+2026+Notification+dated+29-07-2026.pdf" }),
  unverified({ id: "tg-power", name: "Telangana Power jobs", full: "TGSPDCL, TGNPDCL, TGGENCO, TGTRANSCO", category: "state", states: ["Telangana"], accepts: [{ level: "iti" }, { level: "diploma" }, { level: "btech" }, ...ANY_DEGREE], roles: ["Assistant Engineer", "Sub Engineer", "Junior Lineman"], source: "https://tgsouthernpower.org" }),
  unverified({ id: "kpsc-gp", name: "KPSC Gazetted Probationers", full: "KAS and other Group A and B posts", category: "state", states: ["Karnataka"], accepts: ANY_DEGREE, qual: "A degree. Age limits are in each notification.", roles: ["State government officer"], source: "https://kpsc.kar.nic.in/notification.html" }),
  unverified({ id: "kpsc-fda", name: "KPSC FDA and SDA", full: "First and Second Division Assistant", category: "state", states: ["Karnataka"], accepts: [{ level: "inter" }, ...ANY_DEGREE], roles: ["First Division Assistant", "Second Division Assistant"], source: "https://kpsc.kar.nic.in/notification.html" }),
  unverified({ id: "ka-police", name: "Karnataka Police PSI and Constable", full: "Karnataka State Police", category: "state", states: ["Karnataka"], accepts: [{ level: "inter" }, ...ANY_DEGREE], roles: ["Sub Inspector", "Constable"], source: "https://ksp.karnataka.gov.in" }),
  unverified({ id: "ka-power", name: "Karnataka Power jobs", full: "KPTCL, BESCOM and other ESCOMs", category: "state", states: ["Karnataka"], accepts: [{ level: "iti" }, { level: "diploma" }, { level: "btech" }, ...ANY_DEGREE], roles: ["Assistant Engineer", "Junior Engineer", "Lineman"], source: "https://kptcl.karnataka.gov.in" }),
  unverified({ id: "ap-dsc", name: "AP DSC teacher", full: "Government school teacher", category: "teaching", states: ["Andhra Pradesh"], accepts: ANY_DEGREE, qual: "Teacher jobs need a teaching qualification such as D.El.Ed or B.Ed, and APTET or CTET.", roles: ["SGT", "School Assistant"], source: "https://cse.ap.gov.in" }),
  unverified({ id: "tg-dsc", name: "Telangana DSC teacher", full: "Government school teacher", category: "teaching", states: ["Telangana"], accepts: ANY_DEGREE, qual: "Teacher jobs need a teaching qualification such as D.El.Ed or B.Ed, and TET.", roles: ["SGT", "School Assistant"], source: "https://tgdsc.aptonline.in" }),
  unverified({ id: "ka-gpstr", name: "Karnataka GPSTR and HSTR", full: "Government school teacher", category: "teaching", states: ["Karnataka"], accepts: ANY_DEGREE, qual: "Teacher jobs need a teaching qualification such as D.El.Ed or B.Ed, and KARTET.", roles: ["Primary and high school teacher"], source: "https://schooleducation.karnataka.gov.in" }),

  // Private banks: each bank sets its own rules.
  company({ id: "icici-po", name: "ICICI Bank PO Program", full: "Fresher officer training", category: "banks", accepts: ANY_DEGREE, source: "https://www.icicicareers.com/CareerApplicant/Career/programs-listing", skills: "ICICI's listing asks for 60% in 10th and graduation, and age below 25. Check the current listing.", roles: ["Relationship and sales officer"] }),
  company({ id: "hdfc-rm", name: "HDFC Bank", full: "Relationship Manager and other roles", category: "banks", accepts: ANY_DEGREE, source: "https://www.hdfcbank.com", skills: "Its PO program notice we read was for people with sales experience, so check for fresher openings.", roles: ["Relationship Manager"] }),
  company({ id: "axis-kotak", name: "Axis, Kotak and other private banks", full: "Fresher and sales roles", category: "banks", accepts: ANY_DEGREE, source: "https://www.axisbank.com", skills: "Communication and sales skills. Rules differ by bank and job.", roles: ["Sales and service roles"] }),

  // Health, law and agriculture need their own degree.
  unverified({ id: "medical-officer", name: "Government doctor", full: "Medical Officer, including UPSC CMS", category: "health", accepts: [{ level: "degree", courses: ["mbbs"] }], qual: "MBBS with internship and registration.", roles: ["Medical Officer"], source: "https://www.upsc.gov.in" }),
  unverified({ id: "staff-nurse", name: "Staff Nurse", full: "Government hospitals and AIIMS", category: "health", accepts: [{ level: "degree", courses: ["nursing"] }], qual: "B.Sc Nursing or GNM with registration. Rules differ by recruiter.", roles: ["Nursing Officer", "Staff Nurse"], source: "https://indiannursingcouncil.org" }),
  unverified({ id: "pharmacist", name: "Government Pharmacist", full: "Hospitals, Railways, Drug Inspector", category: "health", accepts: [{ level: "degree", courses: ["pharmacy"] }], roles: ["Pharmacist", "Drug Inspector"], source: "https://pci.nic.in" }),
  unverified({ id: "judiciary", name: "Judicial Services", full: "State civil judge exam", category: "law", accepts: [{ level: "degree", courses: ["llb"] }], qual: "A law degree and enrolment as an advocate. Rules differ by state, and some need practice years.", roles: ["Civil Judge"], source: "https://www.barcouncilofindia.org" }),
  unverified({ id: "legal-officer", name: "Law Officer jobs", full: "Banks, PSUs, Coast Guard, LIC", category: "law", accepts: [{ level: "degree", courses: ["llb"] }], roles: ["Law Officer"], source: "https://www.barcouncilofindia.org" }),
  unverified({ id: "agri-officer", name: "Agriculture Officer", full: "State departments and banks", category: "agriculture", accepts: [{ level: "degree", courses: ["agri"] }], roles: ["Agriculture Officer", "Agricultural Field Officer"], source: "https://icar.org.in" }),

  // Defence
  verified({ id: "upsc-nda", name: "UPSC NDA", full: "National Defence Academy, after 12th", category: "defence", accepts: [{ level: "inter", onlyLevel: true }], finalYear: "can_apply", ageMin: 16.5, ageMax: 19.5, ageText: "About 16.5 to 19.5 years. Check the birth dates in each notice.", qual: "12th pass for the Army. Air Force and Navy need Physics, Chemistry and Maths.", roles: ["Defence officer"], note: "You must be unmarried.", source: `${UPSC}/Notif-NDA-II-2026-Engl-200526.pdf` }),
  verified({ id: "upsc-cds", name: "UPSC CDS", full: "Combined Defence Services, after a degree", category: "defence", accepts: ANY_DEGREE, finalYear: "can_apply", ageMin: 19, ageMax: 25, ageText: "19 to 25 years, depending on the academy", qual: "Any degree for IMA and OTA. Navy needs Engineering or B.Sc with Physics. Air Force needs Physics and Maths at 12th level, or Engineering.", roles: ["Defence officer"], source: `${UPSC}/Notif-CDS-II-2026-Engl-200526.pdf` }),
  verified({ id: "afcat", name: "AFCAT", full: "Air Force officer entry", category: "defence", accepts: ANY_DEGREE, finalYear: "can_apply", marksRule: true, ageMin: 20, ageMax: 26, ageText: "Flying: 20 to 24. Ground duty: 20 to 26.", qual: "A degree with at least 60%. Flying and technical branches also need 50% each in 12th Physics and Maths. Technical branches need a 4-year engineering degree. Final-year students can apply with no backlog and at least 60% so far.", roles: ["Air Force officer"], note: "You must be unmarried when training starts.", source: "https://afcat.edcil.co.in/assets/images/news/AFCAT_02_2025/Notification_AFCAT_01-2026.pdf" }),
  unverified({ id: "icg-navik", name: "Coast Guard Navik", full: "Sailor entry", category: "defence", accepts: [{ level: "inter", groups: ["mpc"] }], ageMin: 18, ageMax: 22, ageText: "18 to 22 years", qual: "General Duty: 12th with Maths and Physics. Domestic Branch: 10th pass.", roles: ["Navik"], source: "https://joinindiancoastguard.gov.in/sailorentry.html" }),
  unverified({ id: "icg-yantrik", name: "Coast Guard Yantrik", full: "Technical sailor entry", category: "defence", accepts: [{ level: "diploma" }], ageMin: 18, ageMax: 22, ageText: "18 to 22 years", qual: "An AICTE-approved engineering diploma in specified branches.", roles: ["Yantrik"], source: "https://joinindiancoastguard.gov.in/sailorentry.html" }),
  unverified({ id: "icg-ac", name: "Coast Guard Assistant Commandant", full: "Officer entry", category: "defence", accepts: ANY_DEGREE, ageText: "Usually 21 to 25, and it differs by branch", qual: "General Duty: a degree, with Maths and Physics up to 12th. Pilot, Technical and Law branches have other rules.", roles: ["Assistant Commandant"], source: "https://joinindiancoastguard.cdac.in/cgcat/careerOpportunity/assistantCommandant/gd" }),
  unverified({ id: "navy-officer", name: "Navy officer and sailor entries", full: "Indian Navy", category: "defence", accepts: [{ level: "inter", groups: ["mpc"] }, { level: "btech" }], roles: ["Naval officer", "Sailor"], source: "https://www.joinindiannavy.gov.in" }),
  unverified({ id: "army-tes-tgc", name: "Army TES and TGC", full: "Technical entries after 12th or B.Tech", category: "defence", accepts: [{ level: "inter", groups: ["mpc"] }, { level: "btech" }], roles: ["Army officer"], source: "https://joinindianarmy.nic.in" }),
  unverified({ id: "agniveer", name: "Agniveer", full: "Army, Navy and Air Force", category: "defence", accepts: [{ level: "tenth" }], roles: ["Armed forces"], source: "https://joinindianarmy.nic.in" }),

  // Engineering
  { id: "ssc-je", examId: "ssc-je", name: "SSC JE", full: "Junior Engineer, degree posts", category: "engineering", verified: true, accepts: [{ level: "btech", branches: ["civil", "mechanical", "electrical", "eee"] }], roles: ["Junior Engineer"] },
  verified({ id: "ssc-je-diploma", name: "SSC JE", full: "Junior Engineer, diploma posts", category: "engineering", accepts: [{ level: "diploma", branches: ["civil", "mechanical", "electrical", "eee"] }], finalYear: "after_result", ageText: "Up to 30 years, or 32 for some posts", qual: "Diploma in Civil, Mechanical or Electrical. Some organisations also need 2 or 3 years of experience after the diploma.", roles: ["Junior Engineer"], note: "CPWD and several other organisations take a diploma with no experience.", source: `${SSC}/Notice_of_adv_je_2026.pdf` }),
  verified({ id: "upsc-ese", name: "UPSC ESE", full: "Engineering Services", category: "engineering", accepts: [{ level: "btech", branches: ["civil", "mechanical", "electrical", "eee", "ece"] }], finalYear: "can_apply", ageMin: 21, ageMax: 29, ageText: "21 years, and under 30", qual: "A degree in Engineering. Students awaiting their result can apply, but must show proof of passing later.", roles: ["Group A engineering officer"], note: "The exam is held for Civil, Mechanical, Electrical, and Electronics and Telecommunication.", source: `${UPSC}/Notif-ESEP-26-Engl.pdf` }),
  verified({ id: "powergrid-et", name: "POWERGRID Engineer Trainee", full: "Through GATE 2027", category: "engineering", accepts: [{ level: "btech", branches: ["electrical", "eee", "ece", "civil", "cse"] }], finalYear: "can_apply", marksRule: true, ageMax: 28, ageText: "Up to 28 years", qual: "Full-time B.E./B.Tech with at least 60% in Electrical, Electronics, Civil or Computer Science, and a GATE score. Final-year students expecting results in time can apply.", roles: ["Engineer Trainee"], source: "https://www.powergrid.in/sites/default/files/job_opportunities_document/ET2027_Detailed_Advertisement_For%20Website_1.pdf" }),
  unverified({ id: "psu-ntpc", name: "NTPC Executive Trainee", full: "Power", category: "engineering", accepts: [{ level: "btech" }], roles: ["Engineer Trainee"], source: "https://careers.ntpc.co.in" }),
  unverified({ id: "psu-ongc", name: "ONGC Graduate Trainee", full: "Oil and gas", category: "engineering", accepts: [{ level: "btech" }], roles: ["Engineer Trainee"], source: "https://ongcindia.com/web/eng/career/recruitment-notice" }),
  unverified({ id: "psu-iocl", name: "IOCL Engineer", full: "Oil", category: "engineering", accepts: [{ level: "btech" }], roles: ["Engineer Trainee"], source: "https://iocl.com" }),
  unverified({ id: "psu-bhel", name: "BHEL Engineer Trainee", full: "Heavy electricals", category: "engineering", accepts: [{ level: "btech" }], roles: ["Engineer Trainee"], source: "https://careers.bhel.in" }),
  unverified({ id: "psu-sail", name: "SAIL Management Trainee", full: "Steel", category: "engineering", accepts: [{ level: "btech" }], roles: ["Engineer Trainee"], source: "https://sail.co.in" }),
  unverified({ id: "psu-coal-india", name: "Coal India Management Trainee", full: "Coal", category: "engineering", accepts: [{ level: "btech" }], roles: ["Engineer Trainee"], source: "https://www.coalindia.in/career-cil/jobs-coal-india/recruitment-of-management-trainee-through-computer-based-test-cbt-26/" }),
  unverified({ id: "psu-npcil", name: "NPCIL Executive Trainee", full: "Nuclear power", category: "engineering", accepts: [{ level: "btech" }], roles: ["Engineer Trainee"], source: "https://www.npcilcareers.co.in" }),
  unverified({ id: "psu-hal", name: "HAL Management Trainee", full: "Aircraft", category: "engineering", accepts: [{ level: "btech" }], roles: ["Engineer Trainee"], source: "https://hal-india.co.in" }),
  unverified({ id: "psu-bel", name: "BEL Engineer", full: "Defence electronics", category: "engineering", accepts: [{ level: "btech" }], roles: ["Engineer Trainee"], source: "https://bel-india.in" }),
  unverified({ id: "psu-apprentice", name: "PSU Apprentices", full: "Training posts for ITI, diploma and degree students", category: "engineering", accepts: [{ level: "iti" }, { level: "diploma" }, { level: "btech" }], roles: ["Apprentice"], source: "https://ongcindia.com/web/eng/career/recruitment-notice" }),
  unverified({ id: "psu-gate", name: "Other PSU engineer jobs", full: "NTPC, ONGC, IOCL, BHEL, BEL and others", category: "engineering", accepts: [{ level: "btech" }], qual: "Each PSU announces its own branches, marks and GATE paper. IOCL's GATE 2024 notice, for example, asked for 65%.", roles: ["Graduate Engineer Trainee"], source: "https://iocl.com" }),
  verified({ id: "isro-sc", name: "ISRO Scientist/Engineer SC", full: "Space research", category: "engineering", accepts: [{ level: "btech" }], variesByNotice: true, ageMax: 28, ageText: "Up to 28 years for the general category", qual: "B.E./B.Tech with at least 65% or CGPA 6.84/10, finished within the normal course period. Only the branches listed in each advertisement can apply, and GATE-based posts need the matching GATE paper.", roles: ["Scientist / Engineer"], source: "https://www.isro.gov.in/CareerOpportunities.html" }),
  verified({ id: "gate", name: "GATE", full: "Exam for Master's and PhD admission, used by some PSUs", category: "higher", accepts: ANY_DEGREE, finalYear: "can_apply", fromThirdYear: true, ageText: "There is no age limit", qual: "BA, B.Com and B.Sc: third year or completed. B.Tech: third year or later, or completed.", roles: ["Master's and PhD admission", "Some PSU recruitment"], note: "This is an exam, not a job, and passing it does not assure a job. Arts and Humanities students take the Humanities and Social Sciences (XH) paper. Each PSU sets its own rules, and PSU engineering posts are not open to every degree. Rules read are for GATE 2026.", source: "https://gate2026.iitg.ac.in/doc/IB/GATE2026-IB-10102025.pdf" }),

  // Software: companies set their own rules, so nothing here is an official rule.
  company({ id: "software-dev", name: "Software developer", full: "Building apps and websites", category: "software", accepts: [{ level: "btech" }, { level: "degree", courses: ["bca"] }, { level: "degree", courses: ["bsc"], subjects: ["cs", "maths", "statistics", "physics", "electronics"] }], roles: ["Software engineer", "Web developer", "App developer"], skills: "Coding, data structures, projects you can show." }),
  company({ id: "data-analyst", name: "Data analyst", full: "Finding answers in data", category: "software", accepts: ANY_DEGREE, roles: ["Data analyst", "Business analyst"], skills: "Excel, SQL, statistics." }),
  company({ id: "qa-tester", name: "Software tester", full: "Checking that software works", category: "software", accepts: ANY_DEGREE, roles: ["QA tester"], skills: "Testing basics, some scripting." }),
  company({ id: "it-support", name: "IT support", full: "Helping people with computers and networks", category: "software", accepts: [...ANY_DEGREE, { level: "diploma" }], roles: ["IT support engineer"], skills: "Networking and operating system basics." }),
];

const BTECH = (id, name) => ({ id: `btech-${id}`, name, profile: { course: "btech", branch: id }, duration: "4 years", join: "12th with Maths, Physics and Chemistry, through an entrance exam such as EAPCET or JEE. Rules differ by state and college." });
const BSC = (id, name) => ({ id: `bsc-${id}`, name, profile: { course: "bsc", branch: id }, duration: "3 years", join: "12th with related science subjects. Rules differ by college." });
const DEGREE = (id, name, join) => ({ id, name, profile: { course: id }, duration: "3 years", join });

export const COURSE_GROUPS = [
  {
    title: "Practical courses",
    courses: [
      { id: "iti", name: "ITI", profile: { course: "iti" }, duration: "1 to 2 years", join: "Usually joined after 10th. Inter students can also join." },
      { id: "polytechnic", name: "Polytechnic diploma", profile: { course: "polytechnic" }, duration: "3 years", join: "Usually joined after 10th. Some states allow direct second-year entry after Inter or ITI, so check your state." },
    ],
  },
  {
    title: "Degree",
    courses: [
      DEGREE("ba", "BA", "12th in any group at most colleges."),
      DEGREE("bcom", "B.Com", "12th, often with Commerce. Rules differ by college."),
      DEGREE("bba", "BBA", "12th in any group at most colleges."),
      DEGREE("bca", "BCA", "12th in any group at many colleges, but some ask for Maths or Computer Science. Check before you apply."),
    ],
  },
  {
    title: "B.Sc",
    courses: [
      BSC("cs", "B.Sc Computer Science"), BSC("maths", "B.Sc Maths"), BSC("physics", "B.Sc Physics"), BSC("chemistry", "B.Sc Chemistry"),
      BSC("statistics", "B.Sc Statistics"), BSC("electronics", "B.Sc Electronics"), BSC("life", "B.Sc Biology and Life Sciences"),
    ],
  },
  {
    title: "Health",
    courses: [
      { id: "mbbs", name: "MBBS", profile: { course: "mbbs" }, duration: "About 5.5 years", join: "12th with Physics, Chemistry and Biology, through NEET UG. Check the NTA bulletin each year." },
      { id: "nursing", name: "B.Sc Nursing", profile: { course: "nursing" }, duration: "4 years", join: "12th with Physics, Chemistry, Biology and English, at least 45% in those science subjects (40% for SC/ST/OBC), and age 17 to 35." },
      { id: "pharmacy", name: "B.Pharm", profile: { course: "pharmacy" }, duration: "4 years", join: "12th with Physics and Chemistry, plus Maths or Biology, usually through a state entrance exam. Check your state." },
    ],
  },
  {
    title: "Law",
    courses: [
      { id: "llb", name: "LLB", profile: { course: "llb" }, duration: "3 or 5 years", join: "5-year BA LLB after 12th, or 3-year LLB after a degree, through a law entrance exam. Check the college." },
    ],
  },
  {
    title: "Agriculture",
    courses: [
      { id: "agri", name: "B.Sc Agriculture", profile: { course: "agri" }, duration: "4 years", join: "12th with science, usually through a state entrance exam or ICAR. Check your state." },
    ],
  },
  {
    title: "Master's",
    courses: [
      { id: "masters", name: "Master's degree", profile: { course: "masters" }, duration: "2 years", join: "A bachelor's degree, usually in a related subject. Some colleges use entrance exams." },
    ],
  },
  {
    title: "B.Tech",
    courses: [
      BTECH("cse", "B.Tech CSE"), BTECH("it", "B.Tech IT"), BTECH("aiml", "B.Tech AI, ML and Data Science"), BTECH("ece", "B.Tech ECE"),
      BTECH("eee", "B.Tech EEE"), BTECH("electrical", "B.Tech Electrical"), BTECH("mechanical", "B.Tech Mechanical"), BTECH("civil", "B.Tech Civil"),
      BTECH("chemical", "B.Tech Chemical"), BTECH("other", "B.Tech other branches"),
    ],
  },
];

export const findCourse = (id) => COURSE_GROUPS.flatMap((group) => group.courses).find((course) => course.id === id);

// A state job shows only to students of that state.
export const jobsForState = (stateBoard) => JOBS.filter((job) => !job.states || job.states.includes(stateBoard));
