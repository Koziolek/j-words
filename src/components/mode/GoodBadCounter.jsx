const GoodBadCounter = ({good, bad, max}) => {
    return (
        <div className='counter'>
            <span className='counter-good'>{good}</span> / <span className='counter-bad'>{bad}</span> / <span
            className='counter-max'>{max}</span>
        </div>
    );
}

export default GoodBadCounter;