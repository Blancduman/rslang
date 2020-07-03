import "antd/dist/antd.css";
import React from "react";
import {Typography, Button } from "antd";
import "./WordBtn.css";

const WordBtn = (props) => {
  const { Text } = Typography;

  var { words, isChosed, verificationWord } = props;

  const addWordBtn = (item) => {
    console.log(isChosed.word + " " + item.word);
    let classBtn =
      isChosed.isRight && isChosed.word === item.word
        ? "button_words right"
        : !isChosed.isRight && isChosed.word === item.word
        ? "button_words wrong"
        : "button_words";
    return (
      <Button
        disabled={isChosed.isChosed}
        className={classBtn}
        onClick={verificationWord}
        value={item.word}
        key={item.id}
      >
        <Text strong> {item.wordTranslate}</Text>
      </Button>
    );
  };

  return <div className="list_button_words">{words.map(addWordBtn)}</div>;
};

export default WordBtn;
