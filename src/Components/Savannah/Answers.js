import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { getRandomInt } from '../../utls/index';

function markWord(lastPressIndex, index, rightAnswer, isFailed) {
  if (lastPressIndex !== null) {
    if (lastPressIndex === index) {
      return lastPressIndex === rightAnswer ? 'right-answer' : 'false-answer';
    }
    return index === rightAnswer && 'right-answer';
  } if (lastPressIndex === null && isFailed === true && index === rightAnswer) return 'right-answer';
  return '';
}

const Answers = (props) => {
  const {
    words, currentRound, giveAnswer, isFailed,
  } = props;
  const [lastPressIndex, setLastPressIndex] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [answers, setAnswers] = useState([]);
  const rightAnswer = useRef(Number);

  useEffect(() => {
    const ans = [];
    function shuffleAnswers() {
      ans.push(words[currentRound].wordTranslate);
      while (ans.length < 4) {
        const wordAsnwer = words[getRandomInt(19)].wordTranslate;
        if (!ans.includes(wordAsnwer)) {
          ans.push(wordAsnwer);
        }
      }
      ans.sort(() => Math.random() - 0.5);
      rightAnswer.current = ans.indexOf(words[currentRound].wordTranslate);
      setAnswers(ans);
    }
    shuffleAnswers();
  }, [words, currentRound]);

  function createButtonsAnswers() {
    return answers.map((item, index) => (
      <button
        type="submit"
        className={
          `answers__answer ${
            markWord(lastPressIndex, index, rightAnswer.current, isFailed)}`
        }
        onClick={() => {
          if (!isClicked) {
            setIsClicked(true);
            setLastPressIndex(index);
            giveAnswer(index === rightAnswer.current, isFailed);
          }
        }}
        key={(item)}
      >
        {item}
      </button>
    ));
  }

  return (
    <div className="savanna-game-field__answers answers">
      {createButtonsAnswers()}
    </div>
  );
};

Answers.propTypes = {
  words: PropTypes.arrayOf(PropTypes.shape).isRequired,
  giveAnswer: PropTypes.func.isRequired,
  currentRound: PropTypes.number.isRequired,
  isFailed: PropTypes.bool.isRequired,
};

export default Answers;
