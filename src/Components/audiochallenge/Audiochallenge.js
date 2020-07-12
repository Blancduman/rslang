import React, { useState } from 'react';
import {
  Tooltip, Switch, Button, Typography,
  Form,
} from 'antd';
import Context from './Context/Context';
import LevelDropdown from '../LevelDropdown/LevelDropdown';
import './Audiochallenge.css';

const Audiochallenge = () => {
  const [isStarted, setStart] = useState(false);
  const [isSound, setIsSound] = useState(true);
  const [group, setGroup] = useState('0');
  const { Text, Title } = Typography;

  const startGame = () => {
    setStart(true);
  };

  const onChangeIsSound = () => {
    setIsSound((prev) => !prev);
  };

  return (
    <div className="audiochallenge__wrapper">
      <header className="audiochallenge__header">
        <div className="audiochallenge__autoplay_box">
          <Tooltip
            placement="bottom"
            title="Click to on/off autoplay sound"
            color="magenta"
          >
            <Switch
              onChange={onChangeIsSound}
              checkedChildren="ON"
              unCheckedChildren="OFF"
              checked={isSound}
            />
          </Tooltip>
        </div>

      </header>

      <main className="audiochallenge__main">
        {isStarted ? (
          <Context isSound={isSound} selectedGroup={group} />
        ) : (
          <div className="audiochallenge__start_game">
            <Title level={1} className="audiochallenge__start_game-title">
              <Text strong> АУДИОВЫЗОВ</Text>
            </Title>
            <Title level={4} className="audiochallenge__start_game-description">
              <Text strong>
                Тренировка улучшает восприятие английской речи на слух.
              </Text>
            </Title>
            <div className="audiochallenge__main-select_level">
              <Form>
                <LevelDropdown setLevel={setGroup} />
              </Form>
            </div>
            <Button
              className="audiochallenge__start_game-btn"
              onClick={startGame}
              autoFocus
            >
              СТАРТ
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Audiochallenge;
