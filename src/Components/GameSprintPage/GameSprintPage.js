import React, { useState } from 'react';
import StartMenu from './StartMenu';
import GameStage from './GameStage';

const GameSprintPage = () => {
  const [gameParams, setGameParams] = useState({
    stage: 'starting',
    level: '0',
    score: 0,
  });

  const showActualPage = () => {
    switch (gameParams.stage) {
      case 'starting': {
        return <StartMenu setGameParams={setGameParams} />;
      }
      case 'started': {
        return <GameStage setGameParams={setGameParams} level={gameParams.level} />;
      }
      case 'finished': {
        return gameParams.score;
      }
      default: {
        return <StartMenu setGameParams={setGameParams} />;
      }
    }
  };

  return (
    <>
      <div className="game-sprint__container">
        {
                    showActualPage()
                }
      </div>
    </>
  );
};

export default GameSprintPage;
