import React from 'react';
import PropTypes from 'prop-types';
import { NotificationOutlined } from '@ant-design/icons';
import { Card } from 'antd';

const { Meta } = Card;

const speech = new SpeechSynthesisUtterance();
speech.volume = 1;
speech.rate = 1;
speech.pitch = 1;
speech.lang = 'en-EN';

const Word = ({
  letter: {
    word, transcription, wordTranslate, image,
  }, change,
}) => {
  const voice = (value) => {
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
  };

  return (
    <Card tabIndex="0" className="speakit__cards_card" onClick={handleMouseShowCard} onKeyDown={handleKeyShowCard}>
      <Meta
        avatar={
          <NotificationOutlined />
      }
        title={word}
        description={transcription}
      />
    </Card>
  );
};

Word.propTypes = {
  change: PropTypes.func.isRequired,
  letter: PropTypes.shape({
    word: PropTypes.string,
    transcription: PropTypes.string,
    wordTranslate: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default Word;
