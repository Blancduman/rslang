import React, { useState, useEffect } from 'react';
import {
  Button, Space, Spin, Typography,
} from 'antd';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import WordBtn from '../WordBtn/WordBtn';
import Progress from '../Progress/Progress';
import ModalResult from '../ModalResult/ModalResult';
import shuffle from '../../../utls/Audichallenge/shuffle';
import soundRight from '../../../assets/sound/right_answer.mp3';
import soundWrong from '../../../assets/sound/wrong-answer.mp3';
import playAudio from '../../../utls/Audichallenge/playAudio';
import { getRandomInt } from '../../../utls/index';
import './Context.css';

const Context = (props) => {
  const [loading, setLoading] = useState(false);
  const { isSound, selectedGroup } = props;
  const [isChosed, setIsChosed] = useState({
    isChosed: false,
    isRight: false,
    word: '',
    wrongWord: '',
  });
  const [listWords, setWords] = useState([]);
  const [outputWord, setOutputWord] = useState([]);
  const [level, setLevel] = useState({ group: selectedGroup, page: 1 });
  const [count, setCount] = useState(0);
  const [currentWord, setCurrentWord] = useState({
    audio: '',
    image: '',
    word: '',
    transcription: '',
  });
  const [listUsedWord, setListUsedWord] = useState([]);
  const [statisticWords, setStatisticWords] = useState([]);
  const [backgr, setBackgr] = useState({
    hue: 147,
    saturation: 50,
    lightening: 47,
  });
  const { Text } = Typography;

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const result = await fetch(
        `https://afternoon-falls-25894.herokuapp.com/words?group=${level.group}&page=${level.page}`,
      )
        .then((response) => response.json())
        .then((res) => res)
        .catch((error) => error);

      setIsChosed({
        isChosed: false,
        isRight: false,
        word: '',
        wrongWord: '',
      });
      shuffle(result);
      setWords(result);
      setCurrentWord(result[count]);
      setLoading(false);
      document.querySelector(
        '.audiochallenge__wrapper',
      ).style.backgroundColor = `hsl(${backgr.hue}, ${backgr.saturation}%, ${backgr.lightening}%)`;
    };
    fetchData();

    setBackgr({
      hue: getRandomInt(360),
      saturation: getRandomInt(100),
      lightening: getRandomInt(100),
    });
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
    setIsChosed({
      isChosed: true,
      isRight: result,
      word: currentWord.word,
      wrongWord,
    });

    setListUsedWord(
      listUsedWord.concat({
        word: currentWord.word,
        translate: currentWord.wordTranslate,
        guessed: result,
        wrongWord,
      }),
    );
  };

  const verificationWord = (event, value = false) => {
    let valClickWord = '';

    if (!value) valClickWord = event.currentTarget.value;
    else valClickWord = value;

    if (currentWord.word === valClickWord) {
      statistic(true);
      playAudio(soundRight);
    } else {
      statistic(false, valClickWord);
      playAudio(soundWrong);
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
    setLevel({ group: selectedGroup, page: level.page + 1 });
  };

  const nextWord = (event) => {
    if (count > 2) {
      ModalResult(level, listUsedWord, nextLevel);
    } else {
      setCount(count + 1);
      setIsChosed({
        isChosed: false,
        isRight: false,
        word: '',
        wrongWord: '',
      });
      setCurrentWord(listWords[count + 1]);
    }

    event.preventDefault();
  };

  if (loading) {
    return (
      <div className="audiochallenge__context-loading">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <div className="audiochallenge__context">
      <div className="audiochallenge__context-level_title">
        <Space>
          <Text type="warning">{`Level: ${level.page}`}</Text>
        </Space>
      </div>
      <Card currentWord={currentWord} isChosed={isChosed} isSound={isSound} />
      <WordBtn
        words={outputWord}
        isChosed={isChosed}
        verificationWord={verificationWord}
      />
      <div className="audiochallenge__context-btn_next">
        {isChosed.isChosed && (
          <Button onClick={nextWord} autoFocus>
            Дальше
          </Button>
        )}
      </div>
      <Progress listUsedWord={listUsedWord} />
    </div>
  );
};

Context.propTypes = {
  isSound: PropTypes.bool.isRequired,
  selectedGroup: PropTypes.string.isRequired,
};

export default Context;
