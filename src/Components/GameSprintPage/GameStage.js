import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'antd';
import { StarTwoTone } from '@ant-design/icons';
import ButtonGroup from 'antd/lib/button/button-group';
import { useKeyPress } from 'use-hooks/dist/commonjs/use-key-press';
import { loadWords } from '../../Services/wordsService';
import Loading from '../Loading';
import { createUniqueKey, getWordTranslateFromArrayWithChance, reproduceAudioBySource } from '../../utls';

const GameStage = ({
  setStage, score, setScore, level,
}) => {
  const [winSequence, setWinSequence] = useState([false, false, false, false]);
  const [words, setWords] = useState([]);
  const [word, setWord] = useState({});
  const [time, setTime] = useState(60);
  const [multiplier, setMultiplier] = useState(10);
  const [wordTranslate, setWordTranslate] = useState('');
  const [loading, setLoading] = useState(true);

  const rightArrowPressed = useKeyPress('ArrowRight', true);
  const leftArrowPressed = useKeyPress('ArrowLeft', true);

  const passNextWord = (wordArray) => {
    if (wordArray.length > 0) {
      const nextWord = wordArray.shift();
      setWord(nextWord);
      const translation = getWordTranslateFromArrayWithChance(nextWord, wordArray);
      setWordTranslate(translation);
      setWords([...wordArray]);
    }
  };

  const handleCorrectAnswer = () => {
    let newWinSequence = winSequence;
    let newMultiplier = multiplier;
    const index = newWinSequence.indexOf(false);
    if (index >= 0) {
      newWinSequence.splice(index, 1, true);
    } else {
      newMultiplier *= 2;
      newWinSequence = [false, false, false, false];
    }
    setScore((prev) => {
      const newTotal = prev.total + newMultiplier;
      return { ...prev, total: newTotal, correct: prev.correct.concat(word) };
    });
    setWinSequence(newWinSequence);
    setMultiplier(newMultiplier);
    reproduceAudioBySource('../src/assets/audio/correct.mp3');
  };

  const handleIncorrectAnswer = () => {
    setScore((prev) => ({ ...prev, incorrect: prev.incorrect.concat(word) }));
    setWinSequence([false, false, false, false]);
    setMultiplier(10);
    reproduceAudioBySource('../src/assets/audio/error.mp3');
  };

  const handleAnswer = (code) => {
    const isMatch = wordTranslate === word.wordTranslate;
    if (isMatch === code) {
      handleCorrectAnswer();
    } else {
      handleIncorrectAnswer();
    }
    passNextWord(words);
  };

  useEffect(() => {
    if (rightArrowPressed) {
      handleAnswer(true);
    }
  }, [rightArrowPressed]);

  useEffect(() => {
    if (leftArrowPressed) {
      handleAnswer(false);
    }
  }, [leftArrowPressed]);

  useEffect(() => {
    if (time === 0) {
      setStage('finished');
    }
  }, [time]);

  useEffect(() => {
    const idTime = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    loadWords(level)
      .then((res) => {
        setWords(res);
        passNextWord(res);
      })
      .catch(() => setStage('starting'))
      .finally(() => setLoading(false));

    return () => clearInterval(idTime);
  }, []);

  useEffect(() => {
    if (words.length < 10) {
      loadWords(level)
        .then((res) => {
          setWords((prev) => prev.concat(res));
        })
        .catch(() => setStage('starting'));
    }
  }, [words]);

  return (
    loading
      ? <Loading />
      : (
        <>
          <h4 className="game-sprint__label">{score.total}</h4>
          <Card>
            <Card.Grid className="game-sprint__card-layout">
              <div className="game-sprint__star-container">
                {
                  winSequence.map((value) => (value
                    ? (
                      <StarTwoTone
                        key={createUniqueKey()}
                        twoToneColor="#006400"
                        className="game-sprint__star-icon"
                      />
                    )
                    : (
                      <StarTwoTone
                        key={createUniqueKey()}
                        className="game-sprint__star-icon"
                      />
                    )
                  ))
                }
              </div>
              <h4 className="game-sprint__label">{time}</h4>
              <p>{word.word}</p>
              <p>{wordTranslate}</p>
              <ButtonGroup className="game-sprint__button-group">
                <Button
                  className="game-sprint__button game-sprint__button_wrong"
                  onClick={() => handleAnswer(false)}
                >
                  Неверно
                </Button>
                <Button
                  className="game-sprint__button game-sprint__button_right"
                  onClick={() => handleAnswer(true)}
                >
                  Верно
                </Button>
              </ButtonGroup>
            </Card.Grid>
          </Card>
        </>
      )
  );
};

GameStage.propTypes = {
  setStage: PropTypes.func.isRequired,
  score: PropTypes.shape({
    total: PropTypes.number,
    correct: PropTypes.array,
    incorrect: PropTypes.array,
  }).isRequired,
  setScore: PropTypes.func.isRequired,
  level: PropTypes.string.isRequired,
};

export default GameStage;
