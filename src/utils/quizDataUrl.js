const QUIZ_DATA_BASE_URL = 'https://raw.githubusercontent.com/Siddiq3/QuizData/main/quizdata';

const STATE_BOARD_SLUG_MAP = {
  ap: 'andhra-pradesh',
  andhra: 'andhra-pradesh',
  'andhra-pradesh': 'andhra-pradesh',
  andhrapradesh: 'andhra-pradesh',
  ts: 'telangana',
  tg: 'telangana',
  telangana: 'telangana',
  ka: 'karnataka',
  karnataka: 'karnataka',
};

const toSlug = (value = '') =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const toClassSlug = (classValue = '') => {
  const normalized = String(classValue).trim().toLowerCase().replace(/\s+/g, '');
  if (!normalized) return '';
  if (normalized.endsWith('class')) return normalized;
  if (/^\d+(st|nd|rd|th)$/.test(normalized)) return `${normalized}class`;
  return toSlug(classValue);
};

const toStateBoardSlug = (stateBoard = '') => {
  const compact = String(stateBoard).trim().toLowerCase().replace(/\s+/g, '');
  const mappedByCompact = STATE_BOARD_SLUG_MAP[compact];
  if (mappedByCompact) return mappedByCompact;

  const slugged = toSlug(stateBoard);
  const mappedBySlug = STATE_BOARD_SLUG_MAP[slugged];
  if (mappedBySlug) return mappedBySlug;

  return slugged;
};

const toChapterFileName = ({ chapter, chapterSlug, chapterFile } = {}) => {
  const fileValue = String(chapterFile || '').trim();
  if (fileValue) {
    return fileValue.endsWith('.json') ? fileValue : `${fileValue}.json`;
  }

  const slugCandidate = toSlug(chapterSlug || chapter);
  if (slugCandidate) {
    return `${slugCandidate}.json`;
  }

  const rawChapter = String(chapterSlug || chapter || '').trim();
  if (!rawChapter) {
    return 'unknown.json';
  }
  return `${encodeURIComponent(rawChapter)}.json`;
};

export const buildQuizSubjectsUrl = ({ stateBoard, classValue }) =>
  `${QUIZ_DATA_BASE_URL}/${toStateBoardSlug(stateBoard)}/${toClassSlug(classValue)}/subjects.json`;

export const buildQuizChaptersUrl = ({ stateBoard, classValue, subject }) =>
  `${QUIZ_DATA_BASE_URL}/${toStateBoardSlug(stateBoard)}/${toClassSlug(classValue)}/${toSlug(subject)}/chapters.json`;

export const buildQuizQuestionsUrl = ({
  stateBoard,
  classValue,
  subject,
  chapter,
  chapterSlug,
  chapterFile,
}) =>
  `${QUIZ_DATA_BASE_URL}/${toStateBoardSlug(stateBoard)}/${toClassSlug(classValue)}/${toSlug(subject)}/${toChapterFileName({
    chapter,
    chapterSlug,
    chapterFile,
  })}`;
