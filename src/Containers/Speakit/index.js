import React, { useState, useEffect } from 'react';
import Cards from '../../Components/Speakit/Cards';
import Image from '../../Components/Speakit/Image';
import Control from '../../Components/Speakit/Buttons';
import { getWords } from '../../Services/DataService';

const Speakit = () => {
  const [result, setResult] = useState([]);
  const [inactive, setInactive] = useState('');
  const [picture, setPicture] = useState('');
  const [letter, setLetter] = useState('');
  const [voice, setVoice] = useState('');
  const [nextGame, setNextGame] = useState({ group: 0, page: 0 });
  const [correct, setCorrect] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    if (result.length) {
      setPicture(result[0].image);
      setLetter(result[0].wordTranslate);
      result.forEach((value) => {
        setError((prev) => prev.concat(`${value.word} ${value.transcription} ${value.wordTranslate}`));
      });
    }
  }, [result]);

  useEffect(() => {
    const currentWord = correct[correct.length - 1];
    const currentIndex = error.indexOf(currentWord);
    error.splice(currentIndex, 1);
  }, [correct]);

  useEffect(() => {
    getWords(nextGame.group, nextGame.page).then((value) => setResult(value));
  }, [nextGame.group, nextGame.page]);

  return (
    <div>
      <main className="speakit__main">
        <Image
          checkPronunciations={voice}
          currentLetter={letter}
          currentPicture={picture}
        />
        <Cards
          words={result}
          cardOff={inactive}
          checkPronunciations={voice}
          changeLetter={setLetter}
          changePicture={setPicture}
          addCorrect={setCorrect}
        />
        <Control
          voice={setVoice}
          offActive={setInactive}
          changeLetter={setLetter}
          currentGame={nextGame}
          switchGame={setNextGame}
          correctAnswer={correct}
          newResultGame={setCorrect}
          errorAnswer={error}
          newErrorGame={setError}
          words={result}
        />
      </main>
    </div>
  );
};

export default Speakit;
