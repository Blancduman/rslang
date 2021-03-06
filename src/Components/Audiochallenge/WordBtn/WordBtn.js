import React, { useEffect } from 'react';
import { Typography, Button } from 'antd';
import PropTypes from 'prop-types';
import './WordBtn.css';

const WordBtn = (props) => {
  const { Text } = Typography;
  const { words, isChosed, verificationWord } = props;

  const hundlerKeypress = (e) => {
    if (!isChosed.isChosed) {
      for (let i = 1; i < 6; i += 1) {
        if (e.key === `${i}`) verificationWord(e, document.querySelector(`.btn${i}`).value);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', hundlerKeypress);
    return () => window.removeEventListener('keyup', hundlerKeypress);
  }, [isChosed]);

  const addWordBtn = (item, index) => {
    let classBtn = '';
    if (isChosed.isRight && isChosed.word === item.word) classBtn = 'audiochallenge__button_words-right';
    else if (!isChosed.isRight && isChosed.word === item.word) classBtn = 'audiochallenge__button_words-wrong';
    else classBtn = 'audiochallenge__button_words';

    return (
      <Button
        disabled={isChosed.isChosed}
        id={classBtn}
        onClick={verificationWord}
        className={`btn${index + 1}`}
        value={item.word}
        key={index}
      >
        {!isChosed.isRight && isChosed.wrongWord === item.word ? (
          <Text delete>{`${index + 1}. ${item.wordTranslate}`}</Text>
        ) : (
          <Text strong>{`${index + 1}. ${item.wordTranslate}`}</Text>
        )}
      </Button>
    );
  };

  return (
    <div className="audiochallenge__list_button_words">
      {words.map(addWordBtn)}
    </div>
  );
};

WordBtn.propTypes = {
  isChosed: PropTypes.shape({
    isChosed: PropTypes.bool.isRequired,
    isRight: PropTypes.bool.isRequired,
    word: PropTypes.string.isRequired,
    wrongWord: PropTypes.string.isRequired,
  }).isRequired,
  verificationWord: PropTypes.func.isRequired,
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default WordBtn;
