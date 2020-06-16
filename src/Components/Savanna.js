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

  function nextRound() {
    setIsRightAnswer('');
    setRound(currentRound + 1);
  }

  function fail() {
    setHealth(health - 1);
    nextRound();
  }

  function giveAnswer(index) {
    if (index === initData[currentRound].rightAnswerIndex) {
      setIsRightAnswer(true);
      setScore(score + 1);
      setTimeout(() => nextRound(), 1500);
    } else {
      setIsRightAnswer(false);
      setTimeout(() => fail(), 1500);
    }
  }

  return (
    <div className="wrapper savanna-wrapper">
      <header className="savanna-header">
        <Health health={health} />
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
        />
      </div>
    </div>
  );
};

export default GameComponent;

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
  useEffect(() => {
    const timerId = setTimeout(() => props.fail(), 3000);
    return () => clearTimeout(timerId);
  });
  return (<div className="savanna-game-field__question"><h1>{word}</h1></div>);
};
Word.propTypes = {
  word: PropTypes.string.isRequired,
  fail: PropTypes.func.isRequired,
};

const Answers = (props) => {
  const { answers, isRightAnswer, giveAnswer } = props;
  console.log(isRightAnswer);
  return (
    <div className="savanna-game-field__answers answers">
      {answers.map((item, index) => (
        <button
          type="submit"
          className="answers__answer"
          onClick={() => giveAnswer(index)}
          key={(item + index)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
Answers.propTypes = {
  answers: PropTypes.array.isRequired,
  giveAnswer: PropTypes.func.isRequired,
};
