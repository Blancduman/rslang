import React from 'react';

const Translate = (props) => {
  const { word, image, wordTranslate } = props.word;

  const path = `https://raw.githubusercontent.com/DmitriEr/rslang-data/master/${image}`;

  return (
    <div>
      <img src={path} alt={word} className="speakit__image_word" />
      <p className="speakit__image_translate">{word}</p>
    </div>
  );
};

export default Translate;
