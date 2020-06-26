import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';
import { Button } from 'antd';
import { AudioOutlined, ForwardOutlined } from '@ant-design/icons';

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
  newErrorGame,
  newResultGame,
  correctAnswer,
  words,
}) => {
  if (!browserSupportsSpeechRecognition) return null;

  recognition.lang = 'en-US';

  const restart = () => {
    offActive('');
    newErrorGame([]);
    words.forEach((value) => {
      newErrorGame((prev) => prev.concat(`${value.word} ${value.transcription} ${value.wordTranslate}`));
    });
    newResultGame([]);
    stopListening();
  };

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
        icon={<ForwardOutlined />}
        shape="round"
        className="speakit__control_button speakit__speak"
        onClick={restart}
      >
        Начать сначала
      </Button>
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
  newErrorGame: PropTypes.func.isRequired,
  newResultGame: PropTypes.func.isRequired,
  correctAnswer: PropTypes.arrayOf(PropTypes.string).isRequired,
  words: PropTypes.objectOf().isRequired,
};

export default SpeechRecognition(options)(Start);
