import React from 'react';
import { Button } from 'antd';
import { ForwardOutlined, AudioOutlined, FundProjectionScreenOutlined } from '@ant-design/icons';

const Control = () => (
  <div className="speakit__control">
    <Button type="primary" icon={<ForwardOutlined />} shape="round" className="speakit__control_button">
      Начать сначала
    </Button>
    <Button type="primary" icon={<AudioOutlined />} shape="round" className="speakit__control_button speakit__speak">
      Старт игры
    </Button>
    <Button type="primary" icon={<FundProjectionScreenOutlined />} shape="round" className="speakit__control_button">
      Результат
    </Button>
  </div>
);

export default Control;
