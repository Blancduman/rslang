import React from 'react';
import { Typography, Button } from 'antd';
import PropTypes from 'prop-types';
import './WordBtn.css';

const WordBtn = (props) => {
  const { Text } = Typography;

  const { words, isChosed, verificationWord } = props;

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
        value={item.word}
        key={index}
      >
        <Text strong>{item.wordTranslate}</Text>
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
  }).isRequired,
  verificationWord: PropTypes.func.isRequired,
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default WordBtn;
