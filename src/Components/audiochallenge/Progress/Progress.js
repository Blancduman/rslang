import React from 'react';
import { StarFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';
import './Progress.css';

const Progress = (props) => {
  const { listUsedWord } = props;

  const addStar = (item, index) => (item.guessed ? (
    <StarFilled
      key={index}
      id="audiochallenge__progress_box-right_star"
    />
  ) : (
    <StarFilled
      key={index}
      id="audiochallenge__progress_box-wrong_star"
    />
  ));

  return (
    <div className="audiochallenge__progress_box">
      {listUsedWord.map(addStar)}
    </div>
  );
};

Progress.propTypes = {
  listUsedWord: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string.isRequired,
      guessed: PropTypes.bool.isRequired,
      wrongWord: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Progress;
