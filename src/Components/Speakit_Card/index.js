import React, { useState } from 'react';
import showCard from '../../Helper/ShowCard';

const Card = (props) => {
  const {
    word, transcription, wordTranslate, image,
  } = props.word;

  const handleMouseShowCard = (event) => {
    showCard(event);
  };

  const handleKeyShowCard = (event) => {
    if (event.key === 'Enter') {
      showCard(event);
    }
    return false;
  };

  return (
    <div tabIndex="0" role="button" className="speakit__cards_card" onClick={handleMouseShowCard} onKeyDown={handleKeyShowCard}>
      <p className="speakit__word">{word}</p>
      <p className="speakit__transcription">{transcription}</p>
      <p className="speakit__cards_hidden speakit__translate">{wordTranslate}</p>
      <p className="speakit__cards_hidden speakit__img">{image}</p>
    </div>
  );
};

export default Card;
