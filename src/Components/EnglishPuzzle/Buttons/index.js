import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import Result from './Result';

const Buttons = ({
  changeSentence,
  numberSentence,
  noAnswer,
  check,
  switchLevel,
  showCompare,
  addTrueAnswer,
  showNoAnswer,
  second,
  showSecond,
  showCheck,
  setCheckBtns,
  showStatistics,
  statistics,
  sentence,
  addListCorrect,
  addListError,
  showListCorrect,
  showListError,
  currentLevel: {
    page,
  },
  numberGroup,
  nextStage,
}) => {
  const [visual, setVisual] = useState(false);
  const closeModal = () => {
    setVisual(false);
  };

  const control = () => {
    setCheckBtns('noAnswer');
    changeSentence(numberSentence + 1);
    showNoAnswer(false);
    showCheck(false);
    showSecond(true);
  };

  const nextGame = () => {
    setVisual(false);
    if (page < 5) {
      switchLevel({
        group: numberGroup,
        page: page + 1,
      });
      changeSentence(0);
      showStatistics(false);
      showNoAnswer(true);
    } else {
      nextStage('completed');
      showStatistics(false);
    }
    addListCorrect(new Set());
  };

  const repeat = () => {
    setVisual(false);
    switchLevel({
      group: numberGroup,
      page: page + 0,
    });
    setCheckBtns('repeat');
    showStatistics(false);
    showNoAnswer(true);
    changeSentence(0);
    addListCorrect(new Set());
  };

  const showButton = () => {
    if (showListCorrect.size === 10) {
      return (
        <Button
          key="submit"
          type="primary"
          onClick={nextGame}
        >
          Следующий уровень
        </Button>
      );
    }
    return (
      <Button
        key="submit"
        type="primary"
        onClick={repeat}
      >
        Заново
      </Button>
    );
  };

  const btnNoAnswer = () => {
    if (noAnswer) {
      return (
        <Button
          type="primary"
          shape="round"
          onClick={() => {
            control();
            addListError((prev) => new Set(prev.add(sentence)));
          }}
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
          onClick={() => {
            const checkAnswer = showCompare.false;
            const solution = showCompare.true;
            const arrValue = [];
            checkAnswer.forEach((value, index) => {
              if (value === solution[index]) {
                arrValue.push(value);
              }
            });
            addTrueAnswer(arrValue);
            if (arrValue.length === solution.length) {
              control();
              addListCorrect((prev) => new Set(prev.add(sentence)));
            } else {
              showNoAnswer(true);
            }
          }}
        >
          Проверить
        </Button>
      );
    }
    return null;
  };

  const btnContinue = () => {
    if (second) {
      return (
        <Button
          type="primary"
          shape="round"
          onClick={() => {
            if (numberSentence === 10) {
              showStatistics(true);
              showSecond(false);
            }
            if (numberSentence < 10) {
              addTrueAnswer([]);
              changeSentence(numberSentence);
              setCheckBtns('secondSentence');
              showNoAnswer(true);
              showSecond(false);
              showCheck(false);
            }
          }}
        >
          Продолжить
        </Button>
      );
    }
    return null;
  };

  const btnStatistic = () => {
    if (statistics) {
      return (
        <Button
          type="primary"
          shape="round"
          onClick={() => { setVisual(true); }}
        >
          Результат
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
      {btnStatistic()}
      <Modal
        visible={visual}
        title="Результаты игры"
        onCancel={closeModal}
        footer={[
          <Button
            key="back"
            onClick={closeModal}
          >
            Вернуться
          </Button>,
          showButton(),
        ]}
      >
        <Result
          showListCorrect={showListCorrect}
          showListError={showListError}
        />
      </Modal>
    </div>
  );
};

Buttons.propTypes = {
  changeSentence: PropTypes.func.isRequired,
  numberSentence: PropTypes.number.isRequired,
  noAnswer: PropTypes.bool.isRequired,
  check: PropTypes.bool.isRequired,
  switchLevel: PropTypes.func.isRequired,
  addTrueAnswer: PropTypes.func.isRequired,
  showCompare: PropTypes.objectOf(PropTypes.array).isRequired,
  showNoAnswer: PropTypes.func.isRequired,
  second: PropTypes.bool.isRequired,
  showSecond: PropTypes.func.isRequired,
  showCheck: PropTypes.func.isRequired,
  setCheckBtns: PropTypes.func.isRequired,
  showStatistics: PropTypes.func.isRequired,
  statistics: PropTypes.bool.isRequired,
  sentence: PropTypes.string.isRequired,
  addListCorrect: PropTypes.func.isRequired,
  addListError: PropTypes.func.isRequired,
  showListCorrect: PropTypes.instanceOf(Set).isRequired,
  showListError: PropTypes.instanceOf(Set).isRequired,
  currentLevel: PropTypes.shape({
    page: PropTypes.number.isRequired,
  }).isRequired,
  numberGroup: PropTypes.number.isRequired,
  nextStage: PropTypes.func.isRequired,
};

export default Buttons;
