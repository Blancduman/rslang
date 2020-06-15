import React, { useState, useEffect } from 'react';
import '../main.css';

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

  return (
    <div>
      <Health health />
      <Word
        // key={currentRound}
        word={initData[currentRound].word}
      />
    </div>
  );
};

export default GameComponent;

const Health = (props) => (
  <div style={{ border: '1px solid red' }}>
    {new Array(props.health).fill(<div>life</div>)}
  </div>
);

const Word = (props) => {
  const { word } = props;
  return (<div><h1>{word}</h1></div>);
};
