import React, { useState, useEffect, useRef } from 'react';
import './savanna.css';
import PropTypes from 'prop-types';
import getRandomInt from './helpers/getRandomInt';

const Answers = (props) => {
  const {
    words, currentRound, giveAnswer,
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
  return (
    <div className="savanna-game-field__answers answers">
      {answers.map((item, index) => (
        <button
          type="submit"
          className={
            `answers__answer ${lastPressIndex === index && (lastPressIndex === rightAnswer.current ? 'right-answer' : 'false-answer')}`
          }
          onClick={() => {
            if (!isClicked) {
              setIsClicked(true);
              setLastPressIndex(index);
              giveAnswer(index === rightAnswer.current, isClicked);
            }
          }}
          key={(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
Answers.propTypes = {
  words: PropTypes.arrayOf(PropTypes.any).isRequired,
  giveAnswer: PropTypes.func.isRequired,
  currentRound: PropTypes.number.isRequired,
};

export default Answers;
