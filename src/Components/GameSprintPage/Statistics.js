import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { Link } from 'react-router-dom';
import StatisticTable from '../StatisticTable/StatisticTable';

const Statistics = ({ score, setStage, setScore }) => {
  const restartGame = () => {
    setScore(0);
    setStage('starting');
  };
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
