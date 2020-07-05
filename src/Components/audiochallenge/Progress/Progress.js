import React from 'react';
import { StarFilled } from '@ant-design/icons';
import './Progress.css';
import PropTypes from 'prop-types';

const Progress = (props) => {
  const { listUsedWord } = props;

  const addStar = (item, index) => (item.guessed ? (
    <StarFilled key={index} style={{ fontSize: '48px', color: 'yellow' }} />
  ) : (
    <StarFilled key={index} style={{ fontSize: '48px' }} />
  ));

  return (
    <div className="audiochallenge__progress_box">
      {listUsedWord.map(addStar)}
    </div>
  );
};

Progress.propTypes = {
  listUsedWord: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default Progress;
