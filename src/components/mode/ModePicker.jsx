import React from 'react';
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import LabeledInputComponent from "../commons/LabeledInputComponent";
import HelpComponent from "../help/HelpComponent";
import './Mode.css';

const ModePicker = () => {
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const [max, setMax] = useState('15');
    useEffect(() => {
        inputRef.current?.focus();
    }, [inputRef]);

    const startLesson = () => {
        navigate('/nauka/' + max);
    }

    return (
        <div className='mode-picker'>
            <LabeledInputComponent value={max} type='input' id='max' text='Ile słów do nauki?'
                                   placeholder='Liczba słów'
                                   reference={inputRef}
                                   action={(e) => setMax(e.target.value)}
                                   onEnter={() => startLesson()}
            />
            <button onClick={() => startLesson()} className='mode-button button-indigo'>Tryb Nauki</button>
            <HelpComponent />
        </div>
    );
}

export default ModePicker;