import React from 'react';
import { toKana, toRomaji } from 'wanakana';
import { OptionalWordView } from '../components/word-result/OptionalWordView';
import PropTypes from 'prop-types';

const wordFile = 'jp.csv';
const translate = (value) => {
  return toKana(value, { IMEMode: true });
};
const verifyAnswer = (answer, word) => {
  if (answer.trim() === '') {
    return false;
  }
  const kana = [];
  for (let w in word.words) {
    kana.push(word.words[w].kana.replaceAll(' ', '').trim());
  }
  return kana.includes(answer.replaceAll(' ', '').trim());
};

const postLoadTransformerJp = (data) => {
  return data.map((word) => {
    return {
      pl: word.pl,
      romanji: word.romanji,
      part: word.part,
      kana: word.hiragana ? word.hiragana : word.katakana,
      kanji: word.kanji,
      group: word.group,
      pl_info: word.pl_info,
    };
  });
};

const _WordViewJp = ({ pl = '', kana = '', kanji = '', romanji = '', internalTag = 'div' }) => {
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

const WordViewJp = ({ word, internalTag = 'div' }) => {
  return (
    <_WordViewJp
      pl={word.pl}
      kana={word.kana}
      kanji={word.kanji}
      romanji={word.romanji}
      internalTag={internalTag}
    />
  );
};

const AnswerViewJp = ({ answer, word, internalTag = 'div' }) => {
  return (
    <_WordViewJp
      pl={word.pl}
      kana={answer}
      kanji={word.kanji}
      romanji={toRomaji(answer)}
      internalTag={internalTag}
    />
  );
};

export const Jp = {
  dataFile: {
    fileName: wordFile,
    dataType: 'csv',
  },
  translate: translate,
  verifyAnswer: verifyAnswer,
  wordView: WordViewJp,
  answerView: AnswerViewJp,
  postLoadTransformer: postLoadTransformerJp,
};

_WordViewJp.propTypes = {
  pl: PropTypes.string, // Polish word
  kana: PropTypes.string, // Kana (Hiragana or Katakana)
  kanji: PropTypes.string, // Kanji (optional)
  romanji: PropTypes.string, // Romanization of the kana
  internalTag: PropTypes.string, // Custom HTML tag for the container
};

WordViewJp.propTypes = {
  word: PropTypes.shape({
    pl: PropTypes.string, // Polish word
    kana: PropTypes.string, // Hiragana reading of the word
    kanji: PropTypes.string, // Kanji form (optional)
    romanji: PropTypes.string, // Romanization of the word
  }).isRequired,
  internalTag: PropTypes.string, // Custom HTML tag for the container
};

AnswerViewJp.propTypes = {
  answer: PropTypes.string.isRequired, // The user's answer in Kana
  word: PropTypes.shape({
    pl: PropTypes.string, // Polish word
    kanji: PropTypes.string, // Kanji form (optional)
  }).isRequired,
  internalTag: PropTypes.string, // Custom HTML tag for the container
};
