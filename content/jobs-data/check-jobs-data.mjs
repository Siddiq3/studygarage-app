// Run before pushing jobs-data.json to the Api repo:
//   node content/jobs-data/check-jobs-data.mjs            checks the file
//   node content/jobs-data/check-jobs-data.mjs --seed     rebuilds it from the data in the app
import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { JOB_DATES } from "../../src/features/jobs/jobDates.js";
import { JOB_STATS } from "../../src/features/jobs/jobStats.js";
import { JOBS } from "../../src/features/jobs/jobsCatalog.js";
import { applyJobsData } from "../../src/features/jobs/jobsRemote.js";

const file = new URL("./jobs-data.json", import.meta.url);

if (process.argv.includes("--seed")) {
  const seed = { schema: 1, updatedOn: "2026-11-02", dates: JOB_DATES, stats: JOB_STATS, jobs: [], removeJobs: [] };
  writeFileSync(file, JSON.stringify(seed, null, 1) + "\n");
}

const data = JSON.parse(readFileSync(file, "utf8"));
const before = JSON.stringify(data);

// Nothing in the file may be silently dropped by the app.
const problems = [];
for (const [id, events] of Object.entries(data.dates || {})) {
  if (!JOBS.some((job) => job.id === id) && !(data.jobs || []).some((job) => job.id === id)) problems.push(`dates: unknown job ${id}`);
  const count = events.length;
  applyJobsData({ schema: 1, dates: { [id]: events } });
  if (JOB_DATES[id].length !== count) problems.push(`dates: invalid date or type in ${id}`);
}
const jobCount = JOBS.length;
for (const job of data.jobs || []) {
  const size = JOBS.length;
  const existing = JOBS.findIndex((item) => item.id === job.id);
  const old = JOBS[existing];
  applyJobsData({ schema: 1, jobs: [job] });
  const applied = existing >= 0 ? JOBS[existing] !== old : JOBS.length > size;
  if (!applied) problems.push(`jobs: invalid job ${job.id}`);
}
assert.ok(data.schema === 1, "schema must be 1");
assert.ok(jobCount <= JOBS.length || (data.removeJobs || []).length, "jobs lost");
assert.equal(JSON.stringify(data), before);

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(`OK: ${Object.keys(data.dates || {}).length} date entries, ${Object.keys(data.stats || {}).length} stats entries, ${(data.jobs || []).length} jobs`);
