import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NotificationOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import speechRecognition from '../../../utls/Speakit/Sound/Sound';

const { Meta } = Card;

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
  addCorrectAnswer,
  removeErrorAnswer,
}) => {
  const [right, setRight] = useState('');
  // const voice = (text) => {
    // changeLetter(wordTranslate);
    // changePicture(image);
    // speechRecognition(text);
  // };

  useEffect(() => {
    if (checkPronunciations.toLowerCase() === word.toLowerCase()) {
      changeLetter(word);
      changePicture(image);
      setRight('speakit__card_right');
      const value = `${word} ${transcription} ${wordTranslate}`;
      addCorrectAnswer((prev) => new Set(prev.add(`${word} ${transcription} ${wordTranslate}`)));
      removeErrorAnswer.delete(value);
    }
    if (checkPronunciations !== word && checkPronunciations.length) {
      changeLetter(checkPronunciations);
    }
  }, [checkPronunciations, addCorrectAnswer, changeLetter, changePicture, wordTranslate, image, removeErrorAnswer, transcription, word]);

  useEffect(() => {
    if (!cardOff) {
      setRight('');
    }
  }, [cardOff]);

  const handleMouseShowCard = () => {
    // voice(word);
    changeLetter(wordTranslate);
    changePicture(image);
    speechRecognition(word);
  };

  const handleKeyShowCard = (event) => {
    if (event.key === 'Enter') {
      // voice(word);
      changeLetter(wordTranslate);
      changePicture(image);
      speechRecognition(word);
    }
  };
  return (
    <Card
      tabIndex="0"
      className={`speakit__cards_card ${cardOff ? 'speakit__cards_true' : ''} ${right}`}
      onClick={handleMouseShowCard}
      onKeyDown={handleKeyShowCard}
    >
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
  cardOff: PropTypes.bool.isRequired,
  changeLetter: PropTypes.func.isRequired,
  changePicture: PropTypes.func.isRequired,
  addCorrectAnswer: PropTypes.func.isRequired,
  removeErrorAnswer: PropTypes.instanceOf(Set).isRequired,
};

export default Word;
