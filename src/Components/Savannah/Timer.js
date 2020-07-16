import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Timer = (props) => {
  const { setGameOver } = props;
  const [timer, setTimer] = useState(60);
  useEffect(() => {
    let timerId;
    if (timer === 0) setGameOver();
    else {
      timerId = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(timerId);
    }
    return clearTimeout(timerId);
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
