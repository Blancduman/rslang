import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import Example from './Components/Example';
import MenuBar from './Components/MenuBar';
import HeaderBar from './Components/Header';
import GameSprintPage from './Components/GameSprintPage/GameSprintPage';
import Speakit from './Containers/Speakit';
import Dictionary from './Containers/Dictionary';
import './main.css';

const { Content } = Layout;

const App = () => (
  <Router>
    <HeaderBar />
    <Layout>
      <MenuBar />
      <Content className="basic-layout_content">
        <Switch>
          <Route exact path="/">
            <Example />
          </Route>
          <Route path="/dictionary">
            <Dictionary />
          </Route>
          <Route path="/speakit">
            <Speakit />
          </Route>
          <Route path="/savannah">
            <Example />
          </Route>
          <Route path="/sprint">
            <GameSprintPage />
          </Route>
          <Route path="/english_puzzle">
            <Example />
          </Route>
          <Route path="/promo">
            <Example />
          </Route>
          <Route path="/about">
            <Example />
          </Route>
        </Switch>
      </Content>
    </Layout>
  </Router>
);

export default App;
