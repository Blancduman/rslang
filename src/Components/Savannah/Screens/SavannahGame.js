import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../savannah.css';
import { SoundTwoTone, SoundOutlined } from '@ant-design/icons';
import { playSound } from '../helpers/index';
import Loading from '../../Loading/index';
import getWords from '../getWords';
import Health from '../Health';
import Timer from '../Timer';
import Score from '../Score';
import Answers from '../Answers';
import Word from '../Word';
import { getRandomInt } from '../../../utls';

const SavannahGame = (props) => {
  const {
    level, setStage, addCorrectAnswer, addWrongAnswer,
  } = props;
  const [words, setWords] = useState([]);
  const [updateWords, setUpdateWords] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentRound, setRound] = useState(0);
  const [health, setHealth] = useState(5);
  const [score, setScore] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [isAnswered, setIsAnswered] = useState(false);
  const winStreak = useRef(0);
  const isFailed = useRef(false);

  useEffect(() => {
    let randomPage = getRandomInt(19);
    if (randomPage !== currentPage) setCurrentPage(randomPage);
    else randomPage += 1;
    async function loadWords(currentLevel, page) {
      setRound(0);
      const res = await getWords(currentLevel, page);
      res.sort(() => Math.random() - 0.5);
      setWords(res);
    }
    loadWords(level, randomPage);
  }, [level, updateWords]);

  function finishGame() {
    setStage('finished');
  }

  function nextRound() {
    setIsAnswered(false);
    isFailed.current = false;
    if (currentRound === words.length - 1) setUpdateWords(updateWords + 1);
    else {
      setRound(currentRound + 1);
    }
  }

  function fail() {
    addWrongAnswer(words[currentRound]);
    playSound(false, soundOn);
    winStreak.current = 0;
    isFailed.current = true;
    setHealth((prev) => prev - 1);
    if ((health - 1) === 0 || health === 0) setTimeout(() => finishGame(), 1500);
    else setTimeout(() => nextRound(), 1500);
  }

  function giveAnswer(isRight, isFail) {
    setIsAnswered(true);
    if (isFail === false) {
      if (isRight) {
        addCorrectAnswer(words[currentRound]);
        playSound(true, soundOn);
        winStreak.current += 1;
        if (winStreak.current >= 4) setScore(score + 20);
        else setScore(score + 10);
        setTimeout(() => nextRound(), 1500);
      } else {
        fail();
      }
    }
  }
  return (
    <div className="savanna-background">
      {words.length === 0 ? <Loading />
        : (
          <div className="wrapper savanna-wrapper">
            <header className="savanna-header">
              <div className="savanna-header__sound-container">
                <button
                  type="submit"
                  className="savanna-header__sound"
                  onClick={() => {
                    setSoundOn(!soundOn);
                  }}
                >
                  {soundOn ? <SoundTwoTone /> : <SoundOutlined />}
                </button>
              </div>
              <div className="savanna-header__health-container">
                <Timer setGameOver={finishGame} />
                <Score score={score} />
                <Health health={health} />
              </div>
            </header>
            <div className="savanna-game-field">
              <Word
                fail={fail}
                IsAnswered={isAnswered}
                word={words[currentRound]}
                currentRound={currentRound}
                key={words[currentRound].word}
              />
              <Answers
                isFailed={isFailed.current}
                giveAnswer={giveAnswer}
                words={words}
                currentRound={currentRound}
                key={currentRound}
              />
            </div>
          </div>
        )}
    </div>
  );
};
SavannahGame.propTypes = {
  level: PropTypes.number.isRequired,
  setStage: PropTypes.func.isRequired,
  addCorrectAnswer: PropTypes.func.isRequired,
  addWrongAnswer: PropTypes.func.isRequired,
};
export default SavannahGame;
