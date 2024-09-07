import { exportForTesting, numberOfWords, randomWords } from './WordsService';
import { LanguageManager, SetupLanguageManager } from '../../languages/LanguageManager';

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
    pl_info: '',
  },
  {
    pl: 'babcia',
    romanji: 'sobo',
    part: 'rzeczownik',
    hiragana: 'そぼ',
    katakana: '',
    kanji: '祖母',
    group: '',
    pl_info: '',
  },
  {
    pl: 'bank',
    romanji: 'ginkoo',
    part: 'rzeczownik',
    hiragana: 'ぎんこお',
    katakana: '',
    kanji: '銀行',
    group: '',
    pl_info: '',
  },
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

test('Should apply postLoadTransformer', () => {
  randomWords({
    count: 3,
    loader: fakeLoader,
    picker: (data, count) => data,
    postLoadTransformer: (data) => {
      return data.map((word) => {
        return {
          pl: word.pl,
        };
      });
    },
  }).then((data) => {
    expect(data.length).toBe(3);
    expect(data).toEqual([
      { pl: 'auto', words: [{ pl: 'auto' }] },
      { pl: 'babcia', words: [{ pl: 'babcia' }] },
      { pl: 'bank', words: [{ pl: 'bank' }] },
    ]);
  });
});

test('Should apply filter on data', () => {
  randomWords({
    count: 3,
    filter: (word) => word.pl === 'auto',
    loader: fakeLoader,
  }).then((data) => {
    expect(data.length).toBe(1);
    expect(data[0].pl).toBe('auto');
  });
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
      pl_info: '',
    },
    {
      pl: 'długopis',
      romanji: 'pen',
      part: 'rzeczownik',
      hiragana: '',
      katakana: 'ペン',
      kanji: '',
      group: '',
      pl_info: '',
    },
    {
      pl: 'bank',
      romanji: 'ginkoo',
      part: 'rzeczownik',
      hiragana: 'ぎんこお',
      katakana: '',
      kanji: '銀行',
      group: '',
      pl_info: '',
    },
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
          pl_info: '',
        },
        {
          pl: 'długopis',
          romanji: 'pen',
          part: 'rzeczownik',
          hiragana: '',
          katakana: 'ペン',
          kanji: '',
          group: '',
          pl_info: '',
        },
      ],
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
          pl_info: '',
        },
      ],
    },
  ]);
});

describe('Communication test', () => {
  beforeEach(() => (global.fetch = jest.fn()));

  test('Should fetch and transform csv data', () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(testCSV),
      })
    );
    const { loadWords } = exportForTesting;
    loadWords().then((data) => expect(data).toEqual(testData));
  });

  test('Should fetch and transform json data', () => {
    SetupLanguageManager({
      ...LanguageManager(),
      dataFile: {
        fileName: 'jp.csv',
        dataType: 'json',
      },
    });
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(testCSV),
        json: () => Promise.resolve(testData),
      })
    );
    const { loadWords } = exportForTesting;
    loadWords().then((data) => expect(data).toEqual(testData));
  });
});
