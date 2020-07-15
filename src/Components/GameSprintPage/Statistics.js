import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, notification } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import StatisticTable from '../StatisticTable/StatisticTable';
import { getStatistic, updateStatistic } from '../../Services/statisticService';

const Statistics = ({ score, setStage, setScore }) => {
  const restartGame = () => {
    setScore({
      total: 0,
      correct: [],
      incorrect: [],
    });
    setStage('starting');
  };

  useEffect(() => {
    (async () => {
      try {
        const statistic = await getStatistic();
        delete statistic.id;
        const sprintStatistic = statistic.optional.sprint.results;
        sprintStatistic.push({ date: moment().format('DD.MM.YYYY'), score: score.total });
        updateStatistic(statistic);
      } catch (e) {
        notification.open({
          message: 'Статистика не была записана',
          description: 'Ошибка работы сервера',
        });
      }
    })();
  }, []);

  return (
    <Card>
      <Card.Grid className="game-sprint__card-layout">
        <h1>Игра окончена</h1>
        <StatisticTable score={score} />
        <ButtonGroup>
          <Button
            className="game-sprint__button"
            type="primary"
            onClick={restartGame}
          >
            Ещё раз
          </Button>
          <Link to="/">
            <Button
              className="game-sprint__button"
              type="primary"
            >
              Выйти
            </Button>
          </Link>
        </ButtonGroup>
      </Card.Grid>
    </Card>
  );
};

Statistics.propTypes = {
  score: PropTypes.shape({
    total: PropTypes.number,
    correct: PropTypes.array,
    incorrect: PropTypes.array,
  }).isRequired,
  setStage: PropTypes.func.isRequired,
  setScore: PropTypes.func.isRequired,
};

export default Statistics;
