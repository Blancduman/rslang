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
    page,
  },
  words,
  showCorrectAnswer,
  showErrorAnswer,
  addCorrectAnswer,
  addErrorAnswer,
  numberGroup,
  main,
}) => {
  const [visual, setVisual] = useState(false);

  const closeModal = () => {
    setVisual(false);
  };

  const nextGame = () => {
    setVisual(false);
    if (page < 5) {
      switchGame({
        group: numberGroup,
        page: page + 1,
      });
    } else {
      main('completed');
    }
  };

  const showButton = () => {
    if (showCorrectAnswer.size === 10) {
      return (
        <Button
          key="submit"
          type="primary"
          onClick={nextGame}
        >
          Следующий уровень
        </Button>
      );
    }
    return null;
  };

  return (
    <div className="speakit__control">
      <SpeechRecognition
        voice={voice}
        offActive={offActive}
        changeLetter={changeLetter}
        words={words}
        setVisual={setVisual}
        showCorrectAnswer={showCorrectAnswer}
        addCorrectAnswer={addCorrectAnswer}
        addErrorAnswer={addErrorAnswer}
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
          showButton(),
        ]}
      >
        <Result
          showCorrectAnswer={showCorrectAnswer}
          showErrorAnswer={showErrorAnswer}
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
  words: PropTypes.arrayOf(PropTypes.shape({
    word: PropTypes.string,
  })).isRequired,
  numberGroup: PropTypes.number.isRequired,
  showCorrectAnswer: PropTypes.instanceOf(Set).isRequired,
  showErrorAnswer: PropTypes.instanceOf(Set).isRequired,
  addCorrectAnswer: PropTypes.func.isRequired,
  addErrorAnswer: PropTypes.func.isRequired,
  main: PropTypes.func.isRequired,
};

export default Buttons;
