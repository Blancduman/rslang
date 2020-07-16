import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Word = (props) => {
  const {
    word, fail, currentRound, IsAnswered,
  } = props;
  useEffect(() => {
    const timerId = setTimeout(() => fail(), 4000);
    if (IsAnswered) {
      clearTimeout(timerId);
    }
    return () => clearTimeout(timerId);
  }, [currentRound, IsAnswered]);

  return (
    <div
      className="savanna-game-field__question"
    >
      <h1>{word.word}</h1>
    </div>
  );
};
Word.propTypes = {
  word: PropTypes.objectOf(PropTypes.any).isRequired,
  fail: PropTypes.func.isRequired,
  currentRound: PropTypes.number.isRequired,
  IsAnswered: PropTypes.bool.isRequired,
};

export default Word;
