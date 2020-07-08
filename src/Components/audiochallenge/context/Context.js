import React, { useState, useEffect } from 'react';
import { Modal, Button, Space } from 'antd';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import WordBtn from '../WordBtn/WordBtn';
import Progress from '../Progress/Progress';
import shuffle from '../../../utls/Audichallenge/shuffle';
import soundRight from '../../../assets/sound/right_answer.mp3';
import soundWrong from '../../../assets/sound/wrong-answer.mp3';
import './Context.css';

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
  const [currentWord, setCurrentWord] = useState({
    audio: '',
    image: '',
    word: '',
    transcription: '',
  });
  const [listUsedWord, setListUsedWord] = useState([]);
  const [statisticWords, setStatisticWords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://afternoon-falls-25894.herokuapp.com/words?group=${level.group}&page=${level.page}`,
      )
        .then((response) => response.json())
        .then((res) => res)
        .catch((error) => error);

      setIsChosed({ isChosed: false, isRight: false, word: '' });
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

  const nextLevel = () => {
    setStatisticWords(
      statisticWords.concat({
        group: level.group,
        page: level.page,
        selectedWords: listUsedWord,
      }),
    );
    setListUsedWord([]);
    setCount(0);
    setLevel({ group: 1, page: level.page + 1 });
  };

  function showModalWindow() {
    return (
      <Space>
        {Modal.success({
          title: `Вы прошли уровень №${level.page} в группе №${level.group} `,
          content: `
              ${listUsedWord.map((item) => (
                <div>
                  <div className="audiochallenge__modal_context-word">
                    {item.word}
                  </div>
                  <div className="audiochallenge__modal_context-answer">
                    {item.guessed}
                  </div>
                </div>
          ))}`,

          onOk() {
            nextLevel();
          },
        })}
      </Space>
    );
  }

  const nextWord = (event) => {
    if (count > 18) {
      showModalWindow();
    } else {
      setCount(count + 1);
      setIsChosed({ isChosed: false, isRight: false, word: '' });
      setCurrentWord(listWords[count + 1]);
    }

    event.preventDefault();
  };

  return (
    <div className="audiochallenge__context">
      <div>
        <p>
          Group:
          {' '}
          {level.group}
          {' '}
          Level:
          {' '}
          {level.page}
        </p>
      </div>
      <Card currentWord={currentWord} isChosed={isChosed} isSound={isSound} />
      <WordBtn
        words={outputWord}
        isChosed={isChosed}
        verificationWord={verificationWord}
      />
      <div className="audiochallenge__context-btn_next">
        {isChosed.isChosed && <Button onClick={nextWord}>Дальше</Button>}
      </div>
      <Progress listUsedWord={listUsedWord} />
    </div>
  );
};

Context.propTypes = {
  isSound: PropTypes.bool.isRequired,
};

export default Context;
