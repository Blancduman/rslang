import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';

const Gameover = (props) => {
  const { nextRound } = props;
  const [visible, setVisible] = useState(true);

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
Gameover.propTypes = {
  nextRound: PropTypes.func.isRequired,
};

export default Gameover;
