// Every rule here comes from the official notice in `source`. Review each new recruitment cycle.
// Topic names stay in English because the exams and our questions are in English.
const LAST_VERIFIED = "2 Nov 2026";

const SSC_CGL_NOTICE =
  "https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_cgl_2025.pdf";
const SSC_JE_NOTICE =
  "https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_je_2026.pdf";
const IBPS_NOTICE =
  "https://www.ibps.in/wp-content/uploads/Detailed-Notification_CRP-PO-XVI_Final_V1_30.06.2026.pdf";

const REASONING_GA = [
  {
    title: "General Intelligence and Reasoning",
    topics: ["Analogies", "Classification", "Number and figural series", "Coding and decoding", "Space visualization", "Venn diagrams", "Problem solving", "Statement and conclusion"],
  },
  {
    title: "General Awareness",
    topics: ["Current events", "History and culture", "Geography", "Economic scene", "General polity", "Scientific research"],
  },
];

export const JOB_EXAMS = [
  {
    id: "ssc-cgl",
    name: "SSC CGL",
    full: "Combined Graduate Level Examination",
    color: "#2B6A8F",
    icon: "business",
    verified: true,
    source: SSC_CGL_NOTICE,
    lastVerified: LAST_VERIFIED,
    notice: "Notice for 2026",
    cutoff: "1 Aug 2026",
    rule: { type: "any" },
    finalYear: "can_apply",
    ageMin: 18,
    ageMax: 32,
    ageText: "18 to 32 years, depending on the post",
    about: "Central government jobs in departments such as Income Tax, Customs and Audit.",
    notes: [
      "Age limits are 18-27, 20-30, 18-30 or 18-32 years depending on the post.",
      "Junior Statistical Officer needs 60% in 12th Maths, or Statistics in your degree.",
      "Statistical Investigator needs a degree in specific subjects such as Statistics, Maths, Economics or Computer Science.",
      "State cadre audit and accounts posts need proficiency in the state's language.",
    ],
    syllabus: [
      {
        title: "Tier 1: General Intelligence and Reasoning",
        topics: ["Analogies", "Classification", "Series", "Coding and decoding", "Venn diagrams", "Space orientation", "Drawing inferences", "Critical thinking"],
      },
      {
        title: "Tier 1: General Awareness",
        topics: ["Current events", "History and culture", "Geography", "Economic scene", "General policy", "Scientific research"],
      },
      {
        title: "Tier 1: Quantitative Aptitude",
        topics: ["Number system", "Percentage", "Ratio and proportion", "Averages", "Interest", "Profit, loss and discount", "Time and distance", "Time and work", "Algebra", "Geometry", "Mensuration", "Trigonometry", "Data interpretation"],
      },
      {
        title: "Tier 1: English Comprehension",
        topics: ["Correct English", "Comprehension"],
      },
    ],
    pattern: [
      {
        title: "Tier 1",
        rows: [
          "General Intelligence and Reasoning: 25 questions, 50 marks",
          "General Awareness: 25 questions, 50 marks",
          "Quantitative Aptitude: 25 questions, 50 marks",
          "English Comprehension: 25 questions, 50 marks",
        ],
        time: "1 hour",
        negative: "0.50 marks for each wrong answer",
      },
      {
        title: "Tier 2, Paper 1",
        rows: [
          "Mathematical Abilities: 30 questions, 90 marks",
          "Reasoning and General Intelligence: 30 questions, 90 marks",
          "English Language and Comprehension: 45 questions, 135 marks",
          "General Awareness: 25 questions, 75 marks",
          "Computer Knowledge: 20 questions, 60 marks",
          "Data Entry Speed Test: one task",
        ],
        time: "2 hours 15 minutes, then 15 minutes",
        negative: "1 mark for each wrong answer, except the Data Entry test",
      },
      {
        title: "Tier 2, Papers 2 and 3",
        rows: [
          "Paper 2, Statistics: 100 questions, 200 marks, only for JSO and Statistical Investigator",
          "Paper 3, General Studies: 100 questions, 200 marks, only for Audit and Accounts Officer",
        ],
        time: "2 hours each",
        negative: "0.50 marks for each wrong answer",
      },
    ],
  },
  {
    id: "ibps-po",
    name: "IBPS PO",
    full: "Probationary Officer in public sector banks",
    color: "#17694F",
    icon: "cash",
    verified: true,
    source: IBPS_NOTICE,
    lastVerified: LAST_VERIFIED,
    notice: "CRP PO/MT-XVI",
    cutoff: "21 Jul 2026",
    rule: { type: "any" },
    finalYear: "after_result",
    ageMin: 20,
    ageMax: 30,
    ageText: "20 to 30 years",
    about: "Officer jobs in public sector banks. These are banks, not central government offices.",
    notes: [
      "You must already be a graduate on the day you register.",
      "IBPS lists the sections of the exam but does not publish a detailed topic list.",
    ],
    syllabus: [
      {
        title: "Preliminary",
        topics: ["English Language", "Quantitative Aptitude", "Reasoning Ability"],
      },
      {
        title: "Main",
        topics: ["Reasoning", "General, Economy and Banking Awareness", "English Language", "Data Analysis and Interpretation", "Descriptive: essay and comprehension"],
      },
    ],
    pattern: [
      {
        title: "Preliminary",
        rows: [
          "English Language: 30 questions, 30 marks, 20 minutes",
          "Quantitative Aptitude: 35 questions, 30 marks, 20 minutes",
          "Reasoning Ability: 35 questions, 40 marks, 20 minutes",
        ],
        time: "60 minutes",
        negative: "0.25 of the question's marks for each wrong answer",
      },
      {
        title: "Main",
        rows: [
          "Reasoning: 40 questions, 60 marks, 45 minutes",
          "General, Economy and Banking Awareness: 50 questions, 60 marks, 35 minutes",
          "English Language: 40 questions, 20 marks, 35 minutes",
          "Data Analysis and Interpretation: 40 questions, 60 marks, 45 minutes",
          "Descriptive: 2 questions, 25 marks, 30 minutes",
        ],
        time: "3 hours 10 minutes",
        negative: "0.25 of the question's marks for each wrong objective answer",
      },
      {
        title: "Interview",
        rows: ["100 marks. You must also take a Personality Test, which does not count towards qualifying."],
      },
    ],
  },
  {
    // The official notice could not be read yet, so nothing is claimed about this exam.
    id: "rrb-ntpc-graduate",
    name: "RRB NTPC Graduate",
    full: "Railway non-technical graduate posts",
    color: "#8C2F4B",
    icon: "train",
    verified: false,
    source: "https://rrb.indianrailways.gov.in/",
    about: "Graduate-level jobs in Indian Railways.",
  },
  {
    id: "ssc-je",
    name: "SSC JE",
    full: "Junior Engineer Examination",
    color: "#46524B",
    icon: "construct",
    verified: true,
    source: SSC_JE_NOTICE,
    lastVerified: LAST_VERIFIED,
    notice: "Notice for 2026",
    cutoff: "22 Sep 2026",
    rule: {
      type: "branch",
      // Only the posts that accept a degree. Other posts in the notice need a diploma.
      posts: {
        civil: [
          { org: "Border Roads Organisation", age: 30 },
          { org: "Central Water Commission", age: 30 },
          { org: "Military Engineer Services", age: 30 },
          { org: "DG Lighthouses and Lightships", age: 32 },
          { org: "Ministry of Fisheries, Animal Husbandry and Dairying", age: 30 },
        ],
        mechanical: [
          { org: "Border Roads Organisation", age: 30 },
          { org: "Central Water Commission", age: 30 },
          { org: "DGQA Naval", age: 30 },
          { org: "Military Engineer Services", age: 30 },
        ],
        electrical: [
          { org: "Border Roads Organisation", age: 30 },
          { org: "DGQA Naval", age: 30 },
          { org: "Military Engineer Services", age: 30 },
          { org: "DG Lighthouses and Lightships", age: 32 },
        ],
      },
    },
    finalYear: "after_result",
    ageMin: 18,
    ageText: "Up to 30 years, or 32 for some posts",
    about: "Junior Engineer jobs in central government departments.",
    notes: [
      "Many other posts, such as those in CPWD, ask for a diploma, so a degree alone does not cover them.",
      "Other SSC JE posts, Telecom and Scientific Assistant, accept some other degrees. Check the notice.",
    ],
    commonSyllabus: REASONING_GA,
    syllabusByBranch: {
      civil: {
        title: "Civil Engineering",
        topics: ["Engineering Mechanics", "Solid Mechanics", "Structural Analysis", "Construction Materials and Management", "Estimating, Costing and Valuation", "Concrete Structures", "Steel Structures", "Surveying", "Soil Mechanics", "Fluid Mechanics and Hydraulics", "Hydrology and Irrigation", "Environmental Engineering", "Transportation Engineering"],
      },
      electrical: {
        title: "Electrical Engineering",
        topics: ["Fundamentals of Electrical Engineering", "Magnetic Circuits", "A.C. Fundamentals", "Measurement and Instruments", "Electrical Machines", "Special Machines and Synchronous Generators", "Generation, Transmission and Distribution", "Estimation and Costing", "Utilization of Electrical Energy", "Basic Electronics", "Power Electronics"],
      },
      mechanical: {
        title: "Mechanical Engineering",
        topics: ["Engineering Mechanics", "Strength of Materials", "Theory of Machines", "Machine Design", "Materials Science", "Thermal Engineering", "Fluid Mechanics and Hydraulic Machinery", "Industrial Engineering", "Manufacturing Engineering", "Metrology and Measurement", "Advanced Manufacturing Processes"],
      },
    },
    pattern: [
      {
        title: "Paper 1",
        rows: [
          "General Intelligence and Reasoning: 50 questions, 50 marks",
          "General Awareness: 50 questions, 50 marks",
          "General Engineering for your branch: 100 questions, 100 marks",
        ],
        time: "2 hours. This paper is qualifying.",
        negative: "0.25 marks for each wrong answer",
      },
      {
        title: "Paper 2",
        rows: ["General Engineering for your branch: 100 questions, 300 marks"],
        time: "2 hours",
        negative: "1 mark for each wrong answer",
      },
    ],
  },
];

