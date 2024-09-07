import React from 'react';
import { v4 } from 'uuid';
import PropTypes from 'prop-types';
import './WordResult.css';
import { OptionalWordView } from './OptionalWordView';
import { LanguageManager } from '../../languages/LanguageManager';

const WordForms = ({ words = [], wrapperTag = 'div', internalTag = 'div' }) => {
  const WrapperTag = wrapperTag;
  const WordTag = LanguageManager().wordView;
  return (
    <WrapperTag>
      {words.map((word) => (
        <WordTag word={word} key={v4()} internalTag={internalTag} />
      ))}
    </WrapperTag>
  );
};

const WordResult = ({ word, mode }) => {
  const AnswerView = LanguageManager().answerView;
  return (
    <div className={mode + '-word-result word-result'}>
      {mode === 'bad' ? (
        <>
          <div>
            <AnswerView answer={word.answer} word={word} />
          </div>
          <WordForms words={word.words} />
        </>
      ) : (
        <WordForms words={word.words} />
      )}
    </div>
  );
};

const WordResultComponent = ({ goodWords = [], badWords = [] }) => {
  return (
    <div className="word-result">
      <div>
        <h2>Poprawne</h2>
        {goodWords.map((word) => (
          <WordResult word={word} mode="good" key={v4()} />
        ))}
      </div>
      <div>
        <h2>Błędy</h2>
        <div className="word-result">
          <div>Twoja odpowiedź</div>
          <div>Poprawna odpowiedź</div>
        </div>
        {badWords.map((word) => (
          <WordResult word={word} mode="bad" key={v4()} />
        ))}
      </div>
    </div>
  );
};

OptionalWordView.propTypes = {
  text: PropTypes.string,
  prefix: PropTypes.string,
};
WordForms.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.shape({
      hiragana: PropTypes.string,
      katakana: PropTypes.string,
      kanji: PropTypes.string,
      romanji: PropTypes.string,
      pl: PropTypes.string,
    })
  ),
  wrapperTag: PropTypes.string,
  internalTag: PropTypes.string,
};
WordResult.propTypes = {
  word: PropTypes.shape({
    answer: PropTypes.string,
    pl: PropTypes.string,
    words: PropTypes.arrayOf(
      PropTypes.shape({
        hiragana: PropTypes.string,
        katakana: PropTypes.string,
        kanji: PropTypes.string,
        romanji: PropTypes.string,
        pl: PropTypes.string,
      })
    ),
  }).isRequired,
  mode: PropTypes.oneOf(['good', 'bad']).isRequired,
};
WordResultComponent.propTypes = {
  goodWords: PropTypes.arrayOf(
    PropTypes.shape({
      answer: PropTypes.string,
      pl: PropTypes.string,
      words: PropTypes.arrayOf(
        PropTypes.shape({
          hiragana: PropTypes.string,
          katakana: PropTypes.string,
          kanji: PropTypes.string,
          romanji: PropTypes.string,
          pl: PropTypes.string,
        })
      ),
    })
  ),
  badWords: PropTypes.arrayOf(
    PropTypes.shape({
      answer: PropTypes.string,
      pl: PropTypes.string,
      words: PropTypes.arrayOf(
        PropTypes.shape({
          hiragana: PropTypes.string,
          katakana: PropTypes.string,
          kanji: PropTypes.string,
          romanji: PropTypes.string,
          pl: PropTypes.string,
        })
      ),
    })
  ),
};

export default WordResultComponent;
