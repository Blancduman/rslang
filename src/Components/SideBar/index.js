import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Layout, Menu,
} from 'antd';
import './side-bar.css';

const {
  Sider,
} = Layout;

const SideBar = () => (
  <Sider className="basic-layout_side_bar">
    <Menu theme="dark" mode="inline">
      <Menu.Item key="1">
        <NavLink to="/">Home</NavLink>
      </Menu.Item>
      <Menu.Item key="2">
        <NavLink to="/dictionary">
          Словарь
        </NavLink>
      </Menu.Item>
      <Menu.Item key="3">
        <NavLink to="/speakit">
          Speakit
        </NavLink>
      </Menu.Item>
      <Menu.Item key="4">
        <NavLink to="/savannah">
          Саванна
        </NavLink>
      </Menu.Item>
      <Menu.Item key="5">
        <NavLink to="/sprint">
          Спринт
        </NavLink>
      </Menu.Item>
      <Menu.Item key="6">
        <NavLink to="/english_puzzle">
          Головоломка
        </NavLink>
      </Menu.Item>
      <Menu.Item key="7">
        <NavLink to="/promo">
          О приложении
        </NavLink>
      </Menu.Item>
      <Menu.Item key="8">
        <NavLink to="/about">
          Команда
        </NavLink>
      </Menu.Item>
    </Menu>
  </Sider>
);

export default SideBar;
