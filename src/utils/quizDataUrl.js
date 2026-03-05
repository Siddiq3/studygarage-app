const QUIZ_DATA_BASE_URL = 'https://cdn.jsdelivr.net/gh/Siddiq3/QuizData@main/quizdata';

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

export const buildQuizSubjectsUrl = ({ stateBoard, classValue }) =>
  `${QUIZ_DATA_BASE_URL}/${toSlug(stateBoard)}/${toClassSlug(classValue)}/subjects.json`;

export const buildQuizChaptersUrl = ({ stateBoard, classValue, subject }) =>
  `${QUIZ_DATA_BASE_URL}/${toSlug(stateBoard)}/${toClassSlug(classValue)}/${toSlug(subject)}/chapters.json`;

export const buildQuizQuestionsUrl = ({ stateBoard, classValue, subject, chapter }) =>
  `${QUIZ_DATA_BASE_URL}/${toSlug(stateBoard)}/${toClassSlug(classValue)}/${toSlug(subject)}/${toSlug(chapter)}.json`;

