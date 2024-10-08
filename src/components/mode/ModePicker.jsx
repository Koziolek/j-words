import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import LabeledInputComponent from '../commons/LabeledInputComponent';
import HelpComponent from '../help/HelpComponent';
import './Mode.css';
import { SetupLanguageManager } from '../../languages/LanguageManager';
import { Jp } from '../../languages/jp';

const ModePicker = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [max, setMax] = useState('15');
  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const startLesson = () => {
    SetupLanguageManager(Jp);
    navigate('/nauka/' + max);
  };

  return (
    <div className="mode-picker" id="mode-picker">
      <LabeledInputComponent
        value={max}
        type="input"
        id="max"
        text="Ile słów do nauki?"
        placeholder="Liczba słów"
        reference={inputRef}
        onChange={(e) => setMax(e.target.value)}
        onEnter={() => startLesson()}
      />
      <button onClick={() => startLesson()} className="mode-button button-indigo">
        Tryb Nauki
      </button>
      <HelpComponent />
    </div>
  );
};

export default ModePicker;
