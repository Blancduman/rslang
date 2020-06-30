import "antd/dist/antd.css";
import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import WordBtn from "../WordBtn/WordBtn";
import "./Context.css";
import { Button } from "antd";

const Context = (props) => {
  const { isSound } = props;
  const [isChosed, setIsChosed] = useState({ isChosed: false, isRight: false });
  const [listWords, setWords] = useState([]);
  const [outputWord, setOutputWord] = useState([]);
  const [level, setLevel] = useState({ group: 1, page: 1 });
  const [count, setCount] = useState(0);
  const [currentWord, setCurrentWord] = useState({});
  const [listUsedWord, setListUsedWord] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://afternoon-falls-25894.herokuapp.com/words?group=${level.group}&page=${level.page}`
      )
        .then((response) => response.json())
        .then((result) => result)
        .catch((error) => error);

      shuffle(result);
      setWords(result);
      setCurrentWord(result[0]);
    };
    fetchData();
  }, [level]);

  useEffect(() => {
    setOutputWord(
      shuffle(
        shuffle(listWords.filter((e, i) => e.word !== currentWord.word))
          .filter((e, i) => i < 4)
          .concat(currentWord)
      )
    );
  }, [currentWord]);

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    console.log(listUsedWord);
  }, [listUsedWord]);

  const verificationWord = (event) => {
    currentWord.word === event.currentTarget.value
      ? statistic(true)
      : statistic(false);
  };

  const statistic = (result) => {
    setIsChosed({ isChosed: true, isRight: result });
    setListUsedWord(
      listUsedWord.concat({ word: currentWord.word, guessed: result })
    );
  };

  const nextWord = () => {
    setCount(count + 1);
    setIsChosed({ isChosed: false, isRight: false });
    setCurrentWord(listWords[count + 1]);
    if (count > 20) {
      setCount(1);
      setLevel({ group: 1, page: level.page + 1 });
    }
  };

  return (
    <div className="context">
      <Card
        currentWord={currentWord}
        isChosed={isChosed}
        isSound={isSound}
      ></Card>
      <WordBtn
        words={outputWord}
        isChosed={isChosed}
        verificationWord={verificationWord}
      >
        {" "}
      </WordBtn>
      <div>
        {isChosed.isChosed && <Button onClick={nextWord}>Дальше</Button>}
      </div>
    </div>
  );
};
export default Context;
