import {useNavigate} from "react-router-dom";
import './Mode.css';
import {useState} from "react";
import LabeledInputComponent from "../commons/LabeledInputComponent";

const ModePicker = () => {
    const navigate = useNavigate();
    const [max, setMax] = useState('30');
    console.log(max.valueOf())
    return (
        <div className='mode-picker'>
            <LabeledInputComponent value={max} type='input' id='max' text='' placeholder='Liczba słów' action={(e) => setMax(e.target.value)}/>
            <button onClick={(e) => navigate('/nauka/' + max)} className='mode-button button-indigo'>Tryb Nauki</button>
        </div>
    );
}

export default ModePicker;