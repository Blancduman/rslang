import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Layout } from 'antd';
import Example from './Components/Example';
import SideBar from './Components/SideBar';
import HeaderBar from './Components/Header';
import 'antd/dist/antd.css';
import './main.css';

const { Content } = Layout;

const App = () => (
  <Router>
    <Layout className="basic-layout_wrapper">
      <SideBar />
      <Layout className="basic-layout_layout">
        <HeaderBar />
        <Content className="basic-layout_content">
          <Switch>
            <Route exact path="/">
              <Example />
            </Route>
            <Route path="/dictionary">
              <div>Словарь</div>
            </Route>
            <Route path="/speakit">
              <div>Speakit</div>
            </Route>
            <Route path="/savannah">
              <div>Саванна</div>
            </Route>
            <Route path="/sprint">
              <div>Спринт</div>
            </Route>
            <Route path="/english_puzzle">
              <div>Головоломка</div>
            </Route>
            <Route path="/promo">
              <div>О приложении</div>
            </Route>
            <Route path="/about">
              <div>Команда</div>
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  </Router>
);

export default App;
