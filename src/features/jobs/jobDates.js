// Exact dates from official calendars and notices, read 2 Nov 2026. Month-only plans stay out:
// a countdown needs a real date. Recruiters can change these, so the screen says so.
const NOTIFICATION = "Notification opens";
const LAST_DATE = "Last date to apply";
const EXAM = "Exam";
const PRELIMS = "Preliminary exam";
const MAINS = "Main exam";

export const EVENT_TYPES = [NOTIFICATION, LAST_DATE, EXAM, PRELIMS, MAINS];

const event = (type, date, extra = {}) => ({ type, date, ...extra });
const CSE_2027 = [event(NOTIFICATION, "2027-01-13"), event(LAST_DATE, "2027-02-02"), event(PRELIMS, "2027-05-23")];
const DEFENCE_2027 = [
  event(NOTIFICATION, "2026-12-02"), event(LAST_DATE, "2026-12-22"), event(EXAM, "2027-04-11"),
  event(NOTIFICATION, "2027-05-12"), event(LAST_DATE, "2027-06-01"), event(EXAM, "2027-09-19"),
];
const JE_2026 = [event(EXAM, "2026-11-30")];

export const JOB_DATES = {
  "upsc-cse": [...CSE_2027, event(MAINS, "2027-08-20")],
  "upsc-ifos": [...CSE_2027, event(MAINS, "2027-11-21")],
  "upsc-nda": DEFENCE_2027,
  "upsc-cds": DEFENCE_2027,
  "upsc-ese": [event(PRELIMS, "2027-01-31"), event(MAINS, "2027-06-18")],
  "upsc-capf-ac": [event(NOTIFICATION, "2027-02-17"), event(LAST_DATE, "2027-03-09"), event(EXAM, "2027-07-04")],
  "medical-officer": [event(NOTIFICATION, "2027-03-03"), event(LAST_DATE, "2027-03-23"), event(EXAM, "2027-07-18")],
  "ibps-rrb-officer": [event(PRELIMS, "2026-11-21"), event(MAINS, "2026-12-20")],
  "ibps-rrb-assistant": [event(PRELIMS, "2026-12-06"), event(MAINS, "2027-01-30")],
  "ssc-je": JE_2026,
  "ssc-je-diploma": JE_2026,
  "ssc-capf": [event(EXAM, "2026-11-23")],
  "tg-police-si": [event(PRELIMS, "2026-11-29")],
  "tg-police-pc": [event(PRELIMS, "2026-12-20")],
};

const toLocalDate = (date) => {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const daysUntil = (date, now = new Date()) => {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((toLocalDate(date) - today) / 86400000);
};

export const upcomingEvents = (jobId, now = new Date()) =>
  (JOB_DATES[jobId] || []).filter((item) => daysUntil(item.date, now) >= 0);

export const nextEvent = (jobId, now = new Date()) => upcomingEvents(jobId, now)[0] || null;

export const nextNotificationDate = (jobId, now = new Date()) =>
  upcomingEvents(jobId, now).find((item) => item.type === NOTIFICATION)?.date || null;

// Only an exam is left, so new students cannot apply in this cycle.
export const applicationsClosed = (jobId, now = new Date()) => {
  const next = nextEvent(jobId, now);
  return Boolean(next) && next.type !== NOTIFICATION && next.type !== LAST_DATE;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const formatDate = (date) => {
  const value = toLocalDate(date);
  return `${value.getDate()} ${MONTHS[value.getMonth()]} ${value.getFullYear()}`;
};

// Reminder moments for one event: 7 days before, 1 day before and on the day, at 9 am.
export const reminderDays = [7, 1, 0];
export const reminderTimes = (date, now = new Date()) =>
  reminderDays
    .map((before) => {
      const at = toLocalDate(date);
      at.setDate(at.getDate() - before);
      at.setHours(9, 0, 0, 0);
      return { before, at };
    })
    .filter((item) => item.at > now);
