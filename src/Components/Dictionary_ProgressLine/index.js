import React from 'react';
import { Progress } from 'antd';
import PropTypes from 'prop-types';
import './ProgressLine.css';

const ProgressLine = (props) => {
  const { percentage, done, total } = props;

  return (
    <div className="dictionary__progressline">
      { done }
      {' '}
      <Progress percent={percentage} showInfo={false} style={{ width: '80%' }} />
      {' '}
      { total }
    </div>
  );
};

ProgressLine.defaultProps = {
  percentage: 0,
  done: 0,
  total: 0,
};

ProgressLine.propTypes = {
  percentage: PropTypes.number,
  done: PropTypes.number,
  total: PropTypes.number,
};

export default ProgressLine;
