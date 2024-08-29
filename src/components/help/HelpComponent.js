import {useEffect, useState} from "react";
import Modal from 'react-modal';
import {numberOfWords} from "../words/WordsService";

const HelpComponent = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const [numberWords, setNumberWords] = useState(0);
    useEffect(() => {
        numberOfWords().then(n => setNumberWords(n));
    }, []);

    return (
        <div>
            <button onClick={(e) => handleOpen(!open)}>Pomoc</button>
            <Modal isOpen={open}>
                <div className='flex justify-between shadow-inner'>
                    <h2 className='inline-block self-center text-3xl text-center w-full'>Instrukcja</h2>
                    <button type="button"
                            className="close-button text-xl align-center cursor-pointer alert-del"
                            onClick={handleOpen}>
                        <span className="sr-only">Zamknij</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                             aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                <div>
                    <p>Fiszki japońskie dla grupy z Profi-Lingua.</p>
                    <p>Poziom A1.</p>
                    <p>Rok 2024/2025</p>
                    <h3>Liczba słów</h3>

                    <h3>Wpisywanie odpowiedzi</h3>
                    <p>Żeby uzyskać znaki hiraganą pisz małe litery, katakaną wielkie. Słowa mają tylko jedną wersję, więc jak użyjesz złego alfabetu,
                        to będzie to błąd.</p>
                    <p>Żeby wpisać głoskę ん, to po wpisaniu n naciśnij spację.</p>
                    <p>Lista z wynikami zawiera dobre i złe odpowiedzi. W przypadku złych podana jest twoja odpowiedź.</p>
                    <p>Jeżeli jakieś słowo ma kilka wersji w języku japońskim np. długopis ぺん i ぼおるぺん, to możesz podać jedną.</p>
                    <p>Spacje w środku są usuwane np. でんわばんごう (denwabangoku) i でんわ ばんごう (denwa bangoku) są porawnymi formami. Tak, wiem
                        nie do końca jest to gramatyczne, ale tak jest łatwiej to ogarnąć.</p>
                    <p>Obecnie mamy {numberWords} nie unikalnych słów.</p>
                </div>
            </Modal>
        </div>
    );
}

export default HelpComponent;