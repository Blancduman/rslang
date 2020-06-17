import React from 'react';
import { Tabs, Progress } from 'antd';
import 'antd/dist/antd.css';

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

  return (
    <div>
      <Tabs defaultActiveKey="1" type="card" size="large">
        <TabPane tab="Новые" key="1">
          <h1>{ newWordsPerDay }</h1>
        </TabPane>
        <TabPane tab="Сложные" key="2">
          <h1>{ maxWordsPerDay }</h1>
        </TabPane>
        <TabPane tab="Удалённые" key="3">
          <h1>{ showAnswer.toString() }</h1>
        </TabPane>
      </Tabs>
      <Progress percent={calculate(a, t)} showInfo={false} />
    </div>
  );
};

export default Dictionary;
