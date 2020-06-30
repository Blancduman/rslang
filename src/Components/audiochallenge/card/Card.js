import "antd/dist/antd.css";
import React, { useState, useEffect } from "react";
import { Tooltip, Space, Switch, Button, Typography, Checkbox } from "antd";
import "./Card.css";
import backgroundPlaySound from "../../../assets/img/play_sound.png";
// import soundRight from "../../../assets/sound/right_answer.mp3";
// import soundWrong from "../../../assets/sound/wrong-answer.mp3";

const Card = (props) => {
  const { currentWord, isChosed, isSound } = props;
  const rsLangData =
    "https://raw.githubusercontent.com/kli2m/rslang-data/master";
  const srcAudio = `${rsLangData}/${currentWord.audio}`;
  const backgroundImage = `${rsLangData}/${currentWord.image}`;
  let styleRight =
    isChosed.isChosed && isChosed.isRight
      ? "card_image right"
      : "card_image wrong";

  const stylePlayVoice = {
    backgroundImage: `url(${backgroundPlaySound})`,
    backgroundSize: "context",
  };
  const styleViewPicture = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
  };

  const playVoice = (e) => {
    const audio = new Audio(e.target.dataset.url);
    audio.play();
  };

  const playAnswer = (e) => {
    const music = isChosed.isRight
      ? "../../../assets/sound/right_answer.mp3"
      : "../../../assets/sound/wrong-answer.mp3";
    const audio = new Audio(music);
    audio.play();
  };

  return isChosed.isChosed ? (
    <div className="card">
      <button
        className={styleRight}
        style={styleViewPicture}
        onClick={playVoice}
        data-url={srcAudio}
      ></button>
      <p>{currentWord.transcription}</p>
      <p>{currentWord.wordTranslate}</p>
    </div>
  ) : (
    <div className="card">
      <button
        className="card_speaker"
        style={stylePlayVoice}
        onClick={playVoice}
        onChange={playAnswer}
        data-url={srcAudio}
      >
        {isSound && <audio src={srcAudio} autoPlay></audio>}
      </button>
    </div>
  );
};
export default Card;
