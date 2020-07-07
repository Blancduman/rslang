import React, { useState, useEffect } from 'react';
import { Button, Layout } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { getWordsSpeakit } from '../../Services/getWordsSpeakit';
import getRows from '../../utls/EnglishSpeakit';
import Header from '../../Components/EnglishPuzzle/Header';
import Puzzle from '../../Components/EnglishPuzzle/Puzzle';
import Buttons from '../../Components/EnglishPuzzle/Buttons';

const EnglishPuzzle = () => {
  const [stage, setStage] = useState('start');
  const [level, selLevel] = useState({ group: 0, page: 0 });
  const [result, setResult] = useState([]);
  const [count, setCount] = useState(0);
  const [words, setWords] = useState({});
  const [noAnswer, setNoAnswer] = useState('true');
  const [check, setCheck] = useState('false');
  const [compare, setCompare] = useState({ true: [], false: [] });
  const [rows, setRows] = useState(getRows(''));

  useEffect(() => {
    getWordsSpeakit(level.group, level.page).then((value) => {
      const items = value[0].textExample.replace(/(<(\/?[^>]+)>)/g, '').split(' ').sort(() => Math.random() - 0.5);
      const initialWords = items.map((item) => ({ id: uuidv4(), content: item }));
      const game = getRows(initialWords);
      setWords(items);
      setRows(game);
      setResult(value);
    });
  }, [level.group, level.page]);

  useEffect(() => {
    if (count > 0) {
      const items = result[count].textExample.replace(/(<(\/?[^>]+)>)/g, '').split(' ').sort(() => Math.random() - 0.5);
      const initialWords = items.map((item) => ({ id: uuidv4(), content: item }));
      const game = getRows(initialWords);
      setRows(game);
      setWords(items);
    }
  }, [count]);

  const showActualPage = () => {
    switch (stage) {
      case 'start': {
        return (
          <Layout className="english-puzzle__start-screen">
            <h1 className="english-puzzle__title">Мини-игра &quot;Головоломка&quot;</h1>
            <div className="english-puzzle__start-screen_content">
              <Header
                className="speakit__start-screen_level"
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

      default: {
        return (
          <main
            className="english-puzzle__wrapper"
          >
            <Puzzle
              data={result}
              numberSentence={count}
              words={words}
              switchNoAnswer={setNoAnswer}
              switchCheck={setCheck}
              compareWords={setCompare}
              rows={rows}
              setRows={setRows}
            />
            <Buttons
              changeSentence={setCount}
              numberSentence={count}
              noAnswer={noAnswer}
              check={check}
              words={words}
              showCompare={compare}
              rows={rows}
              setRows={setRows}
              switchLevel={selLevel}
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
