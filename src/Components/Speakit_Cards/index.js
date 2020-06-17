import React, { useState, useEffect } from 'react';
import Card from '../Speakit_Card';

const Speaker = new SpeechSynthesisUtterance();
Speaker.volume = 1;
Speaker.rate = 1;
Speaker.pitch = 1;
Speaker.lang = 'en-EN';

const Cards = (props) => {
  const { words, change } = props;
  const [wordCollection, setWordCollection] = useState([]);

  useEffect(() => {
    const collection = words.map((element) => {
      const card = <Card word={element} key={element.id} change={change} speech={Speaker} />;
      return card;
    });
    setWordCollection(collection);
  }, [words]);

  return <div className="speakit__cards">{ wordCollection }</div>;
};

export default Cards;
