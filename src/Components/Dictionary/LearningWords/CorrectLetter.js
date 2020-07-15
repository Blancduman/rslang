import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

const CorrectLetter = (props) => {
  const { letter, hide } = props;

  return <Typography.Text className={hide ? 'hidden' : ''}>{letter}</Typography.Text>;
};

CorrectLetter.propTypes = {
  letter: PropTypes.string.isRequired,
  hide: PropTypes.bool.isRequired,
};

export default CorrectLetter;
