// Labels come from a remote JSON, so icons are matched on words rather than ids.
const RULES = [
  [/math/, 'calculator-outline'],
  [/physic|chemis/, 'flask-outline'],
  [/bio|science/, 'leaf-outline'],
  [/social|history|geograph|civic/, 'earth-outline'],
  [/english|telugu|hindi|kannada|sanskrit|urdu|language/, 'language-outline'],
  [/video|lecture|youtube/, 'play-circle-outline'],
  [/text\s?book|\btb\b|book/, 'book-outline'],
  [/quiz/, 'help-circle-outline'],
  [/blue\s?print/, 'map-outline'],
  [/syllabus/, 'list-outline'],
  [/previous|prev|pqp|old paper/, 'time-outline'],
  [/model/, 'copy-outline'],
  [/imp|important|question/, 'star-outline'],
  [/material|study|notes|map|plan/, 'reader-outline'],
  [/daily|today/, 'today-outline'],
  [/week/, 'calendar-outline'],
  [/grand|pre.?final|final|revision|rivision/, 'ribbon-outline'],
  [/slip|mini|test|fa\s?-?\d|sa\s?-?\d|unit|exam/, 'clipboard-outline'],
  [/paper/, 'document-text-outline'],
  [/poly|iiit|nmms|emcet|eamcet|entrance|cet/, 'school-outline'],
  [/news|update/, 'newspaper-outline'],
];

export function iconForLabel(label = '') {
  const text = String(label).toLowerCase();
  const match = RULES.find(([pattern]) => pattern.test(text));
  return match ? match[1] : 'folder-open-outline';
}
