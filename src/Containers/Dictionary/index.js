import React, { useEffect, useState } from 'react';
import { Tabs, Spin } from 'antd';
import NewWords from '../../Components/Dictionary_NewWords';
import ProgressLine from '../../Components/Dictionary_ProgressLine';
import 'antd/dist/antd.css';
import './dictionary.css';

const { TabPane } = Tabs;
const calculate = (amount, total) => ((amount / total) * 100);
const a = 3;
const t = 50;
const developmentProps = {
  newWordsPerDay: 20,
  maxWordsPerDay: 30,
  dictionaryOptions: {
    translateWord: true,
    transcriptionWord: true,
    imageAssociation: true,
  },
  showAnswer: true,
  deleteWord: true,
  difficult: true,
  ratingWord: true,
  onlyNew: false,
};

const Dictionary = () => {
  const { newWordsPerDay, maxWordsPerDay, showAnswer } = developmentProps;
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState([]);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const getWords = async (group, page) => {
      try {
        setLoading(true);
        const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}`);
        const result = await response.json();

        setWords(result);
        setErrors(null);
      } catch (e) {
        setErrors(e);
      }
    };
    getWords(1, 1);
  }, []);

  useEffect(() => {
    if (words.length) {
      console.log(words);
    }
    if (errors) {
      console.log(errors);
    }
    setLoading(false);
  }, [words, errors]);

  if (loading) {
    return (
      <div className="loading">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <Tabs defaultActiveKey="1" type="card" size="large">
        <TabPane tab="Новые" key="1">
          <NewWords someValue={newWordsPerDay} />
        </TabPane>
        <TabPane tab="Сложные" key="2">
          <h1>{ maxWordsPerDay }</h1>
        </TabPane>
        <TabPane tab="Удалённые" key="3">
          <h1>{ showAnswer.toString() }</h1>
        </TabPane>
      </Tabs>
      <ProgressLine percentage={calculate(a, t)} done={a} total={t} />
    </div>
  );
};

export default Dictionary;
