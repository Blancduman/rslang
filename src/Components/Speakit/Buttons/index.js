import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { ForwardOutlined, FundProjectionScreenOutlined } from '@ant-design/icons';
import SpeechRecognition from './Start';

const Control = ({ voice, offActive, changeLetter }) => {
  const restart = () => {
    offActive('');
  };

  return (
    <div className="speakit__control">
      <Button
        type="primary"
        icon={<ForwardOutlined />}
        shape="round"
        className="speakit__control_button"
        onClick={restart}
      >
        Начать сначала
      </Button>
      <SpeechRecognition
        voice={voice}
        offActive={offActive}
        changeLetter={changeLetter}
      />
      <Button
        type="primary"
        icon={<FundProjectionScreenOutlined />}
        shape="round"
        className="speakit__control_button"
      >
        Результат
      </Button>
    </div>
  );
};

Control.propTypes = {
  voice: PropTypes.func.isRequired,
  offActive: PropTypes.func.isRequired,
  changeLetter: PropTypes.func.isRequired,
};

export default Control;
