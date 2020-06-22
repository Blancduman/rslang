import React, { useState } from 'react';
import StartMenu from './StartMenu';

import './game-sprint-page.css';

const GameSprintPage = () => {
  const [stage, setStage] = useState('starting');
  const [level, setLevel] = useState('0');
  return (
    <div className="game-sprint__container">
      {
        stage === 'starting'
          ? <StartMenu setStage={setStage} setLevel={setLevel} />
          : level
      }
    </div>
  );
};

export default GameSprintPage;
