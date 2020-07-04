import 'antd/dist/antd.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Tooltip, Switch, Button, Typography,
} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './Audiochallenge.css';
import Context from './Context/Context';

const Audiochallenge = () => {
  const [isStarted, setStart] = useState(false);
  const [isSound, setIsSound] = useState(true);
  const { Text, Title } = Typography;

  const startGame = () => {
    setStart(true);
  };

  const onChangeIsSound = () => {
    if (isSound) setIsSound(false);
    else setIsSound(true);
  };

  return (
    <div className="wrapper">
      <header className="audiochallenge_header">
        <div className="autoplay_box">
          <Tooltip
            placement="bottom"
            title="Click to on/off autoplay sound"
            color="magenta"
          >
            {' '}
            <Switch
              onChange={onChangeIsSound}
              checkedChildren="ON"
              unCheckedChildren="OFF"
              checked={isSound}
            />
            {' '}
          </Tooltip>
        </div>
        <div className="close_btn">
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

      <main className="audiochallenge_main">
        {isStarted ? (
          <Context isSound={isSound} />
        ) : (
          <div className="start_game">
            <Title level={1}>
              <Text strong> АУДИОВЫЗОВ</Text>
            </Title>
            <Title level={4}>
              <Text strong>
                {' '}
                Тренировка улучшает восприятие английской речи на слух.
              </Text>
            </Title>
            <Button className="start_game-btn" onClick={startGame}>
              СТАРТ
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Audiochallenge;
