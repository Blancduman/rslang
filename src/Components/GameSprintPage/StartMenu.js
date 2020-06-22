import React from 'react';
import { Button, Card, Form } from 'antd';
import PropTypes from 'prop-types';
import LevelDropdown from '../LevelDropdown/LevelDropdown';

const StartMenu = ({ setStage, setLevel }) => {
  const startGame = () => {
    setStage('started');
  };

  return (
    <Card>
      <Card.Grid className="game-sprint__card-layout">
        <h1>Мини-игра &quot;Sprint&quot;</h1>
        <Form>
          <LevelDropdown setLevel={setLevel} />
        </Form>
        <Button type="primary" onClick={startGame}>
          Старт
        </Button>
      </Card.Grid>
    </Card>
  );
};

StartMenu.propTypes = {
  setStage: PropTypes.func.isRequired,
  setLevel: PropTypes.func.isRequired,
};

export default StartMenu;
