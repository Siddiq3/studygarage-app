export const INTER_GROUPS = ["mpc", "bipc", "mec", "cec", "hec"];

export const BEST_BY_GROUP = {
  mpc: ["software", "engineer", "defence", "pharmacist"],
  bipc: ["doctor", "nurse", "pharmacist"],
  mec: ["ca", "bank"],
  cec: ["ca", "bank", "lawyer"],
  hec: ["ias", "teacher", "lawyer", "police"],
};

// Colour means field, so a student can find an area of interest without reading all 13.
export const GOAL_FIELDS = [
  { title: "Health", color: "#1C7C55", goals: ["doctor", "nurse", "pharmacist"] },
  { title: "Tech and engineering", color: "#2B6A8F", goals: ["software", "engineer", "technician"] },
  { title: "Serving the public", color: "#14342A", goals: ["teacher", "ias", "police", "defence"] },
  { title: "Money and law", color: "#8C2F4B", goals: ["ca", "bank", "lawyer"] },
];

export const goalColor = (id) => GOAL_FIELDS.find((field) => field.goals.includes(id))?.color;

const INTER = (group, subjects) => ({
  title: `Take ${group} in Inter`,
  detail: subjects,
  time: "2 years",
  isGroupStep: true,
});
const MPC = INTER("MPC", "Maths, Physics, Chemistry");
const BIPC = INTER("BiPC", "Biology, Physics, Chemistry");
const ANY = {
  title: "Pass Inter in any group",
  detail: "Pick the group you enjoy the most",
  time: "2 years",
  isGroupStep: true,
};

