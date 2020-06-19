import React, { useState } from 'react';
import StartMenu from './StartMenu';

const GameSprintPage = () => {
  const [gameParams, setGameParams] = useState({
    stage: 'starting',
    level: '0',
  });
  return (
    <div className="game-sprint__container">
      {
                gameParams.stage === 'starting'
                  ? <StartMenu setGameParams={setGameParams} />
                  : gameParams.level
            }
    </div>
  );
};

export default GameSprintPage;
