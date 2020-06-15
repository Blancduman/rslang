import React, {useState} from "react"
import {Button, Form, Modal} from "antd";

const LoginPage = () => {
    const [modal, setModal] = useState({
        visible: false,
        loading: false,
    });
    const hideModal = () => {
        setModal(prev => Object.assign({}, prev, {visible: false}));
    };
    const showModal = () => {
        setModal(prev => Object.assign({}, prev, {visible: true}))
    };
    const handleOk = () => {
        setModal(prev => Object.assign({}, prev, {loading: true}));
        setTimeout(() => {
            setModal(prev => Object.assign({}, prev, {visible: false, loading: false}));
        }, 3000);
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Sing in form
            </Button>
            <Modal
                title="Sing in"
                visible={modal.visible}
                onCancel={hideModal}
                footer={[
                    <Button
                        key="singin"
                        type="primary"
                        loading={modal.loading}
                        disabled={modal.loading}
                        onClick={handleOk}
                    >
                        Sing in
                    </Button>,
                    <Button
                        key="singup"
                        type="primary"
                        loading={modal.loading}
                        disabled={modal.loading}
                        onClick={handleOk}
                    >
                        Sing up
                    </Button>,
                ]}
            >
            </Modal>
        </>
    )
};

export default LoginPage;
