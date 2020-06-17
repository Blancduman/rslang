import React from 'react';

const path = 'https://raw.githubusercontent.com/DmitriEr/rslang-data/master/';

const Image = (props) => {
  const { current } = props;

  return (
    <div className="speakit__image">
      <img src={current.image !== '' ? `${path}${current.image}` : ''} alt={current.word} className="speakit__image_word" />
      <p className="speakit__image_translate">{current.word}</p>
    </div>
  );
};

export default Image;
