import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const Buttons = ({
  changeSentence,
  numberSentence,
  noAnswer,
  check,
  switchLevel,
}) => {
  const btnNoAnswer = () => {
    if (noAnswer) {
      return (
        <Button
          type="primary"
          shape="round"
          disabled
          onClick={() => changeSentence(numberSentence + 1)}
        >
          Не знаю
        </Button>
      );
    }
    return null;
  };

  const btnCheck = () => {
    if (check) {
      return (
        <Button
          type="primary"
          shape="round"
          onClick={() => changeSentence(numberSentence + 1)}
        >
          Проверить
        </Button>
      );
    }
    return null;
  };

  const btnContinue = () => {
    if (check) {
      return (
        <Button
          type="primary"
          shape="round"
          onClick={() => switchLevel({ group: 0, page: 1 })}
        >
          Продолжить
        </Button>
      );
    }
    return null;
  };

  return (
    <div className="english-puzzle__buttons">
      {btnCheck()}
      {btnNoAnswer()}
      {btnContinue()}
    </div>
  );
};

Buttons.propTypes = {
  changeSentence: PropTypes.func.isRequired,
  numberSentence: PropTypes.number.isRequired,
  noAnswer: PropTypes.bool.isRequired,
  check: PropTypes.bool.isRequired,
  switchLevel: PropTypes.func.isRequired,
};

export default Buttons;
