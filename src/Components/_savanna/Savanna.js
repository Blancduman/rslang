/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import './savanna.css';
import { SoundTwoTone, SoundOutlined } from '@ant-design/icons';
import Loading from '../Loading/index';
import getWords from './getWords';
import Health from './Health';
import Timer from './Timer';
import Gameover from './Gameover';
import Score from './Score';
import Answers from './Answers';
import Word from './Word';

const GameComponent = () => {
  const [words, setWords] = useState([]);
  const [currentLevel, setLevel] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentRound, setRound] = useState(0);
  const [health, setHealth] = useState(5);
  const [score, setScore] = useState(0);
  const [gameover, setGameover] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const winStreak = useRef(0);

  useEffect(() => {
    async function loadWords(level, page) {
      setRound(0);
      const res = await getWords(level, page);
      res.sort(() => Math.random() - 0.5);
      setWords(res);
    }
    loadWords(currentLevel, currentPage);
  }, [currentLevel, currentPage]);

  function GameOver() {
    setGameover(true);
  }

  function nextRound() {
    if (currentRound === words.length - 1) setCurrentPage(currentPage + 1);
    else {
      setRound(currentRound + 1);
    }
  }

  function fail() {
    setHealth(health - 1);
    if ((health - 1) === 0) setTimeout(() => GameOver(), 1500);
    else setTimeout(() => nextRound(), 1500);
  }

  function giveAnswer(isRight) {
    if (isRight) {
      winStreak.current += 1;
      if (winStreak.current >= 4) setScore(score + 20);
      else setScore(score + 10);
      setTimeout(() => nextRound(), 1500);
    } else {
      winStreak.current = 0;
      fail();
    }
  }
  return (
    words.length === 0 ? <Loading />
      : gameover ? <Gameover />
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
                <Timer setGameOver={GameOver} />
                <Score score={score} />
                <Health health={health} />
              </div>
            </header>
            <div className="savanna-game-field">
              <Word
                fail={fail}
                word={words[currentRound].word}
                key={currentRound + 100}
              />
              <Answers
                giveAnswer={giveAnswer}
                words={words}
                currentRound={currentRound}
                key={currentRound}
              />
            </div>
          </div>
        )
  );
};

export default GameComponent;