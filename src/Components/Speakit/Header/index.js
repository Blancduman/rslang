import React, { useState, useEffect } from 'react';
import { Form, Select } from 'antd';
import PropTypes from 'prop-types';

const Header = ({ switchGame }) => {
  const [groupNumber, setGroup] = useState(Number);
  const [pageNumber, setPage] = useState(Number);

  useEffect(() => {
    switchGame({ group: groupNumber, page: pageNumber })
  }, [groupNumber, pageNumber]);

  return (
    <Form className="speakit__header">
      <Form.Item label="Уровень английского языка" className="speakit__header_level">
        <Select
          defaultValue="0"
          className="level-dropdown"
          size="large"
          onChange={(value) => setGroup(parseInt(value, 10))}
        >
          <Select.Option value="0">Начальный уровень </Select.Option>
          <Select.Option value="1">Элементарный уровень</Select.Option>
          <Select.Option value="2">Ниже среднего</Select.Option>
          <Select.Option value="3">Средний </Select.Option>
          <Select.Option value="4">Выше среднего</Select.Option>
          <Select.Option value="5">Продвинутый </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Уровень сложности" className="speakit__header_level">
        <Select
          defaultValue="0"
          className="level-dropdown"
          onChange={(value) => setPage(parseInt(value, 10))}
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
  );
};

Header.prototype = {
  switchGame: PropTypes.func.isRequired,
};

export default Header;