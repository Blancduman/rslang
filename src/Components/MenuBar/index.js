import React from 'react';
import PropTypes from 'prop-types';
import {
  TeamOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  ReadOutlined,
  RocketOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Layout, Menu, Button,
} from 'antd';
import './menu_bar.css';
import LineChartOutlined from '@ant-design/icons/lib/icons/LineChartOutlined';

const {
  SubMenu,
} = Menu;

const SideBar = ({ collapsed, setCollapsed }) => {
  const { pathname } = useLocation();

  return (
    <Layout className={collapsed ? 'basic-layout_menu_wrapper_close' : 'basic-layout_menu_wrapper_open'}>
      <Button
        type="primary"
        onClick={() => setCollapsed(!collapsed)}
        className="btn_collapsed"
      >
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button>
      <Menu
        selectedKeys={[pathname]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        className="menu_bar"
      >
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <NavLink to="/">
            Главная
          </NavLink>
        </Menu.Item>

        <Menu.Item key="/dictionary" icon={<ReadOutlined />}>
          <NavLink to="/dictionary">
            Словарь
          </NavLink>
        </Menu.Item>

        <SubMenu key="sub1" icon={<RocketOutlined />} title="Мини-игры">
          <Menu.Item key="/speakit">
            <NavLink to="/speakit" target="_blank" rel="noreferrer noopener">
              Скажи это
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/audiochallenge">
            <NavLink to="/audiochallenge" target="_blank" rel="noreferrer noopener">
              Аудиовызов
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/savannah">
            <NavLink to="/savannah" target="_blank" rel="noreferrer noopener">
              Саванна
            </NavLink>
          </Menu.Item>

          <Menu.Item key="/sprint">
            <NavLink to="/sprint" target="_blank" rel="noreferrer noopener">
              Спринт
            </NavLink>
          </Menu.Item>

          <Menu.Item key="/english_puzzle">
            <NavLink to="/english_puzzle" target="_blank" rel="noreferrer noopener">
              Головоломка
            </NavLink>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="/statistics" icon={<LineChartOutlined />}>
          <NavLink to="/statistics">
            Статистика
          </NavLink>
        </Menu.Item>

        <Menu.Item key="/promo" icon={<InfoCircleOutlined />}>
          <NavLink to="/promo">
            О приложении
          </NavLink>
        </Menu.Item>

        <Menu.Item key="/about" icon={<TeamOutlined />}>
          <NavLink to="/about">
            О команде
          </NavLink>
        </Menu.Item>

      </Menu>
    </Layout>
  );
};

SideBar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  setCollapsed: PropTypes.func.isRequired,
};

export default SideBar;
