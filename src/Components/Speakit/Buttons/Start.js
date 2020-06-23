import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';
import { Button } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const options = {
  autoStart: false,
  continuous: true,
};

const Start = ({
  finalTranscript,
  resetTranscript,
  browserSupportsSpeechRecognition,
  startListening,
  stopListening,
  recognition,
  voice,
  offActive,
}) => {
  if (!browserSupportsSpeechRecognition) return null;

  recognition.lang = 'en-US';

  const speakOn = () => {
    startListening();
    offActive('speakit__cards_true');
  };

  const speakOff = () => {
    stopListening();
  };

  useEffect(() => {
    resetTranscript();
    voice(finalTranscript);
  }, [finalTranscript]);

  return (
    <div className="speakit__control_recognition">
      <Button
        type="primary"
        icon={<AudioOutlined />}
        shape="round"
        className="speakit__control_button speakit__speak"
        onClick={speakOn}
      >
        Игра
      </Button>
      <Button
        type="primary"
        icon={<AudioOutlined />}
        shape="round"
        className="speakit__control_button speakit__speak"
        onClick={speakOff}
      >
        Пауза
      </Button>
    </div>
  );
};

Start.propTypes = {
  finalTranscript: PropTypes.string.isRequired,
  resetTranscript: PropTypes.func.isRequired,
  startListening: PropTypes.func.isRequired,
  stopListening: PropTypes.func.isRequired,
  browserSupportsSpeechRecognition: PropTypes.bool.isRequired,
  recognition: PropTypes.objectOf(PropTypes.string).isRequired,
  voice: PropTypes.func.isRequired,
  offActive: PropTypes.func.isRequired,
};

export default SpeechRecognition(options)(Start);