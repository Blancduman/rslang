import React from 'react';
import { Progress } from 'antd';
import PropTypes from 'prop-types';
import { calculatePercent } from '../../../utls';
import './progressline.css';

const ProgressLine = (props) => {
  const { done, total } = props;

  return (
    <div className="dictionary__progressline">
      { done }
      {' '}
      <Progress className="dictionary__progressline_progress" percent={calculatePercent(done, total)} showInfo={false} />
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
