import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import CorrectLetter from './CorrectLetter';

const AnswerCorrectWord = (props) => {
  const { letters, correctLetterIndexes } = props;

  const renderCorrectLetters = () => letters.map((letter, i) => (
    <CorrectLetter
      letter={letter}
      hide={!correctLetterIndexes.includes(i)}
      key={`${letter}_${i}`}
    />
  ));

  return (
    <Typography.Text className="learning-words__card_correct-letters">
      {renderCorrectLetters()}
    </Typography.Text>
  );
};

AnswerCorrectWord.propTypes = {
  letters: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  correctLetterIndexes: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

export default AnswerCorrectWord;
