import React from 'react';
import { Form, Select } from 'antd';

const Header = () => (
  <Form className="english-puzzle__header">
    <Form.Item label="Уровень сложности">
      <Select
        defaultValue="Первый"
        className="english-puzzle__level-dropdown"
      >
        <Select.Option value="0,1">Первый</Select.Option>
        <Select.Option value="1,0">Второй</Select.Option>
        <Select.Option value="2,0">Третий</Select.Option>
        <Select.Option value="3,0">Четвертый</Select.Option>
        <Select.Option value="4,0">Пятый</Select.Option>
        <Select.Option value="5,0">Шестой</Select.Option>
      </Select>
    </Form.Item>
  </Form>
);

export default Header;
