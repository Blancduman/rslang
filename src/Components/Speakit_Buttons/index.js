import React from 'react';
import { Button } from 'antd';
import { ForwardOutlined, AudioOutlined, FundProjectionScreenOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const Control = () => (
  <div className="speakit__control">
    <Button type="primary" icon={<ForwardOutlined />} shape="round" className="speakit__control_button">
      Restart
    </Button>
    <Button type="primary" icon={<AudioOutlined />} shape="round" className="speakit__control_button speakit__speak">
      Speak
    </Button>
    <Button type="primary" icon={<FundProjectionScreenOutlined />} shape="round" className="speakit__control_button">
      Result
    </Button>
  </div>
);

export default Control;
