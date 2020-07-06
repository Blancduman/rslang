import React from 'react';
import PropTypes from 'prop-types';
import Word from '../Word';

const Cards = (props) => {
  const {
    words,
    checkPronunciations,
    cardOff,
    changeLetter,
    changePicture,
    addCorrectAnswer,
    removeErrorAnswer,
  } = props;

  return (
    <div className="speakit__cards">
      {words.map((element) => (
        <Word
          letter={element}
          key={element.id}
          checkPronunciations={checkPronunciations}
          cardOff={cardOff}
          changeLetter={changeLetter}
          changePicture={changePicture}
          addCorrectAnswer={addCorrectAnswer}
          removeErrorAnswer={removeErrorAnswer}
        />
      ))}
    </div>
  );
};

Cards.propTypes = {
  words: PropTypes.arrayOf(PropTypes.shape({
    word: PropTypes.string,
  })).isRequired,
  cardOff: PropTypes.bool.isRequired,
  checkPronunciations: PropTypes.string.isRequired,
  changeLetter: PropTypes.func.isRequired,
  changePicture: PropTypes.func.isRequired,
  addCorrectAnswer: PropTypes.func.isRequired,
  removeErrorAnswer: PropTypes.shape({
    value: PropTypes.string,
  }).isRequired,
};

export default Cards;
