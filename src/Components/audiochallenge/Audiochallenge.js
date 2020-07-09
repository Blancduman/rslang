import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Tooltip, Switch, Button, Typography,
} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Context from './Context/Context';
import './Audiochallenge.css';

const Audiochallenge = () => {
  const [isStarted, setStart] = useState(false);
  const [isSound, setIsSound] = useState(true);
  const { Text, Title } = Typography;

  const startGame = () => {
    setStart(true);
  };

  const onChangeIsSound = () => {
    setIsSound((prev) => !prev);
  };

  return (
    <div className="wrapper">
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
        <div className="audiochallenge__close_btn">
          <Tooltip
            placement="bottom"
            title="Click to main page"
            color="magenta"
          >
            <Link to="/" replace>
              <Button type="primary" icon={<CloseOutlined />} />
            </Link>
          </Tooltip>
        </div>
      </header>

      <main className="audiochallenge__main">
        {isStarted ? (
          <Context isSound={isSound} />
        ) : (
          <div className="audiochallenge__start_game">
            <Title level={1}>
              <Text strong> АУДИОВЫЗОВ</Text>
            </Title>
            <Title level={4}>
              <Text strong>
                Тренировка улучшает восприятие английской речи на слух.
              </Text>
            </Title>
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
