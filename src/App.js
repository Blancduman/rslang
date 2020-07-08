import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import './main.css';
import MenuBar from './Components/MenuBar';
import HeaderBar from './Components/Header';
import Example from './Components/Example';
import GameSprintPage from './Components/GameSprintPage/GameSprintPage';
import Speakit from './Containers/Speakit';
import EnglishPuzzle from './Containers/EnglishPuzzle';

const { Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Router>
      <HeaderBar />
      <Layout>
        <MenuBar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <Content className={collapsed ? 'basic-layout_content_menu-close' : 'basic-layout_content_menu-open'}>
          <Switch>
            <Route exact path="/">
              <Example />
            </Route>
            <Route path="/dictionary">
              <div>Словарь</div>
            </Route>
            <Route path="/speakit">
              <Speakit />
            </Route>
            <Route path="/savannah">
              <div>Саванна</div>
            </Route>
            <Route path="/sprint">
              <GameSprintPage />
            </Route>
            <Route path="/english_puzzle">
              <EnglishPuzzle />
            </Route>
            <Route path="/promo">
              PromoPage
            </Route>
            <Route path="/about">
              About
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
