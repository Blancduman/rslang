import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';

const Gameover = (props) => {
  const { setStage } = props;
  const [visible, setVisible] = useState(true);

  const handleOk = () => {
    setVisible(false);
    setStage('starting');
  };

  const handleContinue = () => {
    setVisible(false);
    setStage('started');
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
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};
Gameover.propTypes = {
  setStage: PropTypes.func.isRequired,
};

export default Gameover;
