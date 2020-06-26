import React, { useEffect } from 'react';
import './savanna.css';
import PropTypes from 'prop-types';

const Word = (props) => {
  const { word, gameover, fail } = props;
  useEffect(() => {
    if (!gameover) {
      const timerId = setTimeout(() => fail(), 3000);
      return () => clearTimeout(timerId);
    }
  });

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
  fail: PropTypes.func.isRequired,
  gameover: PropTypes.bool.isRequired,
};

export default Word;
