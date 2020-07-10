import React, { useState } from 'react';
import StartMenu from './StartMenu';
import './savannah.css';
import SavannahGame from './SavannahGame';
import Gameover from './Gameover';

const SavannahStartPage = () => {
  const [stage, setStage] = useState('starting');
  const [level, setLevel] = useState('0');
  const showActualPage = () => {
    switch (stage) {
      case 'starting': {
        return (<div className="game-savannah__container"><StartMenu setStage={setStage} setLevel={setLevel} /></div>);
      }
      case 'started': {
        return <SavannahGame level={level} setStage={setStage} />;
      }
      case 'finished': {
        return <Gameover setStage={setStage} />;
      }
      default: {
        return (<div className="game-savannah__container"><StartMenu setStage={setStage} setLevel={setLevel} /></div>);
      }
    }
  };
  return (
    <>
      {showActualPage()}
    </>
  );
};
export default SavannahStartPage;
