import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import Statistics from './Statistics';

const Gameover = (props) => {
  const {
    setStage, correctAnswers, wrongAnswers, setWrongAnswers, setCorrectAnswers,
  } = props;
  const [visible, setVisible] = useState(true);

  const handleOk = () => {
    setVisible(false);
    setStage('starting');
    setWrongAnswers([]);
    setCorrectAnswers([]);
  };

  const handleContinue = () => {
    setVisible(false);
    setStage('started');
    setWrongAnswers([]);
    setCorrectAnswers([]);
  };

  return (
    <div>
      <Modal
        title="Игра окончена"
        visible={visible}
        footer={[
          <Button key="continue" onClick={handleContinue}>
            Попробовать еще раз
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk}>
            Завершить игру
          </Button>,
        ]}
      >
        <Statistics correctAnswers={correctAnswers} wrongAnswers={wrongAnswers} />
      </Modal>
    </div>
  );
};
Gameover.propTypes = {
  setStage: PropTypes.func.isRequired,
  correctAnswers: PropTypes.arrayOf(PropTypes.any).isRequired,
  wrongAnswers: PropTypes.arrayOf(PropTypes.any).isRequired,
  setWrongAnswers: PropTypes.func.isRequired,
  setCorrectAnswers: PropTypes.func.isRequired,
};

export default Gameover;
