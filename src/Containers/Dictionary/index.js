import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import Loading from '../../Components/Loading';

const { TabPane } = Tabs;

const Dictionary = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Tabs
      defaultActiveKey="1"
      type="card"
      size="large"
    >
      <TabPane tab="Новый" key="1">
        <h1>Табчик с новыми словами</h1>
      </TabPane>
      <TabPane tab="Сложные" key="2">
        <h1>Табчик с сложными словами</h1>
      </TabPane>
      <TabPane tab="Удалённые" key="3">
        <h1>Табчик с удалёнными словами</h1>
      </TabPane>
    </Tabs>
  );
};

export default Dictionary;
