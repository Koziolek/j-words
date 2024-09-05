const validParts = [
  'czasownik',
  'rzeczownik',
  'przymiotnik',
  'zaimek',
  'liczebnik',
  'przysłówek',
  'partykuła',
];

const speechPartFilter = (
  word = {
    pl: '',
    romanji: '',
    part: '',
    hiragana: '',
    katakana: '',
    kanji: '',
    group: '',
    pl_info: '',
  },
  part = ''
) => {
  if (!validParts.includes(part.toLowerCase()))
    throw new Error('Invalid part of speech in filter! You pass /' + part + '/');
  return word.part === part.toLowerCase();
};

export const verbFilter = (word) => speechPartFilter(word, 'czasownik');
export const nounFilter = (word) => speechPartFilter(word, 'rzeczownik');
export const adjectiveFilter = (word) => speechPartFilter(word, 'przymiotnik');
export const pronounFilter = (word) => speechPartFilter(word, 'zaimek');
export const numeralFilter = (word) => speechPartFilter(word, 'liczebnik');
export const adverbFilter = (word) => speechPartFilter(word, 'przysłówek');
export const particleFilter = (word) => speechPartFilter(word, 'partykuła');

export const exportForTesting = {
  speechPartFilter,
};
