import React, { useState, useEffect, useCallback } from 'react';
import { Button, Layout } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { getWordsSpeakit } from '../../Services/getWordsSpeakit';
import getRows from '../../utls/EnglishPuzzle';
import Header from '../../Components/EnglishPuzzle/Header';
import Puzzle from '../../Components/EnglishPuzzle/Puzzle';
import Buttons from '../../Components/EnglishPuzzle/Buttons';
import Options from '../../Components/EnglishPuzzle/Options';
import Sound from '../../utls/Speakit/Sound/Sound';
import { updateStatistics } from '../../Services/statistics';
import { gameDate } from '../../utls';

const levels = {
  0: 'Первый',
  1: 'Второй',
  2: 'Третий',
  3: 'Четвертый',
  4: 'Пятый',
  5: 'Шестой',
};

const EnglishPuzzle = () => {
  const [stage, setStage] = useState('start');
  const [level, selLevel] = useState({ group: 0, page: 0 });
  const [result, setResult] = useState([]);
  const [count, setCount] = useState(0);
  const [noAnswer, setNoAnswer] = useState(true);
  const [second, setSecond] = useState(false);
  const [check, setCheck] = useState(false);
  const [statistics, setStatistics] = useState(false);
  const [compare, setCompare] = useState({ true: [], false: [] });
  const [rows, setRows] = useState(getRows(''));
  const [trueAnswer, setTrueAnswer] = useState([]);
  const [checkBtns, setCheckBtns] = useState('');
  const [sentence, setSentence] = useState('');
  const [listCorrect, setListCorrect] = useState(new Set());
  const [listError, setListError] = useState(new Set());
  const [selectGroup, setSelectGroup] = useState(0);
  const [autoPronunciation, setAutoPronunciation] = useState(true);
  const [autoTranslate, setAutoTranslate] = useState(true);
  const [translate, setTranslate] = useState('');
  const [right, setRight] = useState(false);

  const englishPuzzleStatistic = useCallback(({ gamesCount = 0, dates = '[]' }) => {
    const datesArr = JSON.parse(dates);
    datesArr.push({
      date: gameDate(),
      'Правильные ответы': listCorrect.size,
    });
    if (datesArr.length > 10) datesArr.shift();
    return {
      gamesCount: gamesCount + 1,
      dates: JSON.stringify(datesArr),
    };
  }, [listCorrect])

  useEffect(() => {
  if (count === 9) {
    updateStatistics('englishpuzzle', englishPuzzleStatistic);
  }
  }, [count, englishPuzzleStatistic]);

  useEffect(() => {
    getWordsSpeakit(level.group, level.page).then((value) => {
      const string = value[0].textExample.replace(/(<(\/?[^>]+)>)/g, '');
      const russianTranslate = value[0].textExampleTranslate.replace(/(<(\/?[^>]+)>)/g, '');
      const items = string.split(' ').sort(() => Math.random() - 0.5);
      const initialWords = items.map((item) => ({ id: uuidv4(), content: item }));
      const game = getRows(initialWords);
      setSentence(string);
      setTranslate(russianTranslate);
      setRows(game);
      setResult(value);
    });
  }, [level.group, level.page]);

  useEffect(() => {
    const switchData = (value) => {
      const initialWords = value.map((item) => ({ id: uuidv4(), content: item }));
      const game = getRows(initialWords);
      setRows(game);
      for (let i = 0; i < count; i += 1) {
        const test = result[i].textExample.replace(/(<(\/?[^>]+)>)/g, '').split(' ');
        const initialWordsTest = test.map((item) => ({ id: uuidv4(), content: item }));
        game[i + 1].items = initialWordsTest;
      }
    };
    if (checkBtns === 'noAnswer') {
      const items = [];
      switchData(items);
    }
    if (checkBtns === 'secondSentence') {
      const string = result[count].textExample.replace(/(<(\/?[^>]+)>)/g, '');
      const russianTranslate = result[count].textExampleTranslate.replace(/(<(\/?[^>]+)>)/g, '');
      const items = string.split(' ').sort(() => Math.random() - 0.5);
      setSentence(string);
      setTranslate(russianTranslate);
      if (autoPronunciation) {
        Sound(string);
      }
      switchData(items);
    }
    if (checkBtns === 'repeat') {
      const string = result[0].textExample.replace(/(<(\/?[^>]+)>)/g, '');
      const russianTranslate = result[0].textExampleTranslate.replace(/(<(\/?[^>]+)>)/g, '');
      const items = string.split(' ').sort(() => Math.random() - 0.5);
      setSentence(string);
      setTranslate(russianTranslate);
      if (autoPronunciation) {
        Sound(string);
      }
      switchData(items);
    }
  }, [checkBtns, autoPronunciation, count, result]);

  const showActualPage = () => {
    switch (stage) {
      case 'start': {
        return (
          <Layout className="english-puzzle__start-screen">
            <h1 className="english-puzzle__title">Мини-игра &quot;Головоломка&quot;</h1>
            <div className="english-puzzle__start-screen_content">
              <Header
                className="speakit__start-screen_level"
                switchLevel={selLevel}
                returnGroup={setSelectGroup}
              />
              <Button
                type="primary"
                onClick={() => {
                  setStage('game');
                  if (autoPronunciation) {
                    Sound(sentence);
                  }
                }}
              >
                Старт
              </Button>
            </div>
          </Layout>
        );
      }

      case 'completed': {
        return (
          <Layout className="speakit__completed">
            <h1 className="speakit__title">{`Поздравляем! ${levels[selectGroup]} уровень пройден!`}</h1>
            <Button
              type="primary"
              onClick={() => {
                setStage('starting');
              }}
            >
              Вернуться в главное меню
            </Button>
          </Layout>
        );
      }

      default: {
        return (
          <main
            className="english-puzzle__wrapper"
          >
            <Options
              sentence={sentence}
              setAutoPronunciation={setAutoPronunciation}
              autoPronunciation={autoPronunciation}
              autoTranslate={autoTranslate}
              setAutoTranslate={setAutoTranslate}
              translate={translate}
            />
            <Puzzle
              data={result}
              numberSentence={count}
              switchNoAnswer={setNoAnswer}
              switchCheck={setCheck}
              compareWords={setCompare}
              rows={rows}
              setRows={setRows}
              trueAnswer={trueAnswer}
              checkBtns={checkBtns}
              sentence={sentence}
              right={right}
            />
            <Buttons
              changeSentence={setCount}
              numberSentence={count}
              noAnswer={noAnswer}
              check={check}
              showCompare={compare}
              rows={rows}
              switchLevel={selLevel}
              currentLevel={level}
              addTrueAnswer={setTrueAnswer}
              showNoAnswer={setNoAnswer}
              second={second}
              showSecond={setSecond}
              showCheck={setCheck}
              setCheckBtns={setCheckBtns}
              showStatistics={setStatistics}
              statistics={statistics}
              sentence={sentence}
              addListCorrect={setListCorrect}
              showListCorrect={listCorrect}
              addListError={setListError}
              showListError={listError}
              numberGroup={selectGroup}
              nextStage={setStage}
              setRight={setRight}
            />
          </main>
        );
      }
    }
  };

  return (
    <div>
      {showActualPage()}
    </div>
  );
};

export default EnglishPuzzle;
