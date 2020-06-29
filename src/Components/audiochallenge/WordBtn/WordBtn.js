import "antd/dist/antd.css";
import React, { useState, useEffect, Component } from "react";
import { Tooltip, Space, Switch, Typography, Checkbox, Button } from "antd";
import "./WordBtn.css";

const WordBtn = (props) => {
  var { words, verificationWord } = props;

  const addWordBtn = (item) => {
    return (
      <Button
        className="button_words"
        onClick={verificationWord}
        value={item.word}
        key={item.id}
      >
        {item.word}
      </Button>
    );
  };

  return <div className="list_button_words">{words.map(addWordBtn)}</div>;
};

export default WordBtn;
