import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '../Speakit_Card';

const Cards = (props) => {
  const { words, change } = props;
  const [wordCollection, setWordCollection] = useState([]);

  useEffect(() => {
    const collection = words.map((element) => {
      const card = <Card word={element} key={element.id} change={change} />;
      return card;
    });
    setWordCollection(collection);
  }, [words]);

  return <div className="speakit__cards">{ wordCollection }</div>;
};

Cards.propTypes = {
  words: PropTypes.arrayOf(PropTypes.any).isRequired,
  change: PropTypes.func.isRequired,
};

export default Cards;
