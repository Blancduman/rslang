import React, { useState, useEffect } from 'react';
import '../main.css';
import PropTypes from 'prop-types';

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

const GameComponent = (props) => {
  const [currentLevel, setLevel] = useState(0);
  const [currentRound, setRound] = useState(0);
  const [health, setHealth] = useState(5);
  const [score, setScore] = useState(0);
  const [gameover, setGameover] = useState(false);
  const [isRightAnswer, setIsRightAnswer] = useState('');
  const [winStreak, setWinStreak] = useState(0);

  function nextRound() {
    setIsRightAnswer('');
    setRound(currentRound + 1);
  }

  function fail() {
    setHealth(health - 1);
    setTimeout(() => nextRound(), 1500);
  }

  function giveAnswer(index) {
    if (index === initData[currentRound].rightAnswerIndex) {
      setWinStreak(winStreak + 1);
      setIsRightAnswer(true);
      if (winStreak >= 4) setScore(score + 20);
      else setScore(score + 10);
      setTimeout(() => nextRound(), 1500);
    } else {
      setWinStreak(0);
      setIsRightAnswer(false);
      fail();
    }
  }

  return (
    <div className="wrapper savanna-wrapper">
      <header className="savanna-header">
        <div className="savanna-header__header-container">
          <Health health={health} />
          <Score score={score} />
        </div>
      </header>
      <div className="savanna-game-field">
        <Word
          // key={currentRound}
          fail={fail}
          word={initData[currentRound].word}
        />
        <Answers
          answers={initData[currentRound].answers}
          giveAnswer={giveAnswer}
          isRightAnswer={isRightAnswer}
          key={currentRound}
        />
      </div>
    </div>
  );
};

export default GameComponent;

const Score = (props) => {
  const { score } = props;
  return (
    <div className="savanna-header__score-container score-container">
      <span className="score-container__titel">Score: </span>
      <span className="score-container__score">{score}</span>
    </div>
  );
};
Score.propTypes = {
  score: PropTypes.number.isRequired,
};

const Health = (props) => {
  const { health } = props;
  return (
    <div className="savanna-header__life-container">
      {new Array(health).fill(<div className="savanna-header__life">&lt;3</div>)}
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
  // console.log(lastPressIndex);
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
          key={(item + index)}
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
