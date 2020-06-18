import React from 'react';
import PropTypes from 'prop-types';

const path = 'https://raw.githubusercontent.com/DmitriEr/rslang-data/master/';

const Image = ({
  current: { word, image },
}) => {
  const link = `${path}${image}`;

  return (
    <div className="speakit__image">
      <img src={image !== '' ? link : ''} alt={word} className="speakit__image_word" />
      <p className="speakit__image_translate">{word}</p>
    </div>
  );
};

Image.propTypes = {
  current: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Image;
