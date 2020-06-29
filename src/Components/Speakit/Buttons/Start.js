import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';
import { Button } from 'antd';
import { AudioOutlined, ForwardOutlined, FundProjectionScreenOutlined } from '@ant-design/icons';

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
  words,
  setVisual,
  setLevelUp,
  correctAnswer,
}) => {
  const restart = () => {
    offActive(false);
    newErrorGame([]);
    words.forEach((value) => {
      newErrorGame((prev) => prev.concat(`${value.word} ${value.transcription} ${value.wordTranslate}`));
    });
    newErrorGame((prev) => prev.concat(`${words[9].word} ${words[9].transcription} ${words[9].wordTranslate}`));
    newResultGame([]);
    stopListening();
  };

  const speakOn = () => {
    startListening();
    offActive(true);
  };

  const speakOff = () => {
    stopListening();
  };

  const openModal = () => {
    setVisual(true);
    if (correctAnswer.length === 10) {
      setLevelUp(false);
      speakOff();
    }
  };

  useEffect(() => {
    resetTranscript();
    voice(finalTranscript);
  }, [finalTranscript]);

  if (!browserSupportsSpeechRecognition) return null;

  recognition.lang = 'en-US';

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
      <Button
        type="primary"
        icon={<FundProjectionScreenOutlined />}
        shape="round"
        className="speakit__control_button"
        onClick={openModal}
      >
        Результат
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
  setVisual: PropTypes.func.isRequired,
  setLevelUp: PropTypes.func.isRequired,
  correctAnswer: PropTypes.arrayOf(PropTypes.string).isRequired,
  words: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default SpeechRecognition(options)(Start);
