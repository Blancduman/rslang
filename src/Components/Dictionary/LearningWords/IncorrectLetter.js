import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

const IncorrectLetter = (props) => {
  const { letter, hide } = props;

  return <Typography.Text className={hide ? 'hidden' : ''}>{letter}</Typography.Text>;
};

IncorrectLetter.propTypes = {
  letter: PropTypes.string.isRequired,
  hide: PropTypes.bool.isRequired,
};

export default IncorrectLetter;
