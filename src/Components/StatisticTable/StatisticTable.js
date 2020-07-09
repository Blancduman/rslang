import React from 'react';
import PropTypes from 'prop-types';
import StatisticItem from './StatisticItem';

export default function StatisticTable({ score }) {
  return (
    <div>
      <p>
        Ваш счёт:&nbsp;
        {score.total}
      </p>
      <p>
        Правильные ответы:&nbsp;
        {score.correct.length}
      </p>
      <StatisticItem words={score.correct} />
      <p>
        Неправильные ответы:&nbsp;
        {score.incorrect.length}
      </p>
      <StatisticItem words={score.incorrect} />
    </div>
  );
}

StatisticTable.propTypes = {
  score: PropTypes.shape({
    total: PropTypes.number,
    correct: PropTypes.arrayOf(PropTypes.shape({
      word: PropTypes.string,
      wordTranslate: PropTypes.string,
    })),
    incorrect: PropTypes.arrayOf(PropTypes.shape({
      word: PropTypes.string,
      wordTranslate: PropTypes.string,
    })),
  }).isRequired,
};
