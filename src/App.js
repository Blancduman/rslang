import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Button } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import Example from './Components/Example';
import LoginModal from './Components/LoginModal/LoginModal';

const App = () => {
  let storedUser = localStorage.getItem('user');
  storedUser = storedUser ? JSON.parse(storedUser) : { authorized: false };
  const [user, setUser] = useState(storedUser);

  const [modal, setModal] = useState({
    visible: false,
    loading: false,
    type: 'SignIn',
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const showModal = (type) => {
    setModal((prev) => ({ ...prev, visible: true, type }));
  };

  const logout = () => {
    setUser({ authorized: false });
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user.authorized
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
            setUser={setUser}
            modal={modal}
            setModal={setModal}
          />
        </Route>
          <Route path="/dictionary">
              <Example />
          </Route>
          <Route path="/speakit">
              <Example />
          </Route>
          <Route path="/savannah">
              <Example />
          </Route>
          <Route path="/sprint">
              <Example />
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

export default App;
