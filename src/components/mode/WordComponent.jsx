import {useState} from "react";
import {toKana} from "wanakana";
import LabeledInputComponent from "../commons/LabeledInputComponent";

const WordComponent = ({
                           word = {
                               pl: '',
                               hiragana: '',
                               katakana: '',
                               romanji: '',
                               pl_info: ''
                           }, action = (maybeCorrect) => {
        if (maybeCorrect) {
            alert('Correct!');
        } else {
            alert('Incorrect!');
        }
    }
                       }) => {
    const [answer, setAnswer] = useState('');
    const translate = (value) => {
        return toKana(value, {IMEMode: true})
    }
    const checkAnswer = (e) => {
        e.preventDefault();
        action(answer.trim() === word.hiragana.trim() || answer.trim() === word.katakana.trim());
        setAnswer('');
    }

    return (
        <div className='word'>
            <div className='question'>{word.pl}</div>
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
                />
            </form>
        </div>
    )
}

export default WordComponent;