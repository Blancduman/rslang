import React from 'react';
import PropTypes from 'prop-types';

const path = 'https://raw.githubusercontent.com/DmitriEr/rslang-data/master/';

const Image = ({
  currentLetter,
  currentPicture,
}) => {
  return (
    <div className="speakit__image">
      <img src={currentPicture !== '' ? `${path}${currentPicture}` : null} alt={currentLetter} className="speakit__image_word" />
      <p className="speakit__image_translate">{currentLetter}</p>
    </div>
  );
};

Image.propTypes = {
  currentLetter: PropTypes.string.isRequired,
  currentPicture: PropTypes.string.isRequired,
};

export default Image;
