// Run: node src/features/jobs/eligibility.check.mjs
import assert from "node:assert/strict";
import { checkEligibility, checkJob, STATUS } from "./eligibility.js";
import { JOBS, COURSE_GROUPS, jobsForState } from "./jobsCatalog.js";
import { JOB_EXAMS, examSyllabus } from "./jobsData.js";
import { JOB_STATS } from "./jobStats.js";
import { applyJobsData } from "./jobsRemote.js";
import { JOB_DATES, applicationsClosed, daysUntil, nextEvent, nextNotificationDate, reminderTimes, upcomingEvents } from "./jobDates.js";

const exam = (id) => JOB_EXAMS.find((item) => item.id === id);
const status = (id, profile) => checkEligibility(exam(id), profile).status;
const student = (course, stage, extra = {}) => ({ course, stage, ...extra });

// Final-year rules differ by exam: CGL allows applying, IBPS needs a graduate at registration.
assert.equal(status("ssc-cgl", student("ba", "final")), STATUS.FINAL_YEAR);
assert.equal(status("ibps-po", student("ba", "final")), STATUS.AFTER_RESULT);
assert.equal(status("ibps-po", student("bcom", "completed")), STATUS.ELIGIBLE_NOW);
assert.equal(status("ssc-cgl", student("bsc", "early")), STATUS.LATER);

// Any degree includes B.Tech for the any-degree exams.
assert.equal(status("ssc-cgl", student("btech", "completed", { branch: "cse" })), STATUS.ELIGIBLE_NOW);

// JE: only the listed branches, only degree posts.
assert.equal(status("ssc-je", student("ba", "completed")), STATUS.NOT_ELIGIBLE);
assert.equal(status("ssc-je", student("btech", "completed", { branch: "cse" })), STATUS.NOT_ELIGIBLE);
assert.equal(status("ssc-je", student("btech", "completed", { branch: "civil" })), STATUS.ELIGIBLE_NOW);
assert.equal(status("ssc-je", student("btech", "final", { branch: "mechanical" })), STATUS.AFTER_RESULT);
assert.equal(status("ssc-je", student("btech", "early", { branch: "electrical" })), STATUS.LATER);
const posts = checkEligibility(exam("ssc-je"), student("btech", "completed", { branch: "civil" })).posts;
assert.ok(!posts.some((post) => post.org.includes("CPWD") || post.org.includes("Central Public Works")));
const mech = checkEligibility(exam("ssc-je"), student("btech", "completed", { branch: "mechanical" })).posts;
assert.ok(mech.some((post) => post.org === "DGQA Naval"));

// EEE is matched to Electrical but flagged for the student to confirm.
const eee = checkEligibility(exam("ssc-je"), student("btech", "completed", { branch: "eee" }));
assert.equal(eee.status, STATUS.ELIGIBLE_NOW);
assert.equal(eee.needsBranchCheck, true);

// Age: limits come from the post, and 32 only exists for some branches.
assert.equal(status("ibps-po", student("ba", "completed", { age: 31 })), STATUS.AGE_LIMIT);
assert.equal(status("ibps-po", student("ba", "completed", { age: 19 })), STATUS.AGE_LIMIT);
assert.equal(status("ssc-je", student("btech", "completed", { branch: "civil", age: 32 })), STATUS.ELIGIBLE_NOW);
assert.equal(status("ssc-je", student("btech", "completed", { branch: "mechanical", age: 31 })), STATUS.AGE_LIMIT);
assert.equal(status("ssc-cgl", student("ba", "completed", { age: 32 })), STATUS.ELIGIBLE_NOW);

// An exam we have not verified never claims eligibility.
assert.equal(status("rrb-ntpc-graduate", student("ba", "completed")), STATUS.UNVERIFIED);

// Each verified exam has what its pages need, and JE shows only the student's own branch.
for (const item of JOB_EXAMS.filter((candidate) => candidate.verified)) {
  assert.ok(item.source.startsWith("https://") && item.lastVerified && item.pattern.length);
  assert.ok(examSyllabus(item, student("btech", "completed", { branch: "civil" })).length);
}
const titles = examSyllabus(exam("ssc-je"), student("btech", "final", { branch: "eee" })).map((part) => part.title);
assert.ok(titles.includes("Electrical Engineering") && !titles.includes("Civil Engineering"));

// Catalog: every student sees only what the notices allow.
const job = (id) => JOBS.find((item) => item.id === id);
const jobStatus = (id, profile) => checkJob(job(id), profile, JOB_EXAMS.find((item) => item.id === job(id).examId)).status;
const inter = (group, stage = "completed") => ({ course: "inter", interGroup: group, stage });

