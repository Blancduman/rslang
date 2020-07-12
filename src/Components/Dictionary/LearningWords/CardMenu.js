import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown } from 'antd';
import { MoreOutlined, MehOutlined, CloseCircleOutlined } from '@ant-design/icons';

const CardMenu = (props) => {
  const { addToComplicate, addToDeleted } = props;

  const renderMenu = () => (
    <Menu>
      <Menu.Item onClick={addToComplicate}>
        <MehOutlined />
        {' '}
        Добавить слово в сложные
      </Menu.Item>
      <Menu.Item onClick={addToDeleted}>
        <CloseCircleOutlined />
        {' '}
        Добавить слово в удалённые
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown className="cursor-pointer" overlay={renderMenu()}>
      <MoreOutlined />
    </Dropdown>
  );
};

CardMenu.propTypes = {
  addToComplicate: PropTypes.func.isRequired,
  addToDeleted: PropTypes.func.isRequired,
};

export default CardMenu;
