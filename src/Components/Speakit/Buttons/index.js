import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import { FundProjectionScreenOutlined } from '@ant-design/icons';
import SpeechRecognition from './Start';
import Result from './ShowResult';

const Control = ({
  voice,
  offActive,
  changeLetter,
  currentGame: {
    group,
    page,
  }, switchGame,
  correctAnswer,
  newResultGame,
  errorAnswer,
  newErrorGame,
}) => {
  const [visual, setVisual] = useState(false);
  const openModal = () => {
    setVisual(true);
  };

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
      />
      <Button
        type="primary"
        icon={<FundProjectionScreenOutlined />}
        shape="round"
        className="speakit__control_button"
        onClick={openModal}
      >
        Результат
      </Button>
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
          >
            Новая игра
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

Control.propTypes = {
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
};

export default Control;