assert.equal(jobStatus("ssc-chsl", inter("hec")), STATUS.ELIGIBLE_NOW);
assert.equal(jobStatus("ssc-chsl", inter("hec", "final")), STATUS.FINAL_YEAR);
assert.equal(jobStatus("ssc-chsl", student("ba", "early")), STATUS.ELIGIBLE_NOW); // 12th already passed
assert.equal(jobStatus("ssc-cgl", inter("mpc")), STATUS.AFTER_DEGREE);
assert.equal(jobStatus("upsc-cse", student("bcom", "completed")), STATUS.ELIGIBLE_NOW);
assert.equal(jobStatus("upsc-cse", student("bcom", "early")), STATUS.LATER);
// GATE 2026 brochure: B.A./B.Sc./B.Com in third year or completed, B.Tech third year or later.
assert.equal(jobStatus("gate", student("ba", "early")), STATUS.THIRD_YEAR);
assert.equal(jobStatus("gate", student("bsc", "early")), STATUS.THIRD_YEAR);
assert.equal(jobStatus("gate", student("btech", "early", { branch: "cse" })), STATUS.THIRD_YEAR);
assert.equal(jobStatus("gate", student("ba", "final")), STATUS.FINAL_YEAR);
assert.equal(jobStatus("gate", student("ba", "completed")), STATUS.ELIGIBLE_NOW);
assert.equal(jobStatus("gate", inter("mpc")), STATUS.AFTER_DEGREE);

// Rules re-read from the notices.
assert.equal(jobStatus("afcat", student("ba", "final")), STATUS.FINAL_YEAR);
assert.equal(jobStatus("afcat", student("ba", "completed")), STATUS.CHECK_MARKS);
assert.equal(jobStatus("rbi-grade-b", student("ba", "completed")), STATUS.CHECK_MARKS);
assert.equal(jobStatus("upsc-ese", student("btech", "final", { branch: "civil" })), STATUS.FINAL_YEAR);
assert.equal(jobStatus("isro-sc", student("btech", "completed", { branch: "chemical" })), STATUS.CHECK_NOTICE);
assert.equal(jobStatus("isro-sc", student("btech", "completed", { branch: "cse", age: 29 })), STATUS.AGE_LIMIT);
assert.equal(jobStatus("upsc-nda", inter("hec", "completed")), STATUS.ELIGIBLE_NOW);
assert.equal(jobStatus("upsc-nda", { ...inter("hec"), age: 21 }), STATUS.AGE_LIMIT);
assert.equal(jobStatus("upsc-cds", student("ba", "completed", { age: 26 })), STATUS.AGE_LIMIT);

assert.equal(jobStatus("upsc-nda", inter("hec")), STATUS.ELIGIBLE_NOW);
assert.equal(jobStatus("upsc-nda", student("ba", "completed")), STATUS.NOT_ELIGIBLE);

// New banks, insurance and service rules.
assert.equal(jobStatus("sbi-clerk", student("ba", "final")), STATUS.FINAL_YEAR);
assert.equal(jobStatus("ibps-rrb-assistant", student("bcom", "completed", { age: 18 })), STATUS.ELIGIBLE_NOW);
assert.equal(jobStatus("ibps-rrb-officer", student("ba", "completed", { age: 30 })), STATUS.AGE_LIMIT);
assert.equal(jobStatus("ibps-so-it", student("btech", "completed", { branch: "cse" })), STATUS.ELIGIBLE_NOW);
assert.equal(jobStatus("ibps-so-it", student("btech", "completed", { branch: "civil" })), STATUS.NOT_ELIGIBLE);
assert.equal(jobStatus("ibps-so-it", student("bca", "completed")), STATUS.NOT_ELIGIBLE);
assert.equal(jobStatus("upsc-ifos", student("ba", "completed")), STATUS.NOT_ELIGIBLE);
assert.equal(jobStatus("upsc-ifos", student("bsc", "completed", { branch: "maths" })), STATUS.ELIGIBLE_NOW);
assert.equal(jobStatus("upsc-ifos", student("bsc", "completed", { branch: "cs" })), STATUS.NOT_ELIGIBLE);
assert.equal(jobStatus("powergrid-et", student("btech", "completed", { branch: "eee" })), STATUS.CHECK_MARKS);
assert.equal(jobStatus("powergrid-et", student("btech", "completed", { branch: "mechanical" })), STATUS.NOT_ELIGIBLE);
assert.equal(jobStatus("nabard-da", student("ba", "completed")), STATUS.UNVERIFIED);

