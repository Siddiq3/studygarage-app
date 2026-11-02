import { EVENT_TYPES, JOB_DATES } from "./jobDates.js";
import { JOB_CATEGORIES, JOBS } from "./jobsCatalog.js";
import { JOB_STATS } from "./jobStats.js";

// jobs-data.json in the Api repo updates jobs, dates and numbers without an app release.
// Anything invalid is dropped on its own, so one typo cannot break the rest of the file.
const SCHEMA = 1;
const LEVELS = ["tenth", "inter", "iti", "diploma", "degree", "btech"];
const STAT_FIELDS = ["posts", "cycle", "applied", "appliedCycle", "appeared", "selected", "frequency", "pattern", "planned", "released"];
const isText = (value) => typeof value === "string" && value.trim().length > 0;
const isList = (value) => Array.isArray(value) && value.length > 0;

const isRealDate = (date) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) return false;
  const [year, month, day] = date.split("-").map(Number);
  const value = new Date(year, month - 1, day);
  return value.getMonth() === month - 1 && value.getDate() === day;
};

const validEvents = (events) =>
  Array.isArray(events)
    ? events
        .filter((item) => EVENT_TYPES.includes(item?.type) && isRealDate(item?.date))
        .map(({ type, date }) => ({ type, date }))
        .sort((a, b) => a.date.localeCompare(b.date))
    : [];

const validStats = (stats) =>
  Object.fromEntries(STAT_FIELDS.filter((field) => isText(stats?.[field])).map((field) => [field, stats[field]]));

// Opened from the app, so only https links are allowed.
const isSafeLink = (url) => /^https:\/\/[^\s]+$/.test(url || "");

const isValidJob = (job) =>
  isText(job?.id) &&
  isText(job?.name) &&
  isText(job?.full) &&
  JOB_CATEGORIES.some((item) => item.id === job?.category) &&
  isList(job?.roles) &&
  job.roles.every(isText) &&
  isList(job?.accepts) &&
  job.accepts.every((clause) => LEVELS.includes(clause?.level)) &&
  !job.examId &&
  // A job may claim official rules only with its notice and the date it was checked.
  (job.company || isSafeLink(job.source)) &&
  (!job.source || isSafeLink(job.source)) &&
  (!job.verified || (isText(job.qual) && isText(job.ageText) && isText(job.lastVerified)));

export const applyJobsData = (data) => {
  if (data?.schema !== SCHEMA) return false;

  Object.entries(data.dates || {}).forEach(([id, events]) => {
    JOB_DATES[id] = validEvents(events);
  });
  Object.entries(data.stats || {}).forEach(([id, stats]) => {
    JOB_STATS[id] = validStats(stats);
  });
  (Array.isArray(data.jobs) ? data.jobs : []).filter(isValidJob).forEach((job) => {
    const index = JOBS.findIndex((item) => item.id === job.id);
    if (index >= 0) {
      // Never let a file detach a job from its detailed exam page.
      JOBS[index] = { ...job, examId: JOBS[index].examId };
    } else {
      JOBS.push(job);
    }
  });
  (Array.isArray(data.removeJobs) ? data.removeJobs : []).forEach((id) => {
    const index = JOBS.findIndex((item) => item.id === id);
    if (index >= 0 && !JOBS[index].examId) JOBS.splice(index, 1);
  });
  return true;
};
