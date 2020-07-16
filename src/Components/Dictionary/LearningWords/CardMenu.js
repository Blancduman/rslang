import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown } from 'antd';
import { MoreOutlined, MehOutlined, CloseCircleOutlined } from '@ant-design/icons';

const CardMenu = (props) => {
  const {
    addToComplicate, addToDeleted, deleteWord, difficultWord,
  } = props;

  useEffect(() => {
    console.log(deleteWord || difficultWord);
  }, [deleteWord, difficultWord]);

  const renderMenu = () => (
    <Menu>
      {
        difficultWord && (
        <Menu.Item onClick={addToComplicate}>
          <MehOutlined />
          {' '}
          Добавить слово в сложные
        </Menu.Item>
        )
      }
      {
        deleteWord && (
        <Menu.Item onClick={addToDeleted}>
          <CloseCircleOutlined />
          {' '}
          Добавить слово в удалённые
        </Menu.Item>
        )
      }
    </Menu>
  );

  return (
    <Dropdown className={`${deleteWord || difficultWord ? '' : 'display-none'} cursor-pointer`} overlay={renderMenu()}>
      <MoreOutlined />
    </Dropdown>
  );
};

CardMenu.propTypes = {
  addToComplicate: PropTypes.func.isRequired,
  addToDeleted: PropTypes.func.isRequired,
  deleteWord: PropTypes.bool.isRequired,
  difficultWord: PropTypes.bool.isRequired,
};

export default CardMenu;
