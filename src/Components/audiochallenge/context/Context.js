import "antd/dist/antd.css";
import React, { useState, useEffect, Component } from "react";
import { Tooltip, Space, Switch, Button, Typography, Checkbox } from "antd";

import Card from "../Card/Card";
import WordBtn from "../WordBtn/WordBtn";
import "./Context.css";

const Context = (props) => {
  const { isSound } = props;
  const [listWords, setWords] = useState([]);
  const [outputWord, setOutputWord] = useState([]);
  const [group, setGroup] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState();
  const [count, setCount] = useState(0);
  const [currentWord, setCurrentWord] = useState({});
  const [listUsedWord, setListUsedWord] = useState([
    { word: "", guessed: false },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}`
      )
        .then((response) => response.json())
        .then((result) => result)
        .catch((error) => error);

      shuffle(result);
      setWords(result);
      setCurrentWord(result[0]);

      console.log(result[0]);
    };
    fetchData();
  }, [search]);

  useEffect(() => {
    setOutputWord(shuffle(listWords.filter((e, i) => i < count + 5)));
    console.log(`currentWord=${currentWord.word}`);
    console.log(outputWord);
  }, [currentWord]);

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <div className="context">
      <Card currentWord={currentWord} isChosed={false} isSound={isSound}></Card>
      <WordBtn words={outputWord}> </WordBtn>
      <input
        type="text"
        value={page}
        onChange={(event) => setPage(event.target.value)}
      ></input>
      <Button onClick={() => setSearch(page)}>Search</Button>
    </div>
  );
};
export default Context;
