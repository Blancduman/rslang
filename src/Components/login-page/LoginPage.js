import React, {useState} from "react"
import {Alert, Button, Form, Input, Modal, Spin} from "antd";
import {signIn, signUp} from "../../Services/LoginService";
import LockOutlined from "@ant-design/icons/lib/icons/LockOutlined";
import MailOutlined from "@ant-design/icons/lib/icons/MailOutlined";

const LoginPage = ({user, setUser}) => {
    const isAuthorized = user.authorized;
    const [form] = Form.useForm();
    const [error, setError] = useState('');

    const [modal, setModal] = useState({
        visible: false,
        loading: false,
    });

    const hideModal = () => {
        if (!modal.loading) {
            form.resetFields();
            setModal(prev => {
                return {...prev, visible: false}
            });
        }
    };

    const showModal = () => {
        setModal(prev => {
            return {...prev, visible: true}
        });
    };

    const logout = () => {
        setUser({authorized: false})
    };

    const executeSignIn = async (data) => {
        const response = await signIn(data);
        if (typeof response === 'string') {
            throw new Error(response);
        }
        setUser({...response, authorized: true});
        form.resetFields();
    };

    const executeSignUp = async (data) => {
        const response = await signUp(data);
        if (typeof response === 'string') {
            throw new Error(response);
        }
        await executeSignIn(data);
    };

    const handleSign = async (method) => {
        try {
            setModal(prev => {
                return {...prev, loading: true}
            });
            await form.validateFields();
            const data = form.getFieldsValue();

            if (method === 'in') {
                await executeSignIn(data)
            } else {
                await executeSignUp(data)
            }

            setModal(prev => {
                return {...prev, visible: false, loading: false}
            });
        } catch (e) {
            setError(e);
            setModal(prev => {
                return {...prev, loading: false}
            });
        }
    };

    return (
        <>
            <Button type="primary" onClick={isAuthorized ? logout : showModal}>
                {isAuthorized ? 'Logout' : 'Sign in / Sign up'}
            </Button>
            <Modal
                title="Sign in / Sign up"
                visible={modal.visible}
                onCancel={hideModal}
                footer={[
                    modal.loading ?
                        <Spin
                            key="spinner"
                            className="spinner"
                        />
                        : null,
                    <Button
                        key="signIn"
                        type="primary"
                        disabled={modal.loading}
                        onClick={() => handleSign('in')}
                    >
                        Sign in
                    </Button>,
                    <Button
                        key="signUp"
                        type="primary"
                        disabled={modal.loading}
                        onClick={() => handleSign('up')}
                    >
                        Sign up
                    </Button>,
                ]}
            >
                {error ?
                    <Alert
                        className="alert"
                        message={error}
                        type="error"
                        showIcon
                    />
                    : null
                }
                <Form form={form}>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please, input your E-mail!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="site-form-item-icon"/>}
                            placeholder="Email"
                            allowClear
                            autoComplete="off"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please, input a password'
                            },
                            {
                                message: 'Please, input a correct password',
                                pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[+\-_@$!%*?&#.,;:\[\]{}])(.{8,})/
                            }
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            placeholder="Password"
                            allowClear
                            autoComplete="off"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
};

export default LoginPage;
