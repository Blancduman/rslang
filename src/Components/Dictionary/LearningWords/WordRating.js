import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip, Divider } from 'antd';

const WordRating = (props) => {
  const {
    onAgain, onHard, onFine, onEasy, hide, notAgain,
  } = props;
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(false);
  }, [notAgain]);

  return (
    <div
      className={`${!hide ? 'display-none' : ''}`}
    >
      <Divider orientation="left">Оценка слова</Divider>
      <div className="learning-words__word-rating">
        <Tooltip title="Слово появится снова в сегодняшней тренировке." color="cyan">
          <Button
            onClick={() => {
              setDisabled(true);
              onAgain();
            }}
            disabled={disabled}
          >
            Снова
          </Button>
        </Tooltip>
        <Tooltip title="Слово появится снова через 13 дней." color="red">
          <Button
            onClick={() => {
              setDisabled(true);
              onHard();
            }}
            disabled={disabled}
          >
            Трудно
          </Button>
        </Tooltip>
        <Tooltip title="Слово появится снова через 1 месяц и 12 дней." color="orange">
          <Button
            onClick={() => {
              setDisabled(true);
              onFine();
            }}
            disabled={disabled}
          >
            Хорошо
          </Button>
        </Tooltip>
        <Tooltip title="Слово появится снова через 3 месяц." color="green">
          <Button
            onClick={() => {
              setDisabled(true);
              onEasy();
            }}
            disabled={disabled}
          >
            Легко
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

WordRating.propTypes = {
  onAgain: PropTypes.func.isRequired,
  onHard: PropTypes.func.isRequired,
  onFine: PropTypes.func.isRequired,
  onEasy: PropTypes.func.isRequired,
  hide: PropTypes.bool.isRequired,
  notAgain: PropTypes.number.isRequired,
};

export default WordRating;
