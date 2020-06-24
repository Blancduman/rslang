import React, { useState } from 'react';
import './savanna.css';
import { Modal, Button } from 'antd';

// const Gameover = () => (
//   <div className="game-over-container">
//     <span className="game-over-container__game-over">Game over</span>
//   </div>
// );

// export default Gameover;

const Gameover = (props) => {
  const { nextRound } = props;
  const [visible, setVisible] = useState(true);
  const [isContinue, setContinue] = useState(false);

  const handleOk = () => {
    setVisible(false);
  };

  const handleContinue = () => {
    setVisible(false);
    nextRound(true);
  };

  return (
    <div>
      <Modal
        title="Игра окончена"
        visible={visible}
        footer={[
          <Button key="continue" onClick={handleContinue}>
            Продолжить
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk}>
            Вернуться в главное меню
          </Button>,
        ]}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default Gameover;
