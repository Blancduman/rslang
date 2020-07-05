import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout, Button } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import Example from './Components/Example';
import MenuBar from './Components/MenuBar';
import HeaderBar from './Components/Header';
import LoginModal from './Components/LoginModal/LoginModal';
import GameSprintPage from './Components/GameSprintPage/GameSprintPage';
import Speakit from './Containers/Speakit';
import './main.css';

const { Content } = Layout;

const App = () => {
  const isAuthorized = !!localStorage.getItem('token');
  const [authorized, setAuthorized] = useState(isAuthorized);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [loginType, setLoginType] = useState('SignIn');

  const showModal = (type) => {
    setLoginType(type);
    setLoginModalVisible(true);
  };

  const hideModal = () => {
    setLoginModalVisible(false);
  };

  const logout = () => {
    setAuthorized(false);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <HeaderBar />
      <Layout>
        <MenuBar />
        <Content className="basic-layout_content">
          <Switch>
            <Route exact path="/">
              {authorized
                ? (
                  <Button type="primary" onClick={logout}>
                    Выйти
                  </Button>
                )
                : (
                  <ButtonGroup>
                    <Button type="primary" onClick={() => showModal('SignIn')}>
                      Войти
                    </Button>
                    <Button type="primary" onClick={() => showModal('SignUp')}>
                      Регистрация
                    </Button>
                  </ButtonGroup>
                )}
              <LoginModal
                loginModalVisible={loginModalVisible}
                setAuthorized={setAuthorized}
                hideModal={hideModal}
                type={loginType}
              />
            </Route>
            <Route path="/dictionary">
              <Example />
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
    </Router>
  );
};

export default App;
