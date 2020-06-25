import React from 'react';
import PropTypes from 'prop-types';
import Word from '../Card';

const Cards = (props) => {
  const {
    words,
    checkPronunciations,
    cardOff,
    changeLetter,
    changePicture,
    addCorrect,
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
          addCorrect={addCorrect}
        />
      ))}
    </div>
  );
};

Cards.propTypes = {
  words: PropTypes.arrayOf(PropTypes.shape({
    word: PropTypes.string,
  })).isRequired,
  cardOff: PropTypes.string.isRequired,
  checkPronunciations: PropTypes.string.isRequired,
  changeLetter: PropTypes.func.isRequired,
  changePicture: PropTypes.func.isRequired,
  addCorrect: PropTypes.func.isRequired,
};

export default Cards;
