import {useNavigate, useParams} from "react-router-dom";
import WordComponent from "./WordComponent";
import {useEffect, useState} from "react";
import './Mode.css';
import {randomWords} from '../words/WordsService'
import GoodBadCounter from "./GoodBadCounter";
import WordResultComponent from "./WordResultComponent";

const initialCounter = (max) => {
    return {
        good: 0,
        bad: 0,
        max: max,
        current: 0
    };
}
const initialWord = {
    pl: '',
    hiragana: '',
    katakana: '',
    romanji: '',
    pl_info: ''
};

const LearnModeComponent = () => {
    const {max = 30} = useParams();
    const navigate = useNavigate();
    const [counter, setCounter] = useState(initialCounter(max));
    const [words, setWords] = useState(null);
    const [word, setWord] = useState(initialWord);
    const [goodWords, setGoodWords] = useState([]);
    const [badWords, setBadWords] = useState([]);
    const [mode, setMode] = useState(true);
    const nextWord = (b) => {
        if (b) {
            setCounter({
                good: counter.good + 1,
                bad: counter.bad,
                max: counter.max,
                current: counter.current + 1
            });
            goodWords.push(word)
            setGoodWords(goodWords)
        } else {
            setCounter({
                good: counter.good,
                bad: counter.bad + 1,
                max: counter.max,
                current: counter.current + 1
            });
            badWords.push(word);
            setBadWords(badWords);
        }
        if (counter.current < counter.max - 1) {
            setWord(words[counter.current + 1]);
        } else {
            setMode(false);
        }
    }
    useEffect(() => {
        if (words == null) {
            randomWords(max)
                .then(res => {
                    setWords(res);
                    setWord(res[counter.current])
                })
        }
    }, [words, word]);

    return (
        <div className='learn-component'>

            <h2 className='learn-component-title'>Nauka – {max} losowych słów</h2>
            {mode ?
                <>
                    <WordComponent word={word} action={nextWord}/>
                    <GoodBadCounter good={counter.good} bad={counter.bad} max={counter.max}/>
                </>
                :
                <WordResultComponent badWords={badWords} goodWords={goodWords}/>
            }
            <button onClick={(e) => navigate('/')}>Powrót</button>
        </div>
    );
}

export default LearnModeComponent;