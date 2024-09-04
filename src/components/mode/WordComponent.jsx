import React from 'react';
import {useState} from "react";
import {toKana} from "wanakana";
import LabeledInputComponent from "../commons/LabeledInputComponent";
import PropTypes from "prop-types";

const WordComponent = ({
                           word = {
                               pl: '',
                               words: []
                           }, action = (maybeCorrect, ans) => {
        if (maybeCorrect) {
            console.log('Correct!');
        } else {
            console.log('Incorrect! ' + ans);
        }
    },
                           reference = null
                       }) => {
    const [answer, setAnswer] = useState('');
    const translate = (value) => {
        return toKana(value, {IMEMode: true})
    }
    const checkAnswer = (e) => {
        e.preventDefault();
        if(answer.trim() === '') {
            action(false, answer.trim());
            setAnswer('');
            return;
        }
        const kana = [];
        for (let w in word.words) {
            kana.push(word.words[w].hiragana.replaceAll(' ', '').trim());
            kana.push(word.words[w].katakana.replaceAll(' ', '').trim());
        }
        action(kana.includes(answer.replaceAll(' ', '').trim()), answer.trim());
        setAnswer('');
    }

    return (
        <div className='word'>
            <div className='question'>
                <div>{word.pl}</div>
                <div className='text-xs text-center'>{word.words[0]?.pl_info}</div>
            </div>
            <form onSubmit={checkAnswer}>
                <LabeledInputComponent
                    value={answer}
                    id='answer'
                    type='input'
                    text='Odpowiedź'
                    placeholder=''
                    action={(e) => {
                        e.preventDefault();
                        let translated = translate(e.target.value);
                        setAnswer(translated)
                    }
                    }
                    reference={reference}
                />

            </form>
        </div>
    )
}


WordComponent.propTypes = {
    word: PropTypes.shape({
        pl: PropTypes.string,
        words: PropTypes.arrayOf(PropTypes.shape({
            hiragana: PropTypes.string,
            katakana: PropTypes.string,
            pl_info: PropTypes.string,
        })),
    }).isRequired,
    action: PropTypes.func,
    reference: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
};

export default WordComponent;