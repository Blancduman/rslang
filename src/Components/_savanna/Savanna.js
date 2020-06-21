/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import './savanna.css';
import PropTypes, { func } from 'prop-types';
import Loading from '../Loading/index';

const initData = [
  {
    word: 'study',
    answers: ['драться', 'воевать', 'учиться', 'садиться'],
    rightAnswerIndex: 2,
  },
  {
    word: 'swim',
    answers: ['плавать', 'уносить ноги', 'слушать', 'падать'],
    rightAnswerIndex: 0,
  },
  {
    word: 'run',
    answers: ['крутить', 'бежать', 'говорить', 'падать'],
    rightAnswerIndex: 1,
  },
  {
    word: 'stop',
    answers: ['видеть', 'хлопать', 'останавливаться', 'падать'],
    rightAnswerIndex: 2,
  },
];

const getWords = async (level, round) => {
  const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/words?page=2&group=0');
  const words = await rawResponse.json();
  return words;
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const GameComponent = (props) => {
  const [words, setWords] = useState([]);
  const [currentLevel, setLevel] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentRound, setRound] = useState(0);
  const [health, setHealth] = useState(5);
  const [score, setScore] = useState(0);
  const [gameover, setGameover] = useState(false);
  const [isRightAnswer, setIsRightAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const winStreak = useRef(0);

  function shuffleAnswers() {
    setAnswers(answers.splice(0, answers.length));
    for (let i = 0; i <= 2; i += 1) {
      setAnswers(answers.push(words[getRandomInt(19)].wordTranslate));
    }
    console.log(currentRound);
    setAnswers(answers.push(words[currentRound].wordTranslate));
  }

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
    setIsRightAnswer('');
    if (currentRound === words.length - 1) setCurrentPage(currentPage + 1);
    else {
      setRound(currentRound + 1);
      shuffleAnswers();
      console.log(answers);
    }
  }

  function fail() {
    setHealth(health - 1);
    if ((health - 1) === 0) setTimeout(() => GameOver(), 1500);
    else setTimeout(() => nextRound(), 1500);
  }

  function giveAnswer(index) {
    if (index === initData[currentRound].rightAnswerIndex) {
      winStreak.current += 1;
      setIsRightAnswer(true);
      if (winStreak.current >= 4) setScore(score + 20);
      else setScore(score + 10);
      setTimeout(() => nextRound(), 1500);
    } else {
      winStreak.current = 0;
      setIsRightAnswer(false);
      fail();
    }
  }
  console.log(words);
  return (
    words.length === 0 ? <Loading />
      : gameover ? <Gameover />
        : (
          <div className="wrapper savanna-wrapper">
            <header className="savanna-header">
              <div className="savanna-header__header-container">
                <Health health={health} />
                <Score score={score} />
                <Timer setGameOver={GameOver} />
              </div>
            </header>
            <div className="savanna-game-field">
              <Word
          // key={currentRound}
                fail={fail}
                word={words[currentRound].word}
              />
              <Answers
                answers={initData[currentRound].answers}
                giveAnswer={giveAnswer}
                isRightAnswer={isRightAnswer}
                key={currentRound}
              />
            </div>
          </div>
        )
  );
};

export default GameComponent;

const Timer = (props) => {
  const { setGameOver } = props;
  const [timer, setTimer] = useState(60);
  useEffect(() => {
    if (timer === 0) setGameOver();
    else setTimeout(() => setTimer(timer - 1), 1000);
  }, [timer]);
  return (
    <div className="savanna-header__timer-container timer-container">
      <span className="timer-container__timer">{`Осталось: ${timer}`}</span>
    </div>
  );
};
Timer.propTypes = {
  setGameOver: PropTypes.func.isRequired,
};

const Gameover = () => (
  <div className="game-over-container">
    <span className="game-over-container__game-over">Game over</span>
  </div>
);

const Score = (props) => {
  const { score } = props;
  return (
    <div className="savanna-header__score-container score-container">
      <span className="score-container__titel">Очки: </span>
      <span className="score-container__score">{score}</span>
    </div>
  );
};
Score.propTypes = {
  score: PropTypes.number.isRequired,
};

const Health = (props) => {
  const { health } = props;
  const hearts = new Array(health).fill('').map((item, index) => <div className="savanna-header__life" key={`${index * 1}`}>&lt;3</div>);
  return (
    <div className="savanna-header__life-container">
      {hearts}
    </div>
  );
};
Health.propTypes = {
  health: PropTypes.number.isRequired,
};

const Word = (props) => {
  const { word } = props;
  // useEffect(() => {
  //   const timerId = setTimeout(() => props.fail(), 3000);
  //   return () => clearTimeout(timerId);
  // });
  return (<div className="savanna-game-field__question"><h1>{word}</h1></div>);
};
Word.propTypes = {
  word: PropTypes.string.isRequired,
  fail: PropTypes.func.isRequired,
};

const Answers = (props) => {
  const { answers, isRightAnswer, giveAnswer } = props;
  const [lastPressIndex, setLastPressIndex] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className="savanna-game-field__answers answers">
      {answers.map((item, index) => (
        <button
          type="submit"
          className={
            `answers__answer ${lastPressIndex === index && (isRightAnswer ? 'right-answer' : 'false-answer')}`
          }
          onClick={() => {
            if (!isClicked) {
              setIsClicked(true);
              giveAnswer(index, isClicked);
              setLastPressIndex(index);
            }
          }}
          key={(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
Answers.propTypes = {
  // isRightAnswer: PropTypes.isRequired,
  answers: PropTypes.array.isRequired,
  giveAnswer: PropTypes.func.isRequired,
};
