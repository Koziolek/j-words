import React from 'react';
import { Def } from './def';
import PropTypes from 'prop-types';

const WordView = ({ pl = '', internalTag = 'div' }) => {
  const InternalTag = internalTag;
  return <InternalTag>{pl}</InternalTag>;
};

const AnswerView = ({ answer = '', word = {}, internalTag = 'div' }) => {
  const InternalTag = internalTag;
  return (
    <InternalTag>
      {answer} / {word.toString()}
    </InternalTag>
  );
};

const _LanguageManager = {
  dataFile: {
    fileName: '',
    dataType: 'csv',
  },
  translate: (word) => word,
  verifyAnswer: ({ answer, word }) => word === answer,
  wordView: WordView,
  answerView: AnswerView,
  postLoadTransformer: (data) => data,
};

export const LanguageManager = () => _LanguageManager;

export const SetupLanguageManager = (setup) => {
  _LanguageManager.dataFile = setup.dataFile;
  _LanguageManager.translate = setup.translate;
  _LanguageManager.verifyAnswer = setup.verifyAnswer;
  _LanguageManager.wordView = setup.wordView;
  _LanguageManager.answerView = setup.answerView;
  _LanguageManager.postLoadTransformer = setup.postLoadTransformer;
};

export const exportForTesting = {
  WordView,
  AnswerView,
};

WordView.propTypes = {
  pl: PropTypes.string, // The word in Polish (or any language)
  internalTag: PropTypes.string, // HTML tag to wrap the word
};
AnswerView.propTypes = {
  answer: PropTypes.string, // The user's answer
  word: PropTypes.object, // The word object (could be more specific if needed)
  internalTag: PropTypes.string, // HTML tag to wrap the answer
};

SetupLanguageManager.propTypes = {
  wordFile: PropTypes.string, // The path to the word file
  translate: PropTypes.func.isRequired, // Function to translate a word
  verifyAnswer: PropTypes.func.isRequired, // Function to verify the answer
  wordView: PropTypes.elementType.isRequired, // Component to render the word
  answerView: PropTypes.elementType.isRequired, // Component to render the answer
  postLoadTransformer: PropTypes.func.isRequired, // Component to render the answer
};

SetupLanguageManager(Def);
