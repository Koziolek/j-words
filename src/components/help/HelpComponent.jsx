import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { numberOfWords } from '../word/WordsService';
import close from './close.svg';

const HelpComponent = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [numberWords, setNumberWords] = useState(0);
  useEffect(() => {
    numberOfWords().then((n) => setNumberWords(n));
    Modal.setAppElement('#root');
  }, []);

  return (
    <div>
      <button onClick={() => handleOpen(!open)}>Pomoc</button>
      <Modal
        isOpen={open}
        style={{
          content: {
            width: '80em',
            margin: 'auto'
          }
        }}
      >
        <div className="flex justify-between shadow-inner ">
          <h2 className="inline-block self-center text-3xl text-center w-full">Instrukcja</h2>
          <button
            type="button"
            className="close-button text-xl align-center cursor-pointer alert-del"
            onClick={handleOpen}
          >
            <span className="sr-only">Zamknij</span>
            <img src={close} alt="close" />
          </button>
        </div>
        <div>
          <p>Fiszki japońskie dla grupy z Profi-Lingua.</p>
          <p>Poziom A1.</p>
          <p>Rok 2024/2025</p>
          <h3>Liczba słów</h3>
          <p>Obecnie mamy {numberWords} nie unikalnych słów.</p>
          <h3>Wpisywanie odpowiedzi</h3>
          <p>
            Żeby uzyskać znaki hiraganą pisz małe litery, katakaną wielkie. Słowa mają tylko jedną
            wersję, więc jak użyjesz złego alfabetu, to będzie to błąd.
          </p>
          <p>
            Jeżeli korzystasz z telefonu komórkowego, to pamiętaj, że domyślnie pierwsza litera w
            tekście jest wielka i pierwszy znak będzie rozwiązywany do katakany.
          </p>
          <p>Żeby wpisać głoskę ん, to po wpisaniu n naciśnij spację.</p>
          <p>Żeby wpisać głoskę づ (dzu), musisz napisać du a nie dzu.</p>
          <p>Żeby wpisać głoskę じ (dzi), możesz napisać ji lub zi.</p>
          <p>
            Lista z wynikami zawiera dobre i złe odpowiedzi. W przypadku złych podana jest twoja
            odpowiedź.
          </p>
          <p>
            Jeżeli jakieś słowo ma kilka wersji w języku japońskim np. długopis ぺん i ぼおるぺん,
            to możesz podać jedną.
          </p>
          <p>
            Spacje w środku są usuwane np. でんわばんごう (denwabangoku) i でんわ ばんごう (denwa
            bangoku) są poprawnymi formami. Tak, wiem nie do końca jest to gramatyczne, ale tak jest
            łatwiej to ogarnąć.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default HelpComponent;
