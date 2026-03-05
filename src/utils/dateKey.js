export function toLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getYesterdayDateKey(date = new Date()) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() - 1);
  return toLocalDateKey(d);
}

export function isYesterday(dateKey, todayKey = toLocalDateKey()) {
  if (!dateKey) return false;
  const today = new Date(`${todayKey}T00:00:00`);
  const yesterday = new Date(today.getTime() - 86400000);
  return toLocalDateKey(yesterday) === dateKey;
}
