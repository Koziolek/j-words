import {useState} from "react";
import {toKana} from "wanakana";
import LabeledInputComponent from "../commons/LabeledInputComponent";

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
        const kana = [];
        for (let w in word.words) {
            kana.push(word.words[w].hiragana.trim());
            kana.push(word.words[w].katakana.trim());
        }
        action(kana.includes(answer.trim()), answer.trim());
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

export default WordComponent;