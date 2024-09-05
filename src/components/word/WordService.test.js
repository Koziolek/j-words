import { exportForTesting, numberOfWords, randomWords } from './WordsService';

const testCSV =
  'pl,romanji,part,hiragana,katakana,kanji,group,pl_info\n' +
  'auto,kuruma,rzeczownik,くるま,,車,,\n' +
  'babcia,sobo,rzeczownik,そぼ,,祖母,,\n' +
  'bank,ginkoo,rzeczownik,ぎんこお,,銀行,,';

const testData = [
  {
    pl: 'auto',
    romanji: 'kuruma',
    part: 'rzeczownik',
    hiragana: 'くるま',
    katakana: '',
    kanji: '車',
    group: '',
    pl_info: ''
  },
  {
    pl: 'babcia',
    romanji: 'sobo',
    part: 'rzeczownik',
    hiragana: 'そぼ',
    katakana: '',
    kanji: '祖母',
    group: '',
    pl_info: ''
  },
  {
    pl: 'bank',
    romanji: 'ginkoo',
    part: 'rzeczownik',
    hiragana: 'ぎんこお',
    katakana: '',
    kanji: '銀行',
    group: '',
    pl_info: ''
  }
];
const fakeLoader = async () => {
  return testData;
};

test('Get Number of words', () => {
  numberOfWords(fakeLoader).then((data) => expect(data).toBe(3));
});

test('Transform CSV to JSON', () => {
  const { transformCsvToJson } = exportForTesting;
  const result = transformCsvToJson(testCSV);
  expect(result).toEqual(testData);
});

test('Should apply filter on data', () => {
  randomWords({
    count: 3,
    filter: (word) => word.pl === 'auto',
    loader: fakeLoader
  }).then((data) => expect(data.length).toBe(1));
});

test('Should group worlds by pl', () => {
  const { groupWords } = exportForTesting;
  const words = [
    {
      pl: 'długopis',
      romanji: 'boorupen',
      part: 'rzeczownik',
      hiragana: '',
      katakana: 'ボオルペン',
      kanji: '',
      group: '',
      pl_info: ''
    },
    {
      pl: 'długopis',
      romanji: 'pen',
      part: 'rzeczownik',
      hiragana: '',
      katakana: 'ペン',
      kanji: '',
      group: '',
      pl_info: ''
    },
    {
      pl: 'bank',
      romanji: 'ginkoo',
      part: 'rzeczownik',
      hiragana: 'ぎんこお',
      katakana: '',
      kanji: '銀行',
      group: '',
      pl_info: ''
    }
  ];
  const result = groupWords(words);
  expect(result).toEqual([
    {
      pl: 'długopis',
      words: [
        {
          pl: 'długopis',
          romanji: 'boorupen',
          part: 'rzeczownik',
          hiragana: '',
          katakana: 'ボオルペン',
          kanji: '',
          group: '',
          pl_info: ''
        },
        {
          pl: 'długopis',
          romanji: 'pen',
          part: 'rzeczownik',
          hiragana: '',
          katakana: 'ペン',
          kanji: '',
          group: '',
          pl_info: ''
        }
      ]
    },
    {
      pl: 'bank',
      words: [
        {
          pl: 'bank',
          romanji: 'ginkoo',
          part: 'rzeczownik',
          hiragana: 'ぎんこお',
          katakana: '',
          kanji: '銀行',
          group: '',
          pl_info: ''
        }
      ]
    }
  ]);
});
describe('Communication test', () => {
  beforeEach(() => (global.fetch = jest.fn()));

  test('Should fetch and transform', () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(testCSV)
      })
    );
    const { loadWords } = exportForTesting;
    loadWords().then((data) => expect(data).toEqual(testData));
  });
});
