import React from 'react';
import PropTypes from 'prop-types';

const path = 'https://raw.githubusercontent.com/DmitriEr/rslang-data/master/';

const Image = ({
  current: { word, image },
}) => {
  const link = `${path}${image}`;
  const showImage = (image !== '' ? <img src={link} alt={word} className="speakit__image_word" /> : null);

  return (
    <div className="speakit__image">
      {showImage}
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
