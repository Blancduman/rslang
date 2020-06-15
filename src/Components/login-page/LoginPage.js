import React, {useState} from "react"
import {Button, Form, Input, Modal, Spin} from "antd";
import {signIn, signUp} from "../../Services/LoginService";
import LockOutlined from "@ant-design/icons/lib/icons/LockOutlined";
import MailOutlined from "@ant-design/icons/lib/icons/MailOutlined";

const LoginPage = ({user, setUser}) => {
    const [form] = Form.useForm();

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

    const handleSignIn = async () => {
        try {
            setModal(prev => {
                return {...prev, loading: true}
            });
            await form.validateFields();
            const data = form.getFieldsValue();

            const response = await signIn(data);
            console.log('response', response);
            if (typeof response === 'string') {
                throw new Error(response);
            }
            setUser(response);
            form.resetFields();

            setModal(prev => {
                return {...prev, visible: false, loading: false}
            });
        } catch (e) {
            console.log(e);
            setModal(prev => {
                return {...prev, loading: false}
            });
        }
    };

    const handleSignUp = async () => {
        try {
            setModal(prev => {
                return {...prev, loading: true}
            });
            await form.validateFields();
            const data = form.getFieldsValue();

            const response = await signUp(data);
            form.resetFields();

            setModal(prev => {
                return {...prev, visible: false, loading: false}
            });
        } catch (e) {
            setModal(prev => {
                return {...prev, loading: false}
            });
        }
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Sign in form
            </Button>
            <Modal
                title="Sign in"
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
                        onClick={handleSignIn}
                    >
                        Sign in
                    </Button>,
                    <Button
                        key="signUp"
                        type="primary"
                        disabled={modal.loading}
                        onClick={handleSignUp}
                    >
                        Sign up
                    </Button>,
                ]}
            >
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
