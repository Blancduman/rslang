import React from 'react';
import { Modal, Space } from 'antd';
import statistics from '../Statistics/Statistics';
import './ModalResult.css';

const ModalResult = (level, listUsedWord, nextLevel) => {
  const rightAnser = listUsedWord.filter((item) => item.guessed);
  const WrongAnser = listUsedWord.filter((item) => !item.guessed);

  return (
    <Space>
      {Modal.success({
        title: `Вы прошли уровень №${level.page}`,
        content: (
          <div className="audiochallenge__modal">
            <p className="audiochallenge__modal-title">Результаты ответов</p>
            <p className="audiochallenge__modal-right_answers-title">
              {`Правильно: ${rightAnser.length}`}
            </p>
            <ol>
              {rightAnser.map((item, index) => (
                <li
                  key={String(index)}
                  className="audiochallenge__modal-right_answers-list"
                >
                  <span className="audiochallenge__modal-right_answers-list-word">
                    {item.word}
                  </span>
                  <span> &#8212;</span>
                  <span className="audiochallenge__modal-right_answers-list-translate">
                    {item.translate}
                  </span>
                </li>
              ))}
            </ol>
            <p className="audiochallenge__modal-wrong_answers-title">
              {`Неправильно: ${WrongAnser.length}`}
            </p>
            <ol>
              {WrongAnser.map((item, index) => (
                <li
                  key={String(index)}
                  className="audiochallenge__modal-wrong_answers-list"
                >
                  <span className="audiochallenge__modal-wrong_answers-list-word">
                    {item.word}
                  </span>
                  <span> &#8212;</span>
                  <span className="audiochallenge__modal-wrong_answers-list-translate">
                    {item.translate}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        ),
        onOk() {
          statistics(listUsedWord, level);
          nextLevel();
        },
      })}
    </Space>
  );
};

export default ModalResult;
