import React from 'react';
import PropTypes from 'prop-types';
import { NotificationOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const Card = ({
  word: {
    word, transcription, wordTranslate, image,
  }, change,
}) => {
  const voice = (value) => {
    const speech = new SpeechSynthesisUtterance();
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speech.lang = 'en-EN';
    speech.text = value;
    change({ word: wordTranslate, image });
    window.speechSynthesis.speak(speech);
  };

  const handleMouseShowCard = () => {
    voice(word);
  };

  const handleKeyShowCard = (event) => {
    if (event.key === 'Enter') {
      voice(word);
    }
    return false;
  };

  return (
    <div tabIndex="0" role="button" className="speakit__cards_card" onClick={handleMouseShowCard} onKeyDown={handleKeyShowCard}>
      <NotificationOutlined sie="large" className="speakit__play_word" />
      <p className="speakit__word">{word}</p>
      <p className="speakit__transcription">{transcription}</p>
      <p className="speakit__cards_hidden speakit__translate">{wordTranslate}</p>
      <p className="speakit__cards_hidden speakit__img">{image}</p>
    </div>
  );
};

Card.propTypes = {
  change: PropTypes.func.isRequired,
  word: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Card;