export const COURSES = [
  { id: "ba", label: "BA" },
  { id: "bcom", label: "B.Com" },
  { id: "bsc", label: "B.Sc", subjects: true },
  { id: "bba", label: "BBA" },
  { id: "bca", label: "BCA" },
  { id: "btech", label: "B.Tech" },
  { id: "mbbs", label: "MBBS" },
  { id: "nursing", label: "B.Sc Nursing" },
  { id: "pharmacy", label: "B.Pharm" },
  { id: "llb", label: "LLB" },
  { id: "agri", label: "B.Sc Agriculture" },
  { id: "masters", label: "Master's degree" },
  { id: "other", label: "Other degree" },
];

export const BRANCHES = [
  { id: "civil", label: "Civil" },
  { id: "mechanical", label: "Mechanical" },
  { id: "electrical", label: "Electrical" },
  { id: "eee", label: "EEE" },
  { id: "ece", label: "ECE" },
  { id: "cse", label: "CSE" },
  { id: "it", label: "IT" },
  { id: "aiml", label: "AI, ML, Data Science" },
  { id: "chemical", label: "Chemical" },
  { id: "other", label: "Other" },
];

export const BSC_SUBJECTS = [
  { id: "cs", label: "Computer Science" },
  { id: "maths", label: "Maths" },
  { id: "physics", label: "Physics" },
  { id: "chemistry", label: "Chemistry" },
  { id: "statistics", label: "Statistics" },
  { id: "electronics", label: "Electronics" },
  { id: "life", label: "Biology and Life Sciences" },
  { id: "other", label: "Other" },
];

