import React from 'react';
import './savanna.css';
import PropTypes from 'prop-types';
import { HeartTwoTone } from '@ant-design/icons';

const Health = (props) => {
  const { health } = props;
  if (health > 0) {
    const hearts = new Array(health).fill('').map((item, index) => <div className="savanna-header__life" key={`${index * 1}`}><HeartTwoTone twoToneColor="#eb2f96" /></div>);
    return (
      <div className="savanna-header__life-container">
        {hearts}
      </div>
    );
  }
  return (
    <div className="savanna-header__life-container" />
  );
};
Health.propTypes = {
  health: PropTypes.number.isRequired,
};

export default Health;
