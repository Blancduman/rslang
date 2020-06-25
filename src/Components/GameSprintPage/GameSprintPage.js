import React, { useState } from 'react';
import StartMenu from './StartMenu';
import GameStage from './GameStage';

import './game-sprint-page.css';
import Statistics from './Statistics';

const GameSprintPage = () => {
  const [stage, setStage] = useState('starting');
  const [level, setLevel] = useState('0');
  const [score, setScore] = useState(0);

  const showActualPage = () => {
    switch (stage) {
      case 'starting': {
        return <StartMenu setStage={setStage} setLevel={setLevel} />;
      }
      case 'started': {
        return <GameStage setStage={setStage} score={score} setScore={setScore} level={level} />;
      }
      case 'finished': {
        return <Statistics score={score} setStage={setStage} setScore={setScore} />;
      }
      default: {
        return <StartMenu setStage={setStage} setLevel={setLevel} />;
      }
    }
  };

  return (
    <>
      <div className="game-sprint__container">
        {showActualPage()}
      </div>
    </>
  );
};

export default GameSprintPage;
