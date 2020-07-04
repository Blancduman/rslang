import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import './main.css';
import MenuBar from './Components/MenuBar';
import HeaderBar from './Components/Header';
import Example from './Components/Example';
import GameSprintPage from './Components/GameSprintPage/GameSprintPage';
import Speakit from './Containers/Speakit';
import Audiochallenge from './Components/Audiochallenge/Audiochallenge';

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
            <div>Головоломка</div>
          </Route>
          <Router path="/audiochallenge">
            <Audiochallenge />
          </Router>
          <Route path="/promo">
            <div>О приложении</div>
          </Route>
          <Route path="/about">
            <div>О команде</div>
          </Route>
        </Switch>
      </Content>
    </Layout>
  </Router>
);

export default App;
