import React, { useState } from 'react';
import {
  PageHeader, Button, Layout,
} from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import LoginModal from '../LoginModal/LoginModal';

const { Content } = Layout;

const HeaderPage = () => {
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
    <PageHeader
      className="site-page-header"
      extra={[
        authorized
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
  );
};
export default HeaderPage;
