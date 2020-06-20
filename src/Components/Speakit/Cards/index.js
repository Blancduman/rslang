import React from 'react';
import PropTypes from 'prop-types';
import Word from '../Card';

const Cards = (props) => {
  const { words, change } = props;

  return (
    <div className="speakit__cards">
      {words.map((element) => (
        <Word letter={element} key={element.id} change={change} />
      ))}
    </div>
  );
};

Cards.propTypes = {
  words: PropTypes.arrayOf(PropTypes.shape({
    word: PropTypes.string,
  })).isRequired,
  change: PropTypes.func.isRequired,
};

export default Cards;
