import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Word = (props) => {
  const {
    word, gameover, fail, currentRound, IsAnswered,
  } = props;
  useEffect(() => {
    if (!gameover) {
      const timerId = setTimeout(() => fail(), 3000);
      if (IsAnswered) {
        clearTimeout(timerId);
      }
      return () => clearTimeout(timerId);
    }
    return '';
  }, [currentRound, IsAnswered]);

  return (
    <div
      className="savanna-game-field__question"
    >
      <h1>{word}</h1>
    </div>
  );
};
Word.propTypes = {
  word: PropTypes.string.isRequired,
  gameover: PropTypes.bool.isRequired,
  fail: PropTypes.func.isRequired,
  currentRound: PropTypes.number.isRequired,
  IsAnswered: PropTypes.bool.isRequired,
};

export default Word;
