import React, { useEffect, useState } from 'react';
import { Button, Card } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { StarTwoTone } from '@ant-design/icons';
import { useKeyPress } from 'use-hooks/dist/commonjs/use-key-press';

const GameSprintPage = () => {
  const [game, setGame] = useState({
    score: 0,
    winSequence: [false, false, false, false],
    multiplier: 10,
  });

  const [words, setWords] = useState([]);

  const [word, setWord] = useState({});
  const [page, setPage] = useState(0);
  const [time, setTime] = useState(60);
  const rightArrowPressed = useKeyPress('ArrowRight', true);
  const leftArrowPressed = useKeyPress('ArrowLeft', true);

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
      console.log('Время вышло, ваш результат:', game.score);
    }
  }, [time]);

  const [wordTranslate, setWordTranslate] = useState('');

  const getWordTranslate = (word, words) => {
    const chance = Math.floor(Math.random() - 0.3);
    if (chance >= 0) {
      return word.wordTranslate;
    }
    const rn = Math.random();
    const random = Math.floor(rn * words.length);
    // To avoid duplications
    const transcript = words[random].wordTranslate;
    words.splice(random, 1);
    return transcript;
  };

  useEffect(() => {
    const tempPage = page + 1;
    loadWords(tempPage).then((res) => {
      setWords(res);
      passNextWord(res);
      setPage(tempPage);
    });
  }, []);

  useEffect(() => {
    if (words.length < 10) {
      const tempPage = page + 1;
      loadWords(tempPage).then((res) => {
        setWords((prev) => prev.concat(res));
        setPage(tempPage);
      });
    }
  }, [words]);

  const passNextWord = (words) => {
    if (words.length > 0) {
      const word = words.shift();
      setWord(word);
      const wordTranslate = getWordTranslate(word, words);
      setWordTranslate(wordTranslate);
      setWords([...words]);
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
    } else {
      winSequence = [false, false, false, false];
      multiplier = 10;
      setGame({ ...game, winSequence, multiplier });
    }
    passNextWord(words);
  };

  const getRandomPage = () => Math.random() * 30;

  const loadWords = async (page) => {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${getRandomPage()}&group=0`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return await rawResponse.json();
  };

  return (
    <>
      <div className="game-sprint__container">
        <label className="game-sprint__label">{game.score}</label>
        <Card>
          <Card.Grid className="game-sprint__card-layout">
            <div className="game-sprint__star-container">
              {
                                game.winSequence.map((value, index) => (value
                                  ? (
                                    <StarTwoTone
                                      key={index}
                                      twoToneColor="#006400"
                                      className="game-sprint__star-icon"
                                    />
                                  )
                                  : (
                                    <StarTwoTone
                                      key={index}
                                      className="game-sprint__star-icon"
                                    />
                                  )))
                            }
            </div>
            <label className="game-sprint__label">{time}</label>
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
      </div>
    </>
  );
};

export default GameSprintPage;
