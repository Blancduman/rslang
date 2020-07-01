import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import SpeechRecognition from './Start';
import Result from './Result';

const Buttons = ({
  voice,
  offActive,
  changeLetter,
  switchGame,
  currentGame: {
    group,
    page,
  },
  newResultGame,
  errorAnswer,
  newErrorGame,
  correctAnswer,
  words,
}) => {
  const [visual, setVisual] = useState(false);
  const [levelUp, setLevelUp] = useState(true);

  const closeModal = () => {
    setVisual(false);
  };

  const nextGame = () => {
    setVisual(false);
    switchGame({
      group: page === 6 && group <= 6 ? group + 1 : 0,
      page: page <= 5 ? page + 1 : 0,
    });
    newResultGame([]);
    newErrorGame([]);
  };

  return (
    <div className="speakit__control">
      <SpeechRecognition
        voice={voice}
        offActive={offActive}
        changeLetter={changeLetter}
        newErrorGame={newErrorGame}
        newResultGame={newResultGame}
        correctAnswer={correctAnswer}
        errorAnswer={errorAnswer}
        words={words}
        setVisual={setVisual}
        setLevelUp={setLevelUp}
      />
      <Modal
        visible={visual}
        title="Результаты игры"
        onCancel={closeModal}
        footer={[
          <Button
            key="back"
            onClick={closeModal}
          >
            Вернуться
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={nextGame}
            disabled={levelUp}
          >
            Следующий уровень
          </Button>,
        ]}
      >
        <Result
          correctAnswer={correctAnswer}
          errorAnswer={errorAnswer}
        />
      </Modal>
    </div>
  );
};

Buttons.propTypes = {
  voice: PropTypes.func.isRequired,
  offActive: PropTypes.func.isRequired,
  changeLetter: PropTypes.func.isRequired,
  currentGame: PropTypes.shape({
    group: PropTypes.number,
    page: PropTypes.number,
  }).isRequired,
  switchGame: PropTypes.func.isRequired,
  correctAnswer: PropTypes.arrayOf(PropTypes.string).isRequired,
  errorAnswer: PropTypes.arrayOf(PropTypes.string).isRequired,
  newResultGame: PropTypes.func.isRequired,
  newErrorGame: PropTypes.func.isRequired,
  words: PropTypes.arrayOf(PropTypes.shape({
    word: PropTypes.string,
  })).isRequired,
};

export default Buttons;
