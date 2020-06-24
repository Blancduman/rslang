import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './main.css';
import MenuBar from './Components/MenuBar';
import HeaderBar from './Components/Header';
import Example from './Components/Example';
import GameSprintPage from './Components/GameSprintPage/GameSprintPage';
import Speakit from './Containers/Speakit';
import './main.css';

const { Content } = Layout;

<<<<<<< HEAD
const App = () => (
  <Router>
    <Layout className="basic-layout_header">
      <HeaderBar />
    </Layout>
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
            <div>Говорить на нем</div>
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
=======
  return (
    <Router>
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
    </Router>
  );
};
>>>>>>> develop

export default App;
