import React from 'react';
import { render } from '@testing-library/react';
import { exportForTesting, LanguageManager, SetupLanguageManager } from './LanguageManager';

const TestSetup = {
  dataFile: {
    fileName: '',
    dataType: 'csv',
  },
  translate: (word) => word,
  verifyAnswer: ({ answer, word }) => word === answer,
  wordView: exportForTesting.WordView,
  answerView: exportForTesting.AnswerView,
};
SetupLanguageManager(TestSetup);

describe('WordView component', () => {
  it('renders the correct word', () => {
    const WordView = LanguageManager().wordView;
    const { getByText } = render(<WordView pl="example" />);
    expect(getByText('example')).toBeInTheDocument();
  });

  it('renders the correct internal tag', () => {
    const WordView = LanguageManager().wordView;
    const { container } = render(<WordView pl="example" internalTag="span" />);
    const spanElement = container.querySelector('span');
    expect(spanElement).toBeInTheDocument();
    expect(spanElement.textContent).toBe('example');
  });
});

describe('AnswerView component', () => {
  it('renders the correct answer and word', () => {
    const AnswerView = LanguageManager().answerView;
    const wordObject = { word: 'example' };
    const { getByText } = render(<AnswerView answer="answer" word={wordObject} />);
    expect(getByText('answer / [object Object]')).toBeInTheDocument();
  });

  it('renders the correct internal tag', () => {
    const AnswerView = LanguageManager().answerView;
    const wordObject = { word: 'example' };
    const { container } = render(
      <AnswerView answer="answer" word={wordObject} internalTag="span" />
    );
    const spanElement = container.querySelector('span');
    expect(spanElement).toBeInTheDocument();
    expect(spanElement.textContent).toBe('answer / [object Object]');
  });
});

describe('LanguageManager functionality', () => {
  it('returns the correct default language manager', () => {
    const lm = LanguageManager();
    expect(lm.dataFile).toEqual({
      fileName: '',
      dataType: 'csv',
    });
    expect(lm.translate('test')).toBe('test');
    expect(lm.verifyAnswer({ answer: 'test', word: 'test' })).toBe(true);
    expect(lm.verifyAnswer({ answer: 'wrong', word: 'test' })).toBe(false);
  });
});

describe('SetupLanguageManager function', () => {
  it('sets up LanguageManager correctly', () => {
    const mockSetup = {
      dataFile: {
        fileName: 'mock-file.csv',
        dataType: 'csv',
      },
      translate: (word) => `mock-${word}`,
      verifyAnswer: ({ answer, word }) => answer === `mock-${word}`,
      wordView: () => <div>Mock Word View</div>,
      answerView: () => <div>Mock Answer View</div>,
    };

    SetupLanguageManager(mockSetup);

    const lm = LanguageManager();
    expect(lm.dataFile.fileName).toBe('mock-file.csv');
    expect(lm.dataFile.dataType).toBe('csv');
    expect(lm.translate('test')).toBe('mock-test');
    expect(lm.verifyAnswer({ answer: 'mock-test', word: 'test' })).toBe(true);
    expect(lm.verifyAnswer({ answer: 'wrong', word: 'test' })).toBe(false);

    const { getByText: getWordViewText } = render(lm.wordView());
    expect(getWordViewText('Mock Word View')).toBeInTheDocument();

    const { getByText: getAnswerViewText } = render(lm.answerView());
    expect(getAnswerViewText('Mock Answer View')).toBeInTheDocument();
  });
});
