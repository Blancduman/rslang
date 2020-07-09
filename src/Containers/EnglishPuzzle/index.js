import React, { useState, useEffect } from 'react';
import { Button, Layout } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { getWordsSpeakit } from '../../Services/getWordsSpeakit';
import getRows from '../../utls/EnglishSpeakit';
import Header from '../../Components/EnglishPuzzle/Header';
import Puzzle from '../../Components/EnglishPuzzle/Puzzle';
import Buttons from '../../Components/EnglishPuzzle/Buttons';

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

  useEffect(() => {
    getWordsSpeakit(level.group, level.page).then((value) => {
      const string = value[0].textExample.replace(/(<(\/?[^>]+)>)/g, '');
      const items = string.split(' ').sort(() => Math.random() - 0.5);
      const initialWords = items.map((item) => ({ id: uuidv4(), content: item }));
      const game = getRows(initialWords);
      setSentence(string);
      setRows(game);
      setResult(value);
    });
  }, [level.group, level.page]);

  useEffect(() => {
    if (checkBtns === 'noAnswer') {
      const items = [];
      switchData(items);
    }
    if (checkBtns === 'secondSentence') {
      const string = result[count].textExample.replace(/(<(\/?[^>]+)>)/g, '');
      const items = string.split(' ').sort(() => Math.random() - 0.5);
      setSentence(string);
      switchData(items);
    }
    if (checkBtns === 'repeat') {
      const string = result[0].textExample.replace(/(<(\/?[^>]+)>)/g, '');
      const items = string.split(' ').sort(() => Math.random() - 0.5);
      setSentence(string);
      switchData(items);
    }
  }, [checkBtns]);

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
                onClick={() => { setStage('game'); }}
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
