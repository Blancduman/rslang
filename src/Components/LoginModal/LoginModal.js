import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Alert, Button, Form, Input, Modal, Tooltip,
} from 'antd';
import LockOutlined from '@ant-design/icons/LockOutlined';
import MailOutlined from '@ant-design/icons/MailOutlined';
import { signIn, signUp } from '../../Services/LoginService';

import './login-modal.css';

const LoginModal = ({
  loginModalVisible, setAuthorized, hideModal, type,
}) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const closeModal = () => {
    if (!loading) {
      form.resetFields();
      setError('');
      hideModal();
    }
  };

  const executeSignIn = async (data) => {
    const response = await signIn(data);
    localStorage.setItem('token', response.token);
    setAuthorized(true);
  };

  const executeSignUp = async (data) => {
    await signUp(data);
  };

  const handleClickOkButton = async () => {
    try {
      setLoading(true);
      await form.validateFields();
      const data = form.getFieldsValue();

      if (type === 'SignIn') {
        await executeSignIn(data);
      } else {
        await executeSignUp(data);
      }

      setLoading(false);
      closeModal();
    } catch (e) {
      if (e.message) {
        setError(e.message);
      } else {
        setError('Введены некорректные данные');
      }
      setLoading(false);
    }
  };

  return (
    <Modal
      title={type === 'SignIn' ? 'Вход' : 'Регистрация'}
      visible={loginModalVisible}
      onCancel={closeModal}
      footer={[
        <Button
          key="cancel"
          type="default"
          disabled={loading}
          onClick={closeModal}
        >
          Отмена
        </Button>,
        <Button
          key="ok"
          type="primary"
          loading={loading}
          disabled={loading}
          onClick={handleClickOkButton}
        >
          OK
        </Button>,
      ]}
    >
      {error
        ? (
          <Alert
            className="login-modal__alert"
            message={error}
            type="error"
            showIcon
          />
        )
        : null}
      <Form form={form}>
        <Form.Item
          name="email"
          validateTrigger="onBlur"
          rules={[
            {
              type: 'email',
              message: 'Введён неправильный E-mail!',
            },
            {
              required: true,
              message: 'Пожалуйста, введите Ваш e-mail',
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="E-mail"
            allowClear
            autoComplete="off"
          />
        </Form.Item>

        <Tooltip
          trigger={['hover']}
          title="Минимум: 1 заглавная буква, 1 строчная буква, 1 специальный символ (+-_@$!%*?&#.,;:[]{}). Минимальная длина 8"
          placement="bottomLeft"
          overlayClassName="numeric-input"
        >
          <Form.Item
            name="password"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите пароль',
              },
              {
                message: 'Введённый пароль не удовлетворяет требованиям!',
                pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[+\-_@$!%*?&#.,;:[\]{}])(.{8,})/,
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Пароль"
              allowClear
              autoComplete="off"
            />
          </Form.Item>
        </Tooltip>
      </Form>
    </Modal>
  );
};

LoginModal.defaultProps = {
  type: 'SignIn',
};

LoginModal.propTypes = {
  loginModalVisible: PropTypes.bool.isRequired,
  setAuthorized: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default LoginModal;
