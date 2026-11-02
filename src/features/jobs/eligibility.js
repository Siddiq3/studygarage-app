// `status` drives the label a student sees. Never add a status that promises more than the notice does.
export const STATUS = {
  ELIGIBLE_NOW: "eligible_now",
  FINAL_YEAR: "final_year",
  AFTER_RESULT: "after_result",
  LATER: "later",
  AGE_LIMIT: "age_limit",
  CHECK_MARKS: "check_marks",
  CHECK_NOTICE: "check_notice",
  THIRD_YEAR: "third_year",
  AFTER_DEGREE: "after_degree",
  COMPANY_RULES: "company_rules",
  UNVERIFIED: "unverified",
  NOT_ELIGIBLE: "not_eligible",
};

const STATUS_ORDER = Object.values(STATUS);
export const byStatus = (a, b) =>
  STATUS_ORDER.indexOf(a.result.status) - STATUS_ORDER.indexOf(b.result.status);

const branchPosts = (exam, profile) => {
  if (profile?.course !== "btech") return [];
  // The notice says "Electrical". EEE is matched to it, with a note asking the student to confirm.
  const branch = profile.branch === "eee" ? "electrical" : profile.branch;
  return exam.rule.posts[branch] || [];
};

export const checkEligibility = (exam, profile) => {
  if (!exam.verified) return { status: STATUS.UNVERIFIED, posts: [] };

  const posts = exam.rule.type === "branch" ? branchPosts(exam, profile) : [];
  if (exam.rule.type === "branch" && !posts.length) {
    return { status: STATUS.NOT_ELIGIBLE, posts: [] };
  }

  const needsBranchCheck = exam.rule.type === "branch" && profile?.branch === "eee";

  if (profile?.stage === "early") return { status: STATUS.LATER, posts, needsBranchCheck };

  const age = Number(profile?.age);
  const ageMax = posts.length ? Math.max(...posts.map((post) => post.age)) : exam.ageMax;
  if (age && (age < exam.ageMin || age > ageMax)) {
    return { status: STATUS.AGE_LIMIT, posts, needsBranchCheck };
  }

  if (profile?.stage === "final") {
    return {
      status: exam.finalYear === "can_apply" ? STATUS.FINAL_YEAR : STATUS.AFTER_RESULT,
      posts,
      needsBranchCheck,
    };
  }
  return { status: STATUS.ELIGIBLE_NOW, posts, needsBranchCheck };
};

const LEVEL_OF = { inter: "inter", iti: "iti", polytechnic: "diploma", btech: "btech" };
const levelOf = (course) => LEVEL_OF[course] || "degree";

const clauseMatches = (clause, profile) => {
  const level = levelOf(profile?.course);
  const branch = profile?.branch === "eee" ? "electrical" : profile?.branch;
  switch (clause.level) {
    case "tenth":
      return true;
    case "inter":
      if (level === "iti" || level === "diploma" || (clause.onlyLevel && level !== "inter")) return false;
      return !clause.groups || !profile?.interGroup || clause.groups.includes(profile.interGroup);
    case "iti":
      return level === "iti";
    case "diploma":
    case "btech":
      if (level !== clause.level) return false;
      // Browsing a whole course (no branch chosen) shows what any of its branches can reach.
      return !clause.branches || !profile.branch || clause.branches.includes(branch) || clause.branches.includes(profile.branch);
    case "degree":
      if (level !== "degree") return false;
      if (clause.courses && !clause.courses.includes(profile.course)) return false;
      return !clause.subjects || !profile.branch || clause.subjects.includes(profile.branch);
    default:
      return false;
  }
};

// The answer for one job. An exam with its own detailed rules (examId) keeps using them.
export const checkJob = (job, profile, exam) => {
  // Screens render before the saved profile loads, and new students have none yet.
  if (!profile) return { status: STATUS.NOT_ELIGIBLE, posts: [] };
  const matched = job.accepts.filter((clause) => clauseMatches(clause, profile));
  const level = levelOf(profile?.course);

  if (!matched.length) {
    const needsDegree = job.accepts.some((clause) => clause.level === "degree" || clause.level === "btech");
    return { status: level === "inter" && needsDegree ? STATUS.AFTER_DEGREE : STATUS.NOT_ELIGIBLE, posts: [] };
  }
  if (job.company) return { status: STATUS.COMPANY_RULES, posts: [] };
  if (!job.verified) return { status: STATUS.UNVERIFIED, posts: [] };
  if (exam) return checkEligibility(exam, profile);

  // A lower qualification is already passed, so the stage of the current course does not matter.
  // A Master's student already holds the bachelor's degree these jobs ask for.
  const needsCurrentCourse = profile?.course !== "masters" && matched.every((clause) => clause.level === level);
  const age = Number(profile?.age);
  if (age && ((job.ageMin && age < job.ageMin) || (job.ageMax && age > job.ageMax))) return { status: STATUS.AGE_LIMIT, posts: [] };
  if (job.variesByNotice) return { status: STATUS.CHECK_NOTICE, posts: [] };
  // "Before final year" covers first and second year too, so it can never mean "eligible" here.
  if (needsCurrentCourse && profile?.stage === "early") {
    return { status: job.fromThirdYear ? STATUS.THIRD_YEAR : STATUS.LATER, posts: [] };
  }
  if (needsCurrentCourse && profile?.stage === "final") {
    return { status: job.finalYear === "can_apply" ? STATUS.FINAL_YEAR : STATUS.AFTER_RESULT, posts: [] };
  }
  // We never ask for marks, so a marks rule stays the student's to check.
  return { status: job.marksRule ? STATUS.CHECK_MARKS : STATUS.ELIGIBLE_NOW, posts: [] };
};
