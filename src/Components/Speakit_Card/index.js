import React from 'react';

const Card = (props) => {
  const { word, wordTranslate } = props.word;

  return <div className="speakit__cards_card">
    <p>{word}</p>
    <p>{wordTranslate}</p>
  </div>;
};

export default Card;
