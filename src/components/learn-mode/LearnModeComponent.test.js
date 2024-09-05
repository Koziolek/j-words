import LearnModeComponent, { exportForTesting } from './LearnModeComponent';
import { act, fireEvent, queryByAttribute, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { getById } from '../../setupTests';

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
const loadedWords = [
  {
    pl: 'auto',
    words: [
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
    ],
  },
  {
    pl: 'babcia',
    words: [
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
];
describe('State transformer', () => {
  test('Should initial state be set', async () => {
    const { initialise } = exportForTesting;

    const mockDataLoader = jest.fn(() => Promise.resolve(testData));
    const initalized = await initialise(mockDataLoader);
    expect(mockDataLoader).toHaveBeenCalledTimes(1);
    expect(initalized).toEqual({
      counter: {
        good: 0,
        bad: 0,
        max: 3,
        current: 0,
      },
      words: testData,
      word: testData[0],
      goodWords: [],
      badWords: [],
      mode: true,
    });
  });

  test('Should set new state for correct answer', () => {
    const { nextState } = exportForTesting;
    const currentState = {
      counter: {
        good: 0,
        bad: 0,
        max: 3,
        current: 0,
      },
      words: testData,
      word: testData[0],
      goodWords: [],
      badWords: [],
      mode: true,
    };
    const isCorrectAnswer = true;
    const answer = 'くるま';
    const expectedState = {
      counter: {
        good: 1,
        bad: 0,
        max: 3,
        current: 1,
      },
      words: testData,
      word: testData[1],
      goodWords: [testData[0]],
      badWords: [],
      mode: true,
    };
    const newState = nextState({ currentState, isCorrectAnswer, answer });
    expect(newState).toEqual(expectedState);
  });

  test('Should set new state for incorrect answer', () => {
    const { nextState } = exportForTesting;
    const currentState = {
      counter: {
        good: 0,
        bad: 0,
        max: 3,
        current: 0,
      },
      words: testData,
      word: testData[0],
      goodWords: [],
      badWords: [],
      mode: true,
    };
    const isCorrectAnswer = false;
    const answer = 'くる';
    const expectedState = {
      counter: {
        good: 0,
        bad: 1,
        max: 3,
        current: 1,
      },
      words: testData,
      word: testData[1],
      goodWords: [],
      badWords: [{ ...testData[0], answer: answer }],
      mode: true,
    };
    const newState = nextState({ currentState, isCorrectAnswer, answer });
    expect(newState).toEqual(expectedState);
  });

  test('Should setup state based on bad answers', () => {
    const { badWordsState } = exportForTesting;
    const currentState = {
      counter: {
        good: 1,
        bad: 2,
        max: 3,
        current: 3,
      },
      words: testData,
      word: testData[2],
      goodWords: [],
      badWords: [
        { ...testData[0], answer: 'くる' },
        { ...testData[1], answer: 'くる' },
      ],
      mode: false,
    };
    const expectedState = {
      counter: {
        good: 0,
        bad: 0,
        max: 2,
        current: 0,
      },
      words: [testData[0], testData[1]],
      word: testData[0],
      goodWords: [],
      badWords: [],
      mode: true,
    };
    const newState = badWordsState(currentState);
    expect(newState).toEqual(expectedState);
  });
});

describe('Component UI', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('Initial state', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(testCSV),
      })
    );
    await act(() =>
      render(
        <MemoryRouter initialEntries={[`/nauka/`]}>
          <Routes>
            <Route path="/nauka/:max?" Component={LearnModeComponent} />
          </Routes>
        </MemoryRouter>
      )
    );
    const titleElement = screen.getByText(/Nauka – 15 losowych słów/i);
    expect(titleElement).toBeInTheDocument();
  });
  test('Initial state should be taken from params', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(testCSV),
      })
    );
    await act(() =>
      render(
        <MemoryRouter initialEntries={[`/nauka/10`]}>
          <Routes>
            <Route path="/nauka/:max?" Component={LearnModeComponent} />
          </Routes>
        </MemoryRouter>
      )
    );
    const titleElement = screen.getByText(/Nauka – 10 losowych słów/i);
    expect(titleElement).toBeInTheDocument();
  });
  test('Load and learning', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(testCSV),
      })
    );
    const wordService = require('../word/WordsService');
    jest.spyOn(wordService, 'randomWords').mockImplementation(() => Promise.resolve(loadedWords));

    const dom = await act(() => {
      return render(
        <MemoryRouter initialEntries={[`/nauka/3`]}>
          <Routes>
            <Route path="/nauka/:max?" Component={LearnModeComponent} />
          </Routes>
        </MemoryRouter>
      );
    });
    expect(screen.getByText(/Nauka – 3 losowych słów/i)).toBeInTheDocument();
    expect(screen.getByText(/auto/i)).toBeInTheDocument();
    const input = getById(dom.container, 'answer');
    expect(input).not.toBeNull();
    fireEvent.change(input, { target: { value: 'kuru' } });
    fireEvent.submit(input);
    fireEvent.change(input, { target: { value: 'so' } });
    fireEvent.submit(input);
    fireEvent.change(input, { target: { value: 'ginko' } });
    fireEvent.submit(input);
    expect(screen.getByText(/Poprawne/i)).toBeInTheDocument();
    expect(screen.getByText(/Błędy/i)).toBeInTheDocument();
    expect(screen.getAllByText(/くる/i)).toHaveLength(2);
    expect(screen.getAllByText(/そ/i)).toHaveLength(2);
    expect(screen.getAllByText(/ぎんこ/i)).toHaveLength(2);
  });
});
