import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import IncorrectLetter from './IncorrectLetter';

const AnswerIncorrectWord = (props) => {
  const { letters, incorrectLetterIndexes } = props;

  const renderIncorrectLetters = () => letters.map((letter, i) => (
    <IncorrectLetter
      letter={letter}
      hide={!incorrectLetterIndexes.includes(i)}
      key={`${letter}_${i}`}
    />
  ));

  return (
    <Typography.Text className="learning-words__card_incorrect-letters">
      {renderIncorrectLetters()}
    </Typography.Text>
  );
};

AnswerIncorrectWord.propTypes = {
  letters: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  incorrectLetterIndexes: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

export default AnswerIncorrectWord;
