import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import WordComponent from "./WordComponent";
import './Mode.css';
import {randomWords} from '../words/WordsService'
import GoodBadCounter from "../counter/GoodBadCounter";
import WordResultComponent from "./WordResultComponent";

const initialCounter = (max) => {
    return {
        good: 0,
        bad: 0,
        max: max,
        current: 0
    };
}
const initialWord = () => {
    return {
        pl: '',
        words: []
    }
};

const initialState = () => {
    return {
        counter: initialCounter(0),
        words: [],
        word: initialWord(),
        goodWords: [],
        badWords: [],
        mode: true
    };
}

const nextState = ({currentState, isCorrectAnswer, answer}) => {
    const newState = {...currentState};
    if (isCorrectAnswer) {
        newState.counter.good += 1;
        newState.goodWords.push(newState.word);
    } else {
        newState.counter.bad += 1;
        newState.badWords.push({...newState.word, answer});
    }
    if (newState.counter.current < newState.counter.max - 1) {
        newState.word = newState.words[newState.counter.current + 1];
        newState.counter.current += 1;
    } else {
        newState.mode = false;
    }
    return newState;
}

const initialise = async (dataLoader) => {
    return dataLoader()
        .then(data => {
            const newState = {...initialState()};
            newState.counter = {
                good: 0,
                bad: 0,
                max: data.length,
                current: 0
            }
            newState.words = data;
            newState.word = newState.words[0]
            return newState;
        });
}

const badWordsState = (currentState) => {
    const newState = {...currentState};
    newState.counter = {
        good: 0,
        bad: 0,
        max: currentState.badWords.length,
        current: 0
    };
    newState.words = currentState.badWords.map(w => {
        delete w.answer;
        return w;
    });
    newState.word = newState.words[0];
    newState.badWords = [];
    newState.goodWords = [];
    newState.mode = true;

    return newState;
}

const LearnModeComponent = () => {
    const {max = 15} = useParams();
    const navigate = useNavigate();
    const [state, setState] = useState(initialState());
    const inputRef = useRef(null);
    const nextWord = (maybeCorrect, answer = '') =>
        setState(nextState({
            currentState: state,
            isCorrectAnswer: maybeCorrect,
            answer: answer
        }));
    useEffect(() => {
        if (state.words.length === 0) {
            initialise(() => randomWords({count: max}))
                .then(data => setState(data));
        }
        inputRef.current?.focus();
    }, []);

    return (
        <div className='learn-component'>
            <h2 className='learn-component-title'>Nauka – {max} losowych słów</h2>
            {state.mode ?
                <>
                    <WordComponent word={state.word} action={nextWord} reference={inputRef}/>
                    <GoodBadCounter good={state.counter.good} bad={state.counter.bad} max={state.counter.max}/>
                </>
                :
                <>
                    <WordResultComponent badWords={state.badWords} goodWords={state.goodWords}/>
                    {state.badWords.length > 0 ?
                        <button onClick={() => setState(badWordsState(state))} className='mode-button button-blue'>Popraw</button> : <></>}
                </>

            }
            <button onClick={() => {
                setState(initialState());
                navigate('/');
            }} className='mode-button button-red'>Powrót
            </button>
        </div>
    );
}

export const exportForTesting = {
    nextState, initialise, badWordsState
};
export default LearnModeComponent;