// A goal is what a student can picture. `groups` are the Inter groups that lead there;
// `anyGroup` means other groups are allowed too, `groups` are just the easiest route.
export const CAREER_GOALS = [
  {
    id: "doctor",
    title: "Doctor",
    icon: "medkit",
    color: "#1C7C55",
    plain: "Treats patients in hospitals and clinics.",
    groups: ["bipc"],
    steps: [
      BIPC,
      { title: "Write the NEET exam", detail: "Your rank decides your medical college", exams: ["NEET UG"], time: "During or after Inter" },
      { title: "Study MBBS", detail: "Includes one year of internship", time: "About 5.5 years" },
      { title: "Become a doctor", detail: "You can study MD or MS later to become a specialist" },
    ],
    backup: "MBBS seats are limited. BDS, B.Pharm, Nursing and Agriculture are good backups.",
  },
  {
    id: "software",
    title: "Software engineer",
    icon: "laptop",
    color: "#2B6A8F",
    plain: "Builds apps, websites and computer systems.",
    groups: ["mpc"],
    anyGroup: true,
    steps: [
      MPC,
      { title: "Write entrance exams", detail: "Your rank decides your college", exams: ["JEE Main", "EAPCET"], time: "During or after Inter" },
      { title: "Study B.Tech in Computer Science", time: "4 years" },
      { title: "Become a software engineer", detail: "Companies hire through campus placements and job applications" },
    ],
    // Without MPC the JEE route is closed, so these students get the BCA route instead.
    altSteps: [
      { title: "Study BCA", detail: "A computer degree open to any Inter group in most colleges", time: "3 years" },
      { title: "Build skills and projects", detail: "Coding practice matters as much as the degree" },
      { title: "Become a software developer" },
    ],
    backup: "Without MPC, BCA is the usual route. An MCA after it can help with bigger companies.",
  },
  {
    id: "engineer",
    title: "Engineer",
    icon: "construct",
    color: "#C4481A",
    plain: "Designs and builds roads, machines and power systems.",
    groups: ["mpc"],
    steps: [
      MPC,
      { title: "Write entrance exams", detail: "Your rank decides your college", exams: ["JEE Main", "EAPCET"], time: "During or after Inter" },
      { title: "Study B.Tech", detail: "Civil, Mechanical, Electrical and more", time: "4 years" },
      { title: "Become an engineer", detail: "In private companies, or government jobs through exams" },
    ],
    backup: "After 10th you can also take Polytechnic, then join B.Tech in second year through a state entrance exam.",
  },
  {
    id: "nurse",
    title: "Nurse",
    icon: "heart",
    color: "#8C2F4B",
    plain: "Cares for patients in hospitals.",
    groups: ["bipc"],
    steps: [
      BIPC,
      { title: "Apply for B.Sc Nursing", detail: "Through your state's nursing admission" },
      { title: "Study B.Sc Nursing", time: "4 years" },
      { title: "Become a staff nurse", detail: "In private or government hospitals" },
    ],
    backup: "Allied health courses such as lab technology are also worth exploring.",
  },
  {
    id: "pharmacist",
    title: "Pharmacist",
    icon: "flask",
    color: "#17694F",
    plain: "Prepares and gives out medicines, or works in drug companies.",
    groups: ["bipc", "mpc"],
    steps: [
      BIPC,
      { title: "Write your state entrance exam", exams: ["EAPCET"], time: "During or after Inter" },
      { title: "Study B.Pharm", time: "4 years" },
      { title: "Become a pharmacist", detail: "In hospitals, medical shops or pharma companies" },
    ],
    backup: "MPC students can usually apply too. Check your state's rules.",
  },
  {
    id: "teacher",
    title: "Teacher",
    icon: "school",
    color: "#9A6400",
    plain: "Teaches students in schools.",
    groups: ["hec", "mpc", "bipc", "mec", "cec"],
    anyGroup: true,
    steps: [
      ANY,
      { title: "Finish a degree", detail: "BA, B.Sc or B.Com in the subject you want to teach", time: "3 years" },
      { title: "Study B.Ed", detail: "The teacher training course", time: "2 years" },
      { title: "Write the teacher exams", exams: ["TET"] },
      { title: "Become a teacher" },
    ],
    backup: "Some primary teaching jobs need a D.El.Ed course after Inter instead.",
  },
  {
    id: "ias",
    title: "IAS or IPS officer",
    icon: "ribbon",
    color: "#14342A",
    plain: "Runs districts and government departments, or leads the police.",
    groups: ["hec", "mpc", "bipc", "mec", "cec"],
    anyGroup: true,
    steps: [
      ANY,
      { title: "Finish any degree", time: "3 years or more" },
      { title: "Prepare for the civil services exam", detail: "Very few are selected, and most people take years", exams: ["UPSC CSE"] },
      { title: "Become an IAS or IPS officer" },
    ],
    backup: "State exams give respected officer jobs too. Keep your degree useful as a backup.",
  },
  {
    id: "police",
    title: "Police officer",
    icon: "shield-checkmark",
    color: "#2B6A8F",
    plain: "Protects people and investigates crime.",
    groups: ["hec", "mpc", "bipc", "mec", "cec"],
    anyGroup: true,
    steps: [
      ANY,
      { title: "Finish any degree", detail: "Constable jobs can open right after Inter", time: "3 years" },
      { title: "Write the state police exam", detail: "Includes a physical test", exams: ["State police recruitment"] },
      { title: "Become a sub-inspector" },
    ],
    backup: "Fitness counts. Height and age rules apply, so check the notification.",
  },
  {
    id: "defence",
    title: "Army, Navy or Air Force",
    icon: "airplane",
    color: "#47544D",
    plain: "Serves the country as a defence officer.",
    groups: ["mpc"],
    anyGroup: true,
    steps: [
      MPC,
      { title: "Write the NDA exam", detail: "Includes an interview and medical test", exams: ["UPSC NDA"], time: "During or after Inter" },
      { title: "Train at the academy", time: "About 3 to 4 years" },
      { title: "Become a defence officer" },
    ],
    backup: "The Army wing accepts any group. Air Force and Navy need Maths and Physics.",
  },
  {
    id: "ca",
    title: "Chartered Accountant",
    icon: "calculator",
    color: "#9A6400",
    plain: "Handles accounts, audits and taxes for companies.",
    groups: ["mec", "cec"],
    anyGroup: true,
    steps: [
      INTER("MEC or CEC", "Commerce makes CA easier to start"),
      { title: "Clear the CA exams", detail: "Three levels, with practical training", exams: ["CA Foundation", "CA Intermediate", "CA Final"], time: "About 4.5 to 5 years" },
      { title: "Become a Chartered Accountant" },
    ],
    backup: "Many people need several attempts. B.Com alongside gives you a backup degree.",
  },
  {
    id: "bank",
    title: "Bank officer",
    icon: "business",
    color: "#17694F",
    plain: "Manages customers, loans and accounts in a bank.",
    groups: ["mec", "cec", "mpc", "bipc", "hec"],
    anyGroup: true,
    steps: [
      ANY,
      { title: "Finish any degree", time: "3 years" },
      { title: "Write bank exams", exams: ["IBPS PO", "SBI PO"] },
      { title: "Become a bank officer" },
    ],
    backup: "Clerk exams are a good first step while you prepare.",
  },
  {
    id: "lawyer",
    title: "Lawyer",
    icon: "document-text",
    color: "#8C2F4B",
    plain: "Fights cases in court and gives legal advice.",
    groups: ["hec", "cec", "mec", "mpc", "bipc"],
    anyGroup: true,
    steps: [
      ANY,
      { title: "Write a law entrance exam", exams: ["CLAT", "LAWCET"], time: "After Inter" },
      { title: "Study BA LLB", time: "5 years" },
      { title: "Become a lawyer", detail: "Judge posts are open through exams later" },
    ],
    backup: "You can also finish any degree first, then study a 3 year LLB.",
  },
  {
    id: "technician",
    title: "Technician",
    icon: "hammer",
    color: "#47544D",
    plain: "Fixes and runs electrical systems and machines.",
    groups: [],
    anyGroup: true,
    steps: [
      { title: "Join an ITI", detail: "Electrician, fitter, welder and more", time: "1 to 2 years" },
      { title: "Do an apprenticeship", detail: "Paid training at a company", time: "About 1 year" },
      { title: "Become a technician", detail: "In factories, or railways through exams" },
    ],
    backup: "Polytechnic is a longer 3 year diploma that opens more jobs.",
  },
];

