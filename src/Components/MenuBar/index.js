import React, { useState } from 'react';
import {
  TeamOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  ReadOutlined,
  RocketOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import {
  Layout, Menu, Button,
} from 'antd';
import './menu_bar.css';

const {
  SubMenu,
} = Menu;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="basic-layout_menu_wrapper">
      <Button
        type="primary"
        onClick={() => setCollapsed(!collapsed)}
        className="btn_collapsed"
      >
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        className="menu_bar"
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <NavLink to="/">
            Home
          </NavLink>
        </Menu.Item>

        <Menu.Item key="2" icon={<ReadOutlined />}>
          <NavLink to="/dictionary">
            Словарь
          </NavLink>
        </Menu.Item>

        <SubMenu key="sub1" icon={<RocketOutlined />} title="Мини-игры">
          <Menu.Item key="3">
            <NavLink to="/speakit">
              Speakit
            </NavLink>
          </Menu.Item>

          <Menu.Item key="4">
            <NavLink to="/savanna">
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
        </SubMenu>

        <Menu.Item key="7" icon={<InfoCircleOutlined />}>
          <NavLink to="/promo">
            О приложении
          </NavLink>
        </Menu.Item>

        <Menu.Item key="8" icon={<TeamOutlined />}>
          <NavLink to="/about">
            О команде
          </NavLink>
        </Menu.Item>

      </Menu>
    </Layout>
  );
};

export default SideBar;
