import React, { useState } from 'react';
import {
  PageHeader, Button, Layout,
} from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import LoginModal from '../LoginModal/LoginModal';
import './header.css';

const { Content } = Layout;

const HeaderPage = () => {
  const isAuthorized = !!localStorage.getItem('user');
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
    localStorage.removeItem('user');
  };

  return (
    <Layout className="basic-layout_header">
      <PageHeader
        extra={[
          authorized
            ? (
              <Button key="signExit" type="primary" onClick={logout}>
                Выйти
              </Button>
            )
            : (
              <ButtonGroup key="1">
                <Button key="signIn" type="primary" onClick={() => showModal('SignIn')}>
                  Войти
                </Button>
                <Button key="signUp" type="primary" onClick={() => showModal('SignUp')}>
                  Регистрация
                </Button>
              </ButtonGroup>
            ),
        ]}
      >
        <Content>
          <LoginModal
            loginModalVisible={loginModalVisible}
            setAuthorized={setAuthorized}
            hideModal={hideModal}
            type={loginType}
          />
        </Content>
      </PageHeader>
    </Layout>
  );
};
export default HeaderPage;
