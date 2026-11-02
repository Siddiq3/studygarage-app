// Official figures only, read on 2 Nov 2026. Leave a field out when no official number was found:
// the page then says so, because a guessed number would mislead students. Update each cycle.
const EVERY_YEAR = "Every year";
const TWICE_A_YEAR = "Twice a year";
const NO_CALENDAR = "No fixed calendar found";

export const JOB_STATS = {
  // SSC publishes a yearly calendar, but actual dates can move a lot, so both are shown.
  "ssc-cgl": { posts: "12,256", cycle: "2026", frequency: EVERY_YEAR, planned: "March 2026", released: "May 2026" },
  "ssc-chsl": { posts: "2,536", cycle: "2026", frequency: EVERY_YEAR, planned: "April 2026", released: "September 2026" },
  "ssc-steno": { posts: "731", cycle: "2026", frequency: EVERY_YEAR, planned: "April 2026", released: "April 2026" },
  "ssc-je": { posts: "1,748", cycle: "2026", frequency: EVERY_YEAR, planned: "March 2026", released: "September 2026" },
  "ssc-je-diploma": { posts: "1,748", cycle: "2026, all JE posts", frequency: EVERY_YEAR, planned: "March 2026", released: "September 2026" },
  "ssc-capf": { frequency: EVERY_YEAR, planned: "May 2026", released: "September 2026" },
  "ssc-mts": { frequency: EVERY_YEAR, planned: "June 2026" },
  "ssc-gd": { frequency: EVERY_YEAR, planned: "September 2026" },
  "ssc-selection": { frequency: EVERY_YEAR, planned: "March 2026" },

  // UPSC's 2027 calendar gives the next dates.
  "upsc-cse": { posts: "933", cycle: "2026", applied: "9,92,599", appliedCycle: "2024", appeared: "5,83,213", selected: "1,009", frequency: EVERY_YEAR, released: "February 2026" },
  "upsc-ifos": { posts: "80", cycle: "2026", frequency: EVERY_YEAR, released: "February 2026" },
  "upsc-capf-ac": { posts: "349", cycle: "2026", frequency: EVERY_YEAR, released: "February 2026" },
  "upsc-ese": { posts: "474", cycle: "2026", frequency: EVERY_YEAR, released: "16 September 2026" },
  "upsc-nda": { posts: "394", cycle: "NDA II 2026", frequency: TWICE_A_YEAR, released: "May 2026" },
  "upsc-cds": { frequency: TWICE_A_YEAR, released: "May 2026" },
  "medical-officer": { frequency: EVERY_YEAR },

  // IBPS publishes a yearly recruitment calendar.
  "ibps-po": { posts: "6,715", cycle: "CRP XVI, when notified", frequency: EVERY_YEAR, released: "July 2026" },
  "ibps-clerk": { frequency: EVERY_YEAR, released: "August 2026" },
  "ibps-so-it": { frequency: EVERY_YEAR, released: "July 2026" },
  "ibps-so-other": { frequency: EVERY_YEAR, released: "July 2026" },
  "ibps-rrb-assistant": { frequency: EVERY_YEAR, released: "September 2026" },
  "ibps-rrb-officer": { frequency: EVERY_YEAR, released: "September 2026" },
  "sbi-po": { posts: "1,500", cycle: "2026", released: "June 2026" },
  "sbi-clerk": { posts: "7,680", cycle: "2026, regular posts", released: "August 2026" },
  "lic-aao": { posts: "350", cycle: "2025", released: "August 2025" },

  afcat: { frequency: TWICE_A_YEAR, pattern: "June and December" },
  gate: { frequency: EVERY_YEAR },

  // The Railways announced a yearly recruitment calendar. Posts are from its press releases.
  "rrb-ntpc-graduate": { posts: "5,810", cycle: "CEN 06/2025", frequency: EVERY_YEAR, released: "October 2025" },
  "rrb-alp-tech": { posts: "6,238", cycle: "Technician CEN 02/2025", frequency: EVERY_YEAR },
  "rrb-je": { posts: "7,951", cycle: "CEN 03/2024", frequency: EVERY_YEAR },
  "rrb-ntpc-ug": { posts: "3,445", cycle: "CEN 06/2024", frequency: EVERY_YEAR },
  "rrb-group-d": { frequency: EVERY_YEAR },

  // State recruitments we read.
  "tg-police-pc": { posts: "7,112", cycle: "2026", frequency: NO_CALENDAR, released: "July 2026" },
  "tg-police-si": { posts: "275", cycle: "2026", frequency: NO_CALENDAR, released: "July 2026" },
  "ap-power-aee": { frequency: NO_CALENDAR, released: "June 2026" },
};
