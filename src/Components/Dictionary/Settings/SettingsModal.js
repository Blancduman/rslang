import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  InputNumber,
  Form,
  Select,
  Switch,
  Button,
} from 'antd';
import './settingsmodal.css';

const SettingsModal = (props) => {
  const {
    visible, onOk, onCancel, options, loading,
  } = props;
  const [form] = Form.useForm();
  const [settings, setSettings] = useState(options);

  const cancelModal = () => {
    setTimeout(() => {
      form.resetFields();
      setSettings(options);
      form.setFieldsValue(options);
    }, 1000);
    onCancel();
  };

  return (
    <Modal
      title="Настройки"
      visible={visible}
      onCancel={cancelModal}
      footer={[
        <Button
          key="cancel"
          type="default"
          onClick={cancelModal}
        >
          Отменить
        </Button>,
        <Button
          key="ok"
          type="primary"
          onClick={() => {
            if (settings.cardSettings.length) {
              onOk(settings);
            }
          }}
        >
          Сохранить
        </Button>,
      ]}
      okText="Применить"
      cancelText="Отменить"
      confirmLoading={loading}
    >
      <Form
        form={form}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={settings}
      >
        <Form.Item label="Новых изучаемых слов за день" fieldKey={1}>
          <Form.Item name="wordsPerDay" noStyle>
            <InputNumber
              min={1}
              max={settings.maxWordsPerDay}
              onChange={(newValue) => setSettings({
                ...settings,
                wordsPerDay: newValue,
              })}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item label="Максимальное изучаемых слов за день" fieldKey={2}>
          <Form.Item name="maxWordsPerDay" noStyle>
            <InputNumber
              min={1}
              max={50}
              onChange={(newValue) => setSettings({
                ...settings,
                maxWordsPerDay: newValue,
              })}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item
          name="cardSettings"
          label="Настройки карточки"
          rules={[{
            required: true,
            message: 'Выберите хотя бы одну',
            type: 'array',
          }]}
          fieldKey={3}
        >
          <Select
            mode="multiple"
            onChange={(newValue) => {
              setSettings({
                ...settings,
                cardSettings: newValue,
                translateWord: newValue.includes('translateWord'),
                wordExplaining: newValue.includes('wordExplaining'),
                sentenceExample: newValue.includes('sentenceExample'),
              });
            }}
          >
            <Select.Option value="translateWord" selected={settings.translateWord} key={1}>Перевод</Select.Option>
            <Select.Option value="wordExplaining" selected={settings.wordExplaining} key={2}>Объяснение</Select.Option>
            <Select.Option value="sentenceExample" selected={settings.sentenceExample} key={3}>Пример использования</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label={'Показывать кнопку "Показать ответ"'} name="showAnswer" fieldKey={4}>
          <Switch
            checked={settings.showAnswer}
            onChange={(e) => setSettings({ ...settings, showAnswer: e })}
          />
        </Form.Item>

        <Form.Item label={'Показывать кнопку "Удалить слово"'} name="deleteWord" fieldKey={5}>
          <Switch
            checked={settings.deleteWord}
            onChange={(e) => setSettings({ ...settings, deleteWord: e })}
          />
        </Form.Item>

        <Form.Item label={'Показывать кнопку "Добавить в сложное"'} name="difficult" fieldKey={6}>
          <Switch
            checked={settings.difficult}
            onChange={(e) => setSettings({ ...settings, difficult: e })}
          />
        </Form.Item>

        <Form.Item label="Возможность оценить слово" name="ratingWord" fieldKey={7}>
          <Switch
            checked={settings.ratingWord}
            onChange={(e) => setSettings({ ...settings, ratingWord: e })}
          />
        </Form.Item>

        <Form.Item label="Изучать только новые слова" name="onlyNew" fieldKey={8}>
          <Switch
            checked={settings.onlyNew}
            onChange={(e) => setSettings({ ...settings, onlyNew: e })}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

SettingsModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  options: PropTypes.shape({
    wordsPerDay: PropTypes.number,
    maxWordsPerDay: PropTypes.number,
    translateWord: PropTypes.bool,
    transcriptionWord: PropTypes.bool,
    imageAssociation: PropTypes.bool,
    showAnswer: PropTypes.bool,
    deleteWord: PropTypes.bool,
    difficult: PropTypes.bool,
    ratingWord: PropTypes.bool,
    onlyNew: PropTypes.bool,
    wordExplaining: PropTypes.bool,
    sentenceExample: PropTypes.bool,
    cardSettings: PropTypes.array,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SettingsModal;