export const INTER_GROUP_CHOICES = [
  { id: "mpc", label: "MPC" },
  { id: "bipc", label: "BiPC" },
  { id: "mec", label: "MEC" },
  { id: "cec", label: "CEC" },
  { id: "hec", label: "HEC" },
  { id: "other", label: "Other" },
];

// Quiz and preparation come in a later release; the Practice code stays ready behind this.
export const PRACTICE_ENABLED = false;

export const STAGES = [
  { id: "early", label: "Before final year" },
  { id: "final", label: "Final year" },
  { id: "completed", label: "Degree completed" },
];

export const examSyllabus = (exam, profile) => {
  if (exam.syllabus) return exam.syllabus;
  const branch = profile?.branch === "eee" ? "electrical" : profile?.branch;
  const own = exam.syllabusByBranch?.[branch];
  return [...(exam.commonSyllabus || []), ...(own ? [own] : Object.values(exam.syllabusByBranch || {}))];
};

export const topicKey = (section, topic) => `${section}::${topic}`;

// A student may change class after saving a profile, so a B.Tech profile can stop matching.
export const isProfileOutdated = (profile, classValue) =>
  Boolean(profile && classValue) &&
  ((classValue === "BTech") !== (profile.course === "btech") || (classValue === "Inter") !== (profile.course === "inter"));

export const goalProgress = (exam, goal, profile) => {
  const parts = examSyllabus(exam, profile);
  const total = parts.reduce((sum, part) => sum + part.topics.length, 0);
  const done = parts.reduce(
    (sum, part) => sum + part.topics.filter((topic) => goal.topicsDone[topicKey(part.title, topic)]).length,
    0
  );
  return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
};
