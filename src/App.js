import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Button } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
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
      </Switch>
    </Router>
  );
};

export default App;
