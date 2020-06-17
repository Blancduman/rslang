import React from 'react';
import { Progress } from 'antd';
import PropTypes from 'prop-types';
import './progressline.css';

const calculatePercent = (amount, total) => ((amount / total) * 100);

const ProgressLine = (props) => {
  const { done, total } = props;

  return (
    <div className="dictionary__progressline">
      { done }
      {' '}
      <Progress percent={calculatePercent(done, total)} showInfo={false} style={{ width: '80%' }} />
      {' '}
      { total }
    </div>
  );
};

ProgressLine.defaultProps = {
  done: 0,
  total: 0,
};

ProgressLine.propTypes = {
  done: PropTypes.number,
  total: PropTypes.number,
};

export default ProgressLine;
