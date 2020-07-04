import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import './Context.css';
import Card from '../Card/Card';
import WordBtn from '../WordBtn/WordBtn';
import soundRight from '../../../assets/sound/right_answer.mp3';
import soundWrong from '../../../assets/sound/wrong-answer.mp3';

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const Context = (props) => {
  const { isSound } = props;
  const [isChosed, setIsChosed] = useState({
    isChosed: false,
    isRight: false,
    word: '',
  });
  const [listWords, setWords] = useState([]);
  const [outputWord, setOutputWord] = useState([]);
  const [level, setLevel] = useState({ group: 1, page: 1 });
  const [count, setCount] = useState(0);
  const [currentWord, setCurrentWord] = useState({});
  const [listUsedWord, setListUsedWord] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://afternoon-falls-25894.herokuapp.com/words?group=${level.group}&page=${level.page}`,
      )
        .then((response) => response.json())
        .then((res) => res)
        .catch((error) => error);

      shuffle(result);
      setWords(result);
      setCurrentWord(result[count]);
    };
    fetchData();
  }, [level]);

  useEffect(() => {
    setOutputWord(
      shuffle(
        shuffle(listWords.filter((e) => e.word !== currentWord.word))
          .filter((e, i) => i < 4)
          .concat(currentWord),
      ),
    );
  }, [currentWord]);

  const statistic = (result, wrongWord = '') => {
    setIsChosed({ isChosed: true, isRight: result, word: currentWord.word });
    setListUsedWord(
      listUsedWord.concat({
        word: currentWord.word,
        guessed: result,
        wrongWord,
      }),
    );
  };

  const playAnswer = (music) => {
    const audio = new Audio(music);
    audio.play();
  };

  const verificationWord = (event) => {
    const valClickWord = event.currentTarget.value;
    if (currentWord.word === valClickWord) {
      statistic(true);
      playAnswer(soundRight);
    } else {
      statistic(false, valClickWord);
      playAnswer(soundWrong);
    }
    event.preventDefault();
  };

  const nextWord = () => {
    setIsChosed({ isChosed: false, isRight: false, word: '' });
    if (count === 19) {
      setCount(0);
      setLevel({ group: 1, page: level.page + 1 });
    } else {
      setCount(count + 1);
      setCurrentWord(listWords[count + 1]);
    }
  };

  return (
    <div className="audiochallenge__context">
      <Card currentWord={currentWord} isChosed={isChosed} isSound={isSound} />
      <WordBtn
        words={outputWord}
        isChosed={isChosed}
        verificationWord={verificationWord}
      >
        {' '}
      </WordBtn>
      <div>
        {isChosed.isChosed && <Button onClick={nextWord}>Дальше</Button>}
      </div>
    </div>
  );
};

Context.propTypes = {
  isSound: PropTypes.bool.isRequired,
};

export default Context;