export const QUIZ_QUESTIONS = [
  {
    question: "Which subject do you like most?",
    answers: [
      { label: "Maths", scores: { mpc: 2, mec: 1 } },
      { label: "Biology", scores: { bipc: 2 } },
      { label: "Social", scores: { hec: 2, cec: 1 } },
      { label: "Not sure about any", scores: { polytechnic: 1, iti: 1 } },
    ],
  },
  {
    question: "What sounds most fun?",
    answers: [
      { label: "Building apps or machines", scores: { mpc: 2, polytechnic: 1 } },
      { label: "Helping sick people", scores: { bipc: 2 } },
      { label: "Running a business or handling money", scores: { mec: 2, cec: 2 } },
      { label: "Helping people and leading others", scores: { hec: 2, cec: 1 } },
    ],
  },
  {
    question: "How do you like to learn?",
    answers: [
      { label: "Working with my hands", scores: { iti: 2, polytechnic: 2 } },
      { label: "Solving problems", scores: { mpc: 1, mec: 1 } },
      { label: "Learning by heart and understanding", scores: { bipc: 1, hec: 1 } },
      { label: "Reading and discussing", scores: { hec: 1, cec: 1 } },
    ],
  },
  {
    question: "When do you want to start earning?",
    answers: [
      { label: "As soon as I can", scores: { iti: 2, polytechnic: 1 } },
      { label: "In about 5 years", scores: { polytechnic: 1, mpc: 1, mec: 1, cec: 1, hec: 1 } },
      { label: "I'm fine studying for longer", scores: { bipc: 2, mpc: 1, hec: 1 } },
    ],
  },
];

// Ties keep QUIZ order stable, so the same answers always give the same result.
export const scoreQuiz = (chosenAnswers) => {
  const totals = {};
  chosenAnswers.forEach((answer) => {
    Object.entries(answer.scores).forEach(([id, points]) => {
      totals[id] = (totals[id] || 0) + points;
    });
  });
  return Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([id]) => id);
};
