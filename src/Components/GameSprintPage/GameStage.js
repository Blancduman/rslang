import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'antd';
import { StarTwoTone } from '@ant-design/icons';
import ButtonGroup from 'antd/lib/button/button-group';
import { useKeyPress } from 'use-hooks/dist/commonjs/use-key-press';
import { loadWords } from '../../Services/WordsService';
import Loading from '../Loading';
import {createUniqueKey, getWordTranslateFromArrayWithChance, reproduceAudioBySource} from '../../utls';

const GameStage = ({ setGameParams, level }) => {
  const [game, setGame] = useState({
    score: 0,
    winSequence: [false, false, false, false],
    multiplier: 10,
  });
  const [words, setWords] = useState([]);
  const [word, setWord] = useState({});
  const [page, setPage] = useState(0);
  const [time, setTime] = useState(60);
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

  const handleAnswer = (code) => {
    const isMatch = wordTranslate === word.wordTranslate;
    let { winSequence } = game;
    let { multiplier } = game;
    let { score } = game;
    if (isMatch === code) {
      const index = winSequence.indexOf(false);
      if (index >= 0) {
        winSequence.splice(index, 1, true);
      } else {
        multiplier *= 2;
        winSequence = [false, false, false, false];
      }
      score += multiplier;
      setGame({
        ...game, winSequence, score, multiplier,
      });
      reproduceAudioBySource('../src/assets/audio/correct.mp3');
    } else {
      winSequence = [false, false, false, false];
      multiplier = 10;
      setGame({ ...game, winSequence, multiplier });
      reproduceAudioBySource('../src/assets/audio/error.mp3');
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

  const idTime = setTimeout(() => {
    if (time !== 0) {
      setTime(time - 1);
    }
  }, 1000);

  useEffect(() => {
    if (time === 0) {
      clearTimeout(idTime);
      setTimeout(() => setGameParams((prev) => ({ ...prev, stage: 'finished', score: game.score })), 1000);
    }
  }, [time]);

  useEffect(() => {
    const tempPage = page + 1;
    loadWords(tempPage, level)
      .then((res) => {
        setWords(res);
        passNextWord(res);
        setPage(tempPage);
      })
      .catch(() => setGameParams((prev) => ({ ...prev, stage: 'starting' })))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (words.length < 10) {
      const tempPage = page + 1;
      loadWords(tempPage, level)
        .then((res) => {
          setWords((prev) => prev.concat(res));
          setPage(tempPage);
        })
        .catch(() => setGameParams((prev) => ({ ...prev, stage: 'starting' })));
    }
  }, [words]);

  return (
    loading
      ? <Loading />
      : (
        <>
          <h4 className="game-sprint__label">{game.score}</h4>
          <Card>
            <Card.Grid className="game-sprint__card-layout">
              <div className="game-sprint__star-container">
                {
                                game.winSequence.map((value) => (value
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
                                  )))
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
  setGameParams: PropTypes.func.isRequired,
  level: PropTypes.string.isRequired,
};

export default GameStage;