// State jobs reach only that state's students.
const ids = (state) => jobsForState(state).map((item) => item.id);
assert.ok(ids("Telangana").includes("tg-police-si") && !ids("Telangana").includes("appsc-group1") && !ids("Telangana").includes("kpsc-gp"));
assert.ok(ids("Andhra Pradesh").includes("appsc-group1") && !ids("Andhra Pradesh").includes("tg-dsc"));
assert.ok(ids("Karnataka").includes("kpsc-gp") && ids("Karnataka").includes("ssc-cgl"));
assert.equal(jobStatus("tg-police-pc", inter("hec")), STATUS.ELIGIBLE_NOW);
assert.equal(jobStatus("tg-police-si", inter("hec")), STATUS.AFTER_DEGREE);
assert.equal(jobStatus("ap-power-aee", student("btech", "completed", { branch: "eee" })), STATUS.ELIGIBLE_NOW);
assert.equal(jobStatus("ap-power-aee", student("btech", "completed", { branch: "cse" })), STATUS.NOT_ELIGIBLE);

// Professional degrees, and Master's counting as a finished degree.
assert.equal(jobStatus("staff-nurse", student("nursing", "completed")), STATUS.UNVERIFIED);
assert.equal(jobStatus("staff-nurse", student("ba", "completed")), STATUS.NOT_ELIGIBLE);
assert.equal(jobStatus("judiciary", student("llb", "completed")), STATUS.UNVERIFIED);
assert.equal(jobStatus("ssc-chsl", student("mbbs", "early")), STATUS.ELIGIBLE_NOW);
assert.equal(jobStatus("upsc-cse", student("masters", "early")), STATUS.ELIGIBLE_NOW);
assert.equal(jobStatus("ibps-clerk", student("masters", "final")), STATUS.ELIGIBLE_NOW);
assert.equal(jobStatus("icici-po", student("bcom", "completed")), STATUS.COMPANY_RULES);

// A student with no saved profile must not crash any screen.
JOBS.forEach((item) => assert.equal(checkJob(item, null).status, STATUS.NOT_ELIGIBLE));

// Branch rules.
assert.equal(jobStatus("upsc-ese", student("btech", "completed", { branch: "cse" })), STATUS.NOT_ELIGIBLE);
assert.equal(jobStatus("upsc-ese", student("btech", "completed", { branch: "ece" })), STATUS.ELIGIBLE_NOW);
assert.equal(jobStatus("isro-sc", student("btech", "completed", { branch: "cse" })), STATUS.CHECK_NOTICE);
assert.equal(jobStatus("isro-sc", student("bsc", "completed", { branch: "physics" })), STATUS.NOT_ELIGIBLE);
assert.equal(jobStatus("ssc-je", student("btech", "completed", { branch: "cse" })), STATUS.NOT_ELIGIBLE);
assert.equal(jobStatus("ssc-je", student("btech", "completed", { branch: "civil" })), STATUS.ELIGIBLE_NOW);
assert.equal(jobStatus("ssc-je-diploma", { course: "polytechnic", branch: "civil", stage: "completed" }), STATUS.ELIGIBLE_NOW);
assert.equal(jobStatus("ssc-je-diploma", student("btech", "completed", { branch: "civil" })), STATUS.NOT_ELIGIBLE);

// Software: guidance only, and it never says "eligible".
assert.equal(jobStatus("software-dev", student("bca", "final")), STATUS.COMPANY_RULES);
assert.equal(jobStatus("software-dev", student("btech", "early", { branch: "civil" })), STATUS.COMPANY_RULES);
assert.equal(jobStatus("software-dev", student("ba", "completed")), STATUS.NOT_ELIGIBLE);
assert.equal(jobStatus("software-dev", student("bsc", "completed", { branch: "chemistry" })), STATUS.NOT_ELIGIBLE);
assert.equal(jobStatus("software-dev", student("bsc", "completed", { branch: "cs" })), STATUS.COMPANY_RULES);

// Unread notices never claim eligibility, and each student is asked only about their own level.
assert.equal(jobStatus("rrb-ntpc-ug", inter("mec")), STATUS.UNVERIFIED);
assert.equal(jobStatus("rrb-alp-tech", { course: "iti", stage: "completed" }), STATUS.UNVERIFIED);
assert.equal(jobStatus("rrb-alp-tech", student("ba", "completed")), STATUS.NOT_ELIGIBLE);

