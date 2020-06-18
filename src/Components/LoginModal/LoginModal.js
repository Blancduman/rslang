import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Alert, Button, Form, Input, Modal, Tooltip,
} from 'antd';
import LockOutlined from '@ant-design/icons/LockOutlined';
import MailOutlined from '@ant-design/icons/MailOutlined';
import { signIn, signUp } from '../../Services/LoginService';

const LoginModal = ({ setUser, modal, setModal }) => {
  const [error, setError] = useState('');
  const [form] = Form.useForm();

  const hideModal = () => {
    if (!modal.loading) {
      form.resetFields();
      setError('');
      setModal((prev) => ({ ...prev, visible: false }));
    }
  };

  const executeSignIn = async (data) => {
    const response = await signIn(data);
    if (response instanceof Error) {
      throw response;
    }
    setUser({ ...response, authorized: true });
  };

  const executeSignUp = async (data) => {
    const response = await signUp(data);
    if (response instanceof Error) {
      throw response;
    }
  };

  const clearModal = () => {
    form.resetFields();
    setError('');
  };

  const handleClickOkButton = async () => {
    try {
      setModal((prev) => ({ ...prev, loading: true }));
      await form.validateFields();
      const data = form.getFieldsValue();

      if (modal.type === 'SignIn') {
        await executeSignIn(data);
      } else {
        await executeSignUp(data);
      }

      clearModal();
      setModal((prev) => ({ ...prev, visible: false, loading: false }));
    } catch (e) {
      if (e.message) {
        setError(e.message);
      } else {
        setError('Введены некорректные данные');
      }
      setModal((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <Modal
      title={modal.type === 'SignIn' ? 'Вход' : 'Регистрация'}
      visible={modal.visible}
      onCancel={hideModal}
      footer={[
        <Button
          key="cancel"
          type="default"
          disabled={modal.loading}
          onClick={hideModal}
        >
          Отмена
        </Button>,
        <Button
          key="ok"
          type="primary"
          loading={modal.loading}
          disabled={modal.loading}
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

LoginModal.propTypes = {
  setUser: PropTypes.func.isRequired,
  modal: PropTypes.objectOf(PropTypes.any).isRequired,
  setModal: PropTypes.func.isRequired,
};

export default LoginModal;
