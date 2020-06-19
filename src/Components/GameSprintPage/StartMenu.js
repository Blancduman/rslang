import React from 'react';
import {
  Button, Card, Form, Select,
} from 'antd';
import PropTypes from 'prop-types';

const StartMenu = ({ setGameParams }) => {
  const startGame = () => {
    setGameParams((prev) => ({ ...prev, stage: 'started' }));
  };

  const changeLevel = (value) => {
    setGameParams((prev) => ({ ...prev, level: value }));
  };

  return (
    <Card>
      <Card.Grid className="game-sprint__card-layout">
        <h1>Мини-игра &quot;Sprint&quot;</h1>
        <Form>
          <Form.Item label="Уровень сложности">
            <Select
              defaultValue="0"
              className="game-sprint__select-level"
              onChange={(value) => changeLevel(value)}
            >
              <Select.Option value="0">Первый</Select.Option>
              <Select.Option value="1">Второй</Select.Option>
              <Select.Option value="2">Третий</Select.Option>
              <Select.Option value="3">Четвёртый</Select.Option>
              <Select.Option value="4">Пятый</Select.Option>
              <Select.Option value="5">Шестой</Select.Option>
            </Select>
          </Form.Item>
        </Form>
        <Button type="primary" onClick={startGame}>
          Старт
        </Button>
      </Card.Grid>
    </Card>
  );
};

StartMenu.propTypes = {
  setGameParams: PropTypes.func.isRequired,
};

export default StartMenu;
