const WordResult = ({word, mode}) => {
    return (
        <div className={mode + '-word-result word-result'}>
            <div>{word.pl}</div><div>{word.hiragana}</div>
            <div className='text-xs col-start-2 text-center'>({word.romanji})</div>
        </div>
    )
}

const WordResultComponent = ({goodWords, badWords}) => {
    return (
        <div className='word-result'>
            <div>
                <h2>Poprawne</h2>
                {goodWords.map(word => <WordResult word={word} mode='good'/>)}
            </div>
            <div>
                <h2>Błędy</h2>
                {badWords.map(word => <WordResult word={word} mode='bad'/>)}
            </div>
        </div>
    );
}

export default WordResultComponent;