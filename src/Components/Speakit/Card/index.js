import React, { useState, useEffect } from 'react';
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
    word,
    transcription,
    wordTranslate,
    image,
  },
  checkPronunciations,
  cardOff,
  changeLetter,
  changePicture,
}) => {
  const [right, setRight] = useState('');
  const voice = (value) => {
    speech.text = value;
    changeLetter(wordTranslate);
    changePicture(image);
    window.speechSynthesis.speak(speech);
  };

  useEffect(() => {
    if (checkPronunciations === word) {
      changeLetter(word);
      changePicture(image);
      setRight('speakit__card_right');
    }
    if (checkPronunciations !== word && checkPronunciations.length) {
      changeLetter(checkPronunciations);
    }
  }, [checkPronunciations]);

  useEffect(() => {
    if (cardOff === '') {
      setRight('');
    }
  }, [cardOff]);

  const handleMouseShowCard = () => {
    voice(word);
  };

  const handleKeyShowCard = (event) => {
    if (event.key === 'Enter') {
      voice(word);
    }
  };
  return (
    <Card tabIndex="0" className={`speakit__cards_card ${cardOff} ${right}`} onClick={handleMouseShowCard} onKeyDown={handleKeyShowCard}>
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
  letter: PropTypes.shape({
    word: PropTypes.string,
    transcription: PropTypes.string,
    wordTranslate: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  checkPronunciations: PropTypes.string.isRequired,
  cardOff: PropTypes.string.isRequired,
  changeLetter: PropTypes.func.isRequired,
  changePicture: PropTypes.func.isRequired,
};

export default Word;
