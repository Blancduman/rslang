import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import AnswerCorrectWord from './AnswerCorrectWord';
import AnswerIncorrectWord from './AnswerIncorrectWord';

const AnswerInputField = (props) => {
  const {
    word, userAnsweredCorrect, userAnsweredIncorrect, isFinished,
  } = props;
  const [answer, setAnswer] = useState('');
  const [letters, setLetters] = useState([]);
  const [correctIndexes, setCorrectIndexes] = useState([]);
  const [incorrectIndexes, setIncorrectIndexes] = useState([]);
  const inputRef = useRef(null);

  const clearBackground = () => {
    setCorrectIndexes([]);
    setIncorrectIndexes([]);
  };

  const clearAnswer = () => {
    setAnswer('');
  };

  useEffect(() => {
    setLetters(word.split(''));
    if (isFinished) {
      setAnswer(word);
      clearBackground();
    } else {
      inputRef.current.focus();
      clearAnswer();
    }
  }, [word]);

  const onChangeAnswer = (e) => {
    const { value } = e.target;
    setAnswer(value);
    if (correctIndexes.length !== 0 || incorrectIndexes.length !== 0) {
      clearBackground();
    }
  };

  const checkAnswer = (e) => {
    if (e.key === 'Enter') {
      if (word === answer) {
        userAnsweredCorrect();
      } else {
        const answerLetters = answer.split('');
        clearAnswer();
        let correct = [];
        let incorrect = [];

        letters.forEach((letter, index) => {
          if (answerLetters[index] === letters[index]) {
            correct = [
              ...correct,
              index,
            ];
          } else {
            incorrect = [
              ...incorrect,
              index,
            ];
          }
        });

        setCorrectIndexes(correct);
        setIncorrectIndexes(incorrect);
        userAnsweredIncorrect();
      }
    }
  };

  return (
    <Typography.Text className="learning-words__card_input-container">
      <AnswerCorrectWord letters={letters} correctLetterIndexes={correctIndexes} />
      <AnswerIncorrectWord letters={letters} incorrectLetterIndexes={incorrectIndexes} />
      <input
        className="learning-words__card_answer-input"
        ref={inputRef}
        type="text"
        maxLength={50}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        onChange={onChangeAnswer}
        value={answer}
        onKeyDown={checkAnswer}
      />
    </Typography.Text>
  );
};

AnswerInputField.propTypes = {
  word: PropTypes.string.isRequired,
  userAnsweredCorrect: PropTypes.func.isRequired,
  userAnsweredIncorrect: PropTypes.func.isRequired,
  isFinished: PropTypes.bool.isRequired,
};

export default AnswerInputField;
