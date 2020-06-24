import React, { useState, useEffect } from 'react';
import './savanna.css';
import PropTypes from 'prop-types';

const Timer = (props) => {
  const { setGameOver } = props;
  const [timer, setTimer] = useState(60);
  useEffect(() => {
    if (timer === 0) setGameOver();
    else setTimeout(() => setTimer(timer - 1), 1000);
  }, [timer]);
  return (
    <div className="savanna-header__timer-container timer-container">
      <span className="timer-container__timer">{`Осталось: ${timer}`}</span>
    </div>
  );
};
Timer.propTypes = {
  setGameOver: PropTypes.func.isRequired,
};

export default Timer;