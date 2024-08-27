const Counter = ({current, max}) => {

    return (
        <div className='counter'>
            <span className='counter-current'>{current}</span> / <span className='counter-max'>{max}</span>
        </div>
    );
}

export default Counter;