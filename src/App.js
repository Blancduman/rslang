import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import Example from './Components/Example';
import MenuBar from './Components/MenuBar';
import HeaderBar from './Components/Header';
import GameSprintPage from './Components/GameSprintPage/GameSprintPage';
import Speakit from './Containers/Speakit';
import SavannahStartPage from './Components/Savannah/Screens/SavannahStartPage';
import Dictionary from './Containers/Dictionary';
import EnglishPuzzle from './Containers/EnglishPuzzle';
import StatisticsPage from './Components/StatisticsPage/StatisticsPage';
import About from './Components/About';
import PromoPage from './Components/Promo';
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
            <SavannahStartPage />
          </Route>
          <Route path="/sprint">
            <GameSprintPage />
          </Route>
          <Route path="/english_puzzle">
            <EnglishPuzzle />
          </Route>
          <Route path="/statistics">
            <StatisticsPage />
          </Route>
          <Route path="/promo">
            <PromoPage />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </Content>
    </Layout>
  </Router>
);

export default App;
