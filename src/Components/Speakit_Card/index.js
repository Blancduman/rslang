import React, { useState } from 'react';

const Card = (props) => {
  const {
    word, transcription, wordTranslate, image,
  } = props.word;

  const test = (event) => { 
    const picture = document.querySelector('.speakit__image_word');
    const link = event.currentTarget.querySelector('.speakit__img').textContent;
    const description = event.currentTarget.querySelector('.speakit__word');
    picture.src = `https://raw.githubusercontent.com/DmitriEr/rslang-data/master/${link}`;
    picture.alt = description.textContent;
  };

  return (
    <div className="speakit__cards_card" onClick={test}>
      <p className="speakit__word">{word}</p>
      <p className="speakit__transcription">{transcription}</p>
      <p className="speakit__cards_hidden speakit__translate">{wordTranslate}</p>
      <p className="speakit__cards_hidden speakit__img">{image}</p>
    </div>
  );
};

export default Card;
