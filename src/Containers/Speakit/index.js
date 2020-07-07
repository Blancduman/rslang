import React, { useState, useEffect } from 'react';
import { Button, Layout } from 'antd';
import Cards from '../../Components/Speakit/Cards';
import Image from '../../Components/Speakit/Image';
import Buttons from '../../Components/Speakit/Buttons/Buttons';
import Header from '../../Components/Speakit/Header';
import { getWordsSpeakit } from '../../Services/getWordsSpeakit';

const levels = {
  0: 'Первый',
  1: 'Второй',
  2: 'Третий',
  3: 'Четвертый',
  4: 'Пятый',
  5: 'Шестой',
};

const Speakit = () => {
  const [result, setResult] = useState([]);
  const [inactive, setInactive] = useState(false);
  const [picture, setPicture] = useState('');
  const [letter, setLetter] = useState('');
  const [voice, setVoice] = useState('');
  const [nextGame, setNextGame] = useState({ group: 0, page: 0 });
  const [stage, setStage] = useState('starting');
  const [correctAnswer, setCorrectAnswer] = useState(new Set());
  const [errorAnswer, setErrorAnswer] = useState(new Set());
  const [selectGroup, setSelectGroup] = useState(0);

  const createList = () => {
    result.forEach((value) => {
      setErrorAnswer((prev) => new Set(prev.add(`${value.word} ${value.transcription} ${value.wordTranslate}`)));
    });
  };

  useEffect(() => {
    if (result.length) {
      setPicture(result[0].image);
      setLetter(result[0].wordTranslate);
      createList();
      setCorrectAnswer((prev) => new Set(prev.clear()));
    }
  }, [result]);

  useEffect(() => {
    getWordsSpeakit(nextGame.group, nextGame.page).then((value) => setResult(value));
  }, [nextGame.group, nextGame.page]);

  const showActualPage = () => {
    switch (stage) {
      case 'starting': {
        return (
          <Layout className="speakit__start-screen">
            <h1 className="speakit__title">Мини-игра &quot;Говорить на нем&quot;</h1>
            <div className="speakit__start-screen_content">
              <Header
                className="speakit__start-screen_level"
                switchGame={setNextGame}
                returnGroup={setSelectGroup}
              />
              <Button
                type="primary"
                onClick={() => {
                  setStage('game');
                  setErrorAnswer((prev) => new Set(prev.clear()));
                  createList();
                }}
              >
                Старт
              </Button>
            </div>
          </Layout>
        );
      }

      case 'completed': {
        return (
          <Layout className="speakit__completed">
            <h1 className="speakit__title">{`Поздравляем! ${levels[selectGroup]} уровень пройден!`}</h1>
            <Button
              type="primary"
              onClick={() => {
                setStage('starting');
              }}
            >
              Вернуться в главное меню
            </Button>
          </Layout>
        );
      }

      default: {
        return (
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
              addCorrectAnswer={setCorrectAnswer}
              removeErrorAnswer={errorAnswer}
            />
            <Buttons
              voice={setVoice}
              offActive={setInactive}
              changeLetter={setLetter}
              currentGame={nextGame}
              switchGame={setNextGame}
              words={result}
              showCorrectAnswer={correctAnswer}
              showErrorAnswer={errorAnswer}
              addCorrectAnswer={setCorrectAnswer}
              addErrorAnswer={setErrorAnswer}
              numberGroup={selectGroup}
              main={setStage}
            />
          </main>
        );
      }
    }
  };

  return (
    <div>
      {showActualPage()}
    </div>
  );
};

export default Speakit;
