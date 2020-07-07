import React from 'react';
import PropTypes from 'prop-types';

const Score = (props) => {
  const { score } = props;
  return (
    <div className="savanna-header__score-container score-container">
      <span className="score-container__title">Очки: </span>
      <span className="score-container__score">{score}</span>
    </div>
  );
};
Score.propTypes = {
  score: PropTypes.number.isRequired,
};

export default Score;
