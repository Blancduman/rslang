import React from 'react';
import PropTypes from 'prop-types';

const path = 'https://raw.githubusercontent.com/DmitriEr/rslang-data/master/';

const Image = ({
  current: { word, image },
}) => {
  return (
    <div className="speakit__image">
      <img src={image !== '' ? `${path}${image}` : null} alt={word} className="speakit__image_word" />
      <p className="speakit__image_translate">{word}</p>
    </div>
  );
};

Image.propTypes = {
  current: PropTypes.shape({
    word: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default Image;
