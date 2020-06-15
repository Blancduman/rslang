import React, { useState, useEffect } from 'react';
import Card from '../Speakit_Card';

const Cards = (props) => {
  const { words } = props;
  const [wordCollection, setWordCollection] = useState([]);

  useEffect(() => {
    const collection = words.map((el, i) => {
      const card = <Card word={el} key={i} />;
      return card;
    });
    setWordCollection(collection);
  }, [words]);

  const example = () => console.log('clicked');

  return <div className="speakit__cards" onClick={example}>{ wordCollection }</div>;
};

export default Cards;
