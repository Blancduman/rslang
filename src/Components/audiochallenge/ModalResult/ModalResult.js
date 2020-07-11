import React from 'react';
import { Modal, Space } from 'antd';
import PropTypes from 'prop-types';
import './ModalResult.css';

const ModalResult = (level, listUsedWord, nextLevel) => (
  <Space>
    {Modal.success({
      title: `Вы прошли уровень №${level.page}`,
      content: (
        <div className="audiochallenge__modal">
          <p className="audiochallenge__modal-title">Результаты ответов</p>
          <p className="audiochallenge__modal-right_answers-title">
            Правильно:
          </p>
          <ol>
            {listUsedWord
              .filter((item) => item.guessed)
              .map((item, index) => (
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
            Неправильно:
          </p>
          <ol>
            {listUsedWord
              .filter((item) => !item.guessed)
              .map((item, index) => (
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
        nextLevel();
      },
    })}
  </Space>
);

ModalResult.propTypes = {
  level: PropTypes.shape({
    level: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
  }).isRequired,
};

export default ModalResult;
