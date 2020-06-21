import React from 'react';
import {
  PageHeader, Button,
} from 'antd';

const HeaderPage = () => (
  <PageHeader
    extra={[
      <Button key="1" type="primary">
        Войти
      </Button>,
    ]}
  />
);

export default HeaderPage;