// Every job and course page has what it needs.
for (const item of JOBS) {
  assert.ok(item.accepts?.length && item.roles?.length, item.id);
  if (item.verified && !item.examId) assert.ok(item.source && item.qual && item.ageText && item.lastVerified, item.id);
}
for (const course of COURSE_GROUPS.flatMap((group) => group.courses)) {
  assert.ok(course.join && course.duration, course.id);
  JOBS.forEach((item) => checkJob(item, { ...course.profile, stage: "completed" }));
}

// Stats only attach to real jobs, and "applied" is never shown without its year.
for (const [id, stats] of Object.entries(JOB_STATS)) {
  assert.ok(JOBS.some((item) => item.id === id), id);
  if (stats.applied) assert.ok(stats.appliedCycle, id);
  if (stats.posts) assert.ok(stats.cycle, id);
}

// Countdown: counts calendar days and never shows a date that has passed.
const nov2 = new Date(2026, 10, 2, 22, 30);
assert.equal(daysUntil("2026-12-02", nov2), 30);
assert.equal(daysUntil("2026-11-03", nov2), 1);
assert.equal(daysUntil("2026-11-02", nov2), 0);
assert.equal(daysUntil("2027-01-01", nov2), 60);
assert.equal(nextEvent("upsc-nda", nov2).date, "2026-12-02");
assert.equal(nextEvent("upsc-nda", new Date(2026, 11, 3)).date, "2026-12-22");
assert.equal(nextEvent("upsc-nda", new Date(2028, 0, 1)), null);
assert.equal(nextNotificationDate("upsc-nda", new Date(2026, 11, 3)), "2027-05-12");
assert.equal(nextEvent("ssc-cgl", nov2), null);
assert.deepEqual(reminderTimes("2026-12-02", nov2).map((item) => item.before), [7, 1, 0]);
assert.deepEqual(reminderTimes("2026-11-03", nov2).map((item) => item.before), [0]);
assert.equal(reminderTimes("2026-11-02", nov2).length, 0);
for (const [id, events] of Object.entries(JOB_DATES)) {
  assert.ok(JOBS.some((item) => item.id === id), id);
  const dates = events.map((item) => item.date);
  assert.deepEqual([...dates].sort(), dates, id);
  dates.forEach((date) => assert.match(date, /^\d{4}-\d{2}-\d{2}$/));
}
assert.equal(upcomingEvents("no-such-job", nov2).length, 0);
assert.equal(applicationsClosed("ibps-rrb-officer", nov2), true);
assert.equal(applicationsClosed("upsc-nda", nov2), false);
assert.equal(applicationsClosed("upsc-nda", new Date(2026, 11, 25)), true);

// GitHub data: good changes apply, and bad data can never break a job or claim official rules.
assert.equal(applyJobsData({ schema: 2, dates: { "upsc-nda": [] } }), false);
assert.equal(applyJobsData(null), false);
assert.ok(JOB_DATES["upsc-nda"].length);
applyJobsData({ schema: 1, dates: { "upsc-nda": [{ type: "Exam", date: "2027-04-20" }, { type: "Exam", date: "2027-02-31" }, { type: "Party", date: "2027-05-01" }] } });
assert.deepEqual(JOB_DATES["upsc-nda"], [{ type: "Exam", date: "2027-04-20" }]);
applyJobsData({ schema: 1, stats: { "upsc-nda": { posts: "500", cycle: "2027", evil: "x", applied: 5 } } });
assert.deepEqual(JOB_STATS["upsc-nda"], { posts: "500", cycle: "2027" });
const size = JOBS.length;
const newJob = { id: "new-exam", name: "New", full: "New exam", category: "banks", roles: ["Clerk"], accepts: [{ level: "degree" }], source: "https://example.gov.in" };
const badJobs = [
  { ...newJob, id: "bad-link", source: "javascript:alert(1)" },
  { ...newJob, id: "bad-cat", category: "nope" },
  { ...newJob, id: "bad-level", accepts: [{ level: "phd" }] },
  { ...newJob, id: "bad-verified", verified: true },
  { ...newJob, id: "bad-exam", examId: "ssc-cgl" },
];
applyJobsData({ schema: 1, jobs: [newJob, ...badJobs] });
assert.equal(JOBS.length, size + 1);
assert.equal(jobStatus("new-exam", student("ba", "completed")), STATUS.UNVERIFIED);
applyJobsData({ schema: 1, jobs: [{ ...newJob, id: "ssc-cgl", verified: true, qual: "x", ageText: "y", lastVerified: "z" }] });
assert.equal(job("ssc-cgl").examId, "ssc-cgl");
applyJobsData({ schema: 1, removeJobs: ["new-exam", "ssc-je"] });
assert.equal(job("new-exam"), undefined);
assert.ok(job("ssc-je"));

console.log("eligibility checks passed");
