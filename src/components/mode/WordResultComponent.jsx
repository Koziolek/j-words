const WordResult = ({word, mode}) => {

    const forms = word.words.map(w => <li>
            <samp className='word-result-hiragana' key={w.pl+'-'+w.hiragana}>{w.hiragana}</samp>
            <samp className='word-result-katakana' key={w.pl+'-'+w.katakana}>{w.katakana}</samp>
            <samp className='word-result-romanji' key={w.pl+'-'+w.romanji}>{w.romanji}</samp>
        </li>
    );
    return (
        <div className={mode + '-word-result word-result'}>
            <div>
                {
                    mode === 'bad' ?
                        <>
                            <div>{word.pl}</div>
                            <div>{word.answer}</div>
                        </>
                        :
                        <div>{word.pl}</div>
                }

            </div>
            <div>
                <ul>
                    {forms}
                </ul>
            </div>
        </div>
    )
}

const WordResultComponent = ({goodWords = [], badWords = []}) => {
    return (
        <div className='word-result'>
            <div>
                <h2>Poprawne</h2>
                {goodWords.map(word => <WordResult word={word} mode='good'/>)}
            </div>
            <div>
                <h2>Błędy</h2>
                <div className='word-result'>
                    <div>Twoja odpowiedź</div>
                    <div>Poprawna odpowiedź</div>
                </div>
                {badWords.map(word => <WordResult word={word} mode='bad'/>)}
            </div>
        </div>
    );
}

export default WordResultComponent;