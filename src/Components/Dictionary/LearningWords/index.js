import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import LearningCard from './LearningCard';
import WordRating from './WordRating';
import './learning-words.css';
import { handleAnswer } from '../../../Services/ankiService';

const LearningWords = (props) => {
  const { words, options } = props;

  const [answerInput, setAnswerInput] = useState('');
  const [oldAnswerInput, setOldAnswerInput] = useState('');
  const [showWordIndex, setShowWordIndex] = useState(0);
  const [maxShowWordIndex, setMaxShowWordIndex] = useState(0);
  const [isWordFinished, setIsWordFinished] = useState(false);
  const [isIncorrectAnswer, setIsIncorrectAnswer] = useState(false);

  const goNextWord = () => {
    if (showWordIndex < words.length - 1) {
      setShowWordIndex(showWordIndex + 1);
      setIsIncorrectAnswer(false);
    }
  };

  const goBackWord = () => {
    if (showWordIndex > 0) {
      setOldAnswerInput(answerInput);
      setShowWordIndex(showWordIndex - 1);
    }
  };

  const correctAnswer = async () => {
    await handleAnswer(words[showWordIndex]._id, !isIncorrectAnswer);
    if (showWordIndex === maxShowWordIndex) {
      if (maxShowWordIndex < options.maxWordsPerDay) {
        if (showWordIndex === maxShowWordIndex && maxShowWordIndex < words.length - 1) {
          setMaxShowWordIndex(maxShowWordIndex + 1);
        }
        setOldAnswerInput('');
        setAnswerInput('');
        setIsWordFinished(false);
      }
    }
  };

  const incorrectAnswer = () => {
    setIsIncorrectAnswer(true);
    handleAnswer(words[showWordIndex]._id, false);
  };

  useEffect(() => {
    if (isWordFinished) {
      if (maxShowWordIndex < options.maxWordsPerDay) {
        if (maxShowWordIndex < words.length) setMaxShowWordIndex(maxShowWordIndex + 1);
        setOldAnswerInput('');
        setAnswerInput('');
        setIsWordFinished(false);
      }
    }
  }, [isWordFinished]);

  useEffect(() => {
    if (showWordIndex < maxShowWordIndex) {
      setAnswerInput(words[showWordIndex].word);
    } else {
      setAnswerInput(oldAnswerInput);
    }
  }, [showWordIndex, maxShowWordIndex]);

  return (
    <div>
      <div className="learning-words">
        <LeftOutlined className={showWordIndex === 0 ? 'hidden' : ''} onClick={goBackWord} />
        <LearningCard
          displayText={words[showWordIndex] && words[showWordIndex].textExample}
          word={words[showWordIndex] && words[showWordIndex].word}
          displayTextTranslate={words[showWordIndex] && words[showWordIndex].textExampleTranslate}
          userAnsweredCorrect={correctAnswer}
          userAnsweredIncorrect={incorrectAnswer}
          isFinished={showWordIndex < maxShowWordIndex}
          displayDeleteWord={options.deleteWord}
          displayDifficultWord={options.difficult}
        />
        <RightOutlined className={showWordIndex === maxShowWordIndex ? 'hidden' : ''} onClick={goNextWord} />
      </div>
      <div className="learning-words__card_translate-word">
        <p>{words[showWordIndex] && words[showWordIndex].wordTranslate}</p>
        <WordRating
          onAgain={() => {}}
          onHard={() => { handleAnswer(words[showWordIndex]._id, false, 'hard'); }}
          onFine={() => { handleAnswer(words[showWordIndex]._id, false, 'normal'); }}
          onEasy={() => { handleAnswer(words[showWordIndex]._id, false, 'easy'); }}
          hide={showWordIndex === maxShowWordIndex - 1 && options.ratingWord}
          notAgain={maxShowWordIndex}
        />
      </div>
    </div>
  );
};

LearningWords.propTypes = {
  words: PropTypes.arrayOf(PropTypes.shape({
    audio: PropTypes.string.isRequired,
    audioExample: PropTypes.string.isRequired,
    audioMeaning: PropTypes.string.isRequired,
    group: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    textExample: PropTypes.string.isRequired,
    textExampleTranslate: PropTypes.string.isRequired,
    textMeaning: PropTypes.string.isRequired,
    textMeaningTranslate: PropTypes.string.isRequired,
    transcription: PropTypes.string.isRequired,
    word: PropTypes.string.isRequired,
    wordTranslate: PropTypes.string.isRequired,
    wordsPerExampleSentence: PropTypes.number.isRequired,
  })).isRequired,
  options: PropTypes.shape({
    wordsPerDay: PropTypes.number,
    maxWordsPerDay: PropTypes.number,
    translateWord: PropTypes.bool,
    transcriptionWord: PropTypes.bool,
    imageAssociation: PropTypes.bool,
    showAnswer: PropTypes.bool,
    deleteWord: PropTypes.bool,
    difficult: PropTypes.bool,
    ratingWord: PropTypes.bool,
    onlyNew: PropTypes.bool,
    wordExplaining: PropTypes.bool,
    sentenceExample: PropTypes.bool,
    cardSettings: PropTypes.array,
  }).isRequired,
};

export default LearningWords;
