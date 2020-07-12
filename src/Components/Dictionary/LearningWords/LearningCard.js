import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, Typography, Divider, Progress, Button,
} from 'antd';
import { SoundOutlined } from '@ant-design/icons';
import AnswerInputField from './AnswerInputField';
import CardMenu from './CardMenu';

const makeSpeaker = () => {
  if ('speechSynthesis' in window) {
    const synth = window.speechSynthesis;

    return (text) => {
      const voice = synth.getVoices()[5];
      const speech = new SpeechSynthesisUtterance(text);
      speech.pitch = 1;
      speech.rate = 1;
      speech.volume = 1;
      speech.voice = voice;
      speech.lang = voice.lang;

      speechSynthesis.speak(speech);
    };
  }
  return null;
};

const speak = makeSpeaker();

const LearningCard = (props) => {
  const {
    displayText,
    word,
    displayTextTranslate,
    userAnsweredCorrect,
    userAnsweredIncorrect,
    isFinished,
  } = props;

  const makeANoise = (text) => {
    speak(text);
  };

  const renderCard = () => {
    const words = displayText.replace(/<b>(\w|\W)*<\/b>/g, '[...] ').split(' ');

    return words.map((w) => {
      if (w.includes('[...]')) {
        return (
          <AnswerInputField
            word={word}
            key={w}
            userAnsweredCorrect={() => {
              userAnsweredCorrect();
              makeANoise(displayText.replace(/<b>(\w|\W)*<\/b>/g, word));
            }}
            userAnsweredIncorrect={userAnsweredIncorrect}
            isFinished={isFinished}
          />
        );
      }

      return (
        <Typography.Text
          className="learning-words__card_word"
          key={w}
          onClick={() => makeANoise(w)}
        >
          {w}
        </Typography.Text>
      );
    });
  };

  return (
    <Card
      className="learning-words__card"
      title={(
        <Button>
          <Progress percent={50} steps={5} strokeColor="#52c41a" />
        </Button>
      )}
      extra={(
        <CardMenu
          addToComplicate={() => {}}
          addToDeleted={() => {}}
        />
      )}
      actions={[
        <SoundOutlined onClick={() => makeANoise(word)} />,
      ]}
    >
      <Typography.Text className="learning-words__card_context">
        {renderCard()}
      </Typography.Text>
      <Divider />
      <Typography.Text>{displayTextTranslate}</Typography.Text>
    </Card>
  );
};

LearningCard.propTypes = {
  displayText: PropTypes.string.isRequired,
  word: PropTypes.string.isRequired,
  displayTextTranslate: PropTypes.string.isRequired,
  userAnsweredCorrect: PropTypes.func.isRequired,
  userAnsweredIncorrect: PropTypes.func.isRequired,
  isFinished: PropTypes.bool.isRequired,
};

export default LearningCard;
