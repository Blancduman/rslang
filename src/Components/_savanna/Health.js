import React from 'react';
import './savanna.css';
import PropTypes from 'prop-types';

const Health = (props) => {
  const { health } = props;
  const hearts = new Array(health).fill('').map((item, index) => <div className="savanna-header__life" key={`${index * 1}`}>&lt;3</div>);
  return (
    <div className="savanna-header__life-container">
      {hearts}
    </div>
  );
};
Health.propTypes = {
  health: PropTypes.number.isRequired,
};

export default Health;
