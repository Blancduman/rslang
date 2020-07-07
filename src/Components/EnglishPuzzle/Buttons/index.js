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
    switch (noAnswer) {
      case 'true': {
        return (
          <Button
            type="primary"
            shape="round"
            disabled
            onClick={() => {
              changeSentence(numberSentence + 1);
            }}
          >
            Не знаю
          </Button>
        );
      }
      default: {
        return null;
      }
    }
  };

  const btnCheck = () => {
    switch (check) {
      case 'true': {
        return (
          <Button
            type="primary"
            shape="round"
            onClick={() => { changeSentence(numberSentence + 1); }}
          >
            Проверить
          </Button>
        );
      }
      default: {
        return null;
      }
    }
  };

  const btnContinue = () => {
    switch (check) {
      case 'true': {
        return (
          <Button
            type="primary"
            shape="round"
            onClick={() => { switchLevel({ group: 0, page: 1 }); }}
          >
            Продолжить
          </Button>
        );
      }
      default: {
        return null;
      }
    }
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
  noAnswer: PropTypes.string.isRequired,
  check: PropTypes.string.isRequired,
  switchLevel: PropTypes.func.isRequired,
};

export default Buttons;
