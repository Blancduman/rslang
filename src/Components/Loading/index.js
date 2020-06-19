import React from 'react';
import { Spin } from 'antd';
import './loading.css';

const Loading = () => (
  <div className="loading">
    <Spin size="large" />
  </div>
);

export default Loading;
