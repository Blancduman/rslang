import React, { useState } from 'react';
import StartMenu from '../StartMenu';
import '../savannah.css';
import SavannahGame from './SavannahGame';
import Gameover from './Gameover';

const SavannahStartPage = () => {
  const [stage, setStage] = useState('starting');
  const [level, setLevel] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  function addCorrectAnswer(word) {
    const resultValue = `${word.word} ${word.transcription} ${word.wordTranslate}`;
    setCorrectAnswers(correctAnswers.concat(resultValue));
  }

  function addWrongAnswer(word) {
    const resultValue = `${word.word} ${word.transcription} ${word.wordTranslate}`;
    setWrongAnswers(wrongAnswers.concat(resultValue));
  }

  const showActualPage = () => {
    switch (stage) {
      case 'starting': {
        return (<div className="game-savannah__container"><StartMenu setStage={setStage} setLevel={setLevel} /></div>);
      }
      case 'started': {
        return (
          <SavannahGame
            level={level}
            setStage={setStage}
            addCorrectAnswer={addCorrectAnswer}
            addWrongAnswer={addWrongAnswer}
          />
        );
      }
      case 'finished': {
        return (
          <Gameover
            setStage={setStage}
            correctAnswers={correctAnswers}
            wrongAnswers={wrongAnswers}
            setCorrectAnswers={setCorrectAnswers}
            setWrongAnswers={setWrongAnswers}
          />
        );
      }
      default: {
        return (<div className="game-savannah__container"><StartMenu setStage={setStage} setLevel={setLevel} /></div>);
      }
    }
  };
  return (
    <>
      {showActualPage()}
    </>
  );
};
export default SavannahStartPage;
