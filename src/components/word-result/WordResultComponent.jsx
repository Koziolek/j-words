import React from 'react';
import { toRomaji } from 'wanakana';
import { v4 } from 'uuid';
import PropTypes from 'prop-types';
import './WordResult.css';

const OptionalWordView = ({ text = '', prefix = '' }) => {
  return <>{text !== '' ? prefix + '(' + text + ')' : ''}</>;
};

const WordView = ({ pl = '', kana = '', romanji = '', kanji = '', internalTag = 'div' }) => {
  const InternalTag = internalTag;
  return (
    <InternalTag>
      <samp className="word-result-pl">{pl}</samp>
      <samp className="word-result-kana">
        {kana}
        <OptionalWordView text={kanji} prefix=" – " />
      </samp>
      <samp className="word-result-romanji">
        <OptionalWordView text={romanji} />
      </samp>
    </InternalTag>
  );
};

const WordForms = ({ words = [], wrapperTag = 'div', internalTag = 'div' }) => {
  const WrapperTag = wrapperTag;
  return (
    <WrapperTag>
      {words.map((word) => (
        <WordView
          kana={word.hiragana ? word.hiragana : word.katakana}
          kanji={word.kanji}
          romanji={word.romanji}
          pl={word.pl}
          key={v4()}
          internalTag={internalTag}
        />
      ))}
    </WrapperTag>
  );
};

const WordResult = ({ word, mode }) => {
  return (
    <div className={mode + '-word-result word-result'}>
      {mode === 'bad' ? (
        <>
          <div>
            <WordView kana={word.answer} romanji={toRomaji(word.answer)} pl={word.pl} />
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
WordView.propTypes = {
  pl: PropTypes.string,
  kana: PropTypes.string,
  romanji: PropTypes.string,
  kanji: PropTypes.string,
  internalTag: PropTypes.string,
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
