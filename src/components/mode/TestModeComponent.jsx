import {useNavigate} from "react-router-dom";
import WordComponent from "./WordComponent";


const TestModeComponent = () => {
    let navigate = useNavigate();
    return (
        <div>
            <h2>Test – 10 losowych słów</h2>
            <WordComponent word={
                {
                    question: 'Kot',
                    answer: 'ねこ'
                }
            }/>
            <button onClick={(e) => navigate('/')}>Powrót</button>
        </div>
    );
}

export default TestModeComponent;