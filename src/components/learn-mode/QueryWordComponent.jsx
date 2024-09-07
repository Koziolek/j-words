import React, { useState } from 'react';
import LabeledInputComponent from '../commons/LabeledInputComponent';
import PropTypes from 'prop-types';
import { LanguageManager } from '../../languages/LanguageManager';

const QueryWordComponent = ({
  word = {
    pl: '',
    words: [],
  },
  postAnswerHandler = (maybeCorrect, ans) => {
    if (maybeCorrect) {
      console.log('Correct!');
    } else {
      console.log('Incorrect! ' + ans);
    }
  },
  reference = null,
  checkAnswer = (answer, word) => LanguageManager().verifyAnswer(answer, word),
  answerTranslator = (answer) => LanguageManager().translate(answer),
}) => {
  const [answer, setAnswer] = useState('');

  const handleAnswer = (e) => {
    e.preventDefault();
    const maybeCorrect = checkAnswer(answer, word);
    postAnswerHandler(maybeCorrect, answer.trim());
    setAnswer('');
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    setAnswer(answerTranslator(e.target.value));
  };

  return (
    <div className="word">
      <div className="question">
        <div>{word.pl}</div>
        <div className="text-xs text-center">{word.words[0]?.pl_info}</div>
      </div>
      <form onSubmit={handleAnswer}>
        <LabeledInputComponent
          value={answer}
          id="answer"
          type="input"
          text="Odpowiedź"
          placeholder=""
          onChange={onChangeHandler}
          reference={reference}
        />
      </form>
    </div>
  );
};

QueryWordComponent.propTypes = {
  word: PropTypes.shape({
    pl: PropTypes.string,
    words: PropTypes.arrayOf(
      PropTypes.shape({
        hiragana: PropTypes.string,
        katakana: PropTypes.string,
        pl_info: PropTypes.string,
      })
    ),
  }).isRequired,
  postAnswerHandler: PropTypes.func,
  reference: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
  answerCheck: PropTypes.func,
  answerTranslator: PropTypes.func,
};

export default QueryWordComponent;
