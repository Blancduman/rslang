import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import Loading from '../../Components/Loading';
import { SettingsModal, SettingsButton } from '../../Components/Dictionary/Settings';
import { getUserSettings, putUserSettings } from '../../Services/UserSettings';

const { TabPane } = Tabs;

const Dictionary = () => {
  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [auth, setAuth] = useState({});
  const [options, setOptions] = useState({});

  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem('auth')));
  }, []);

  const setUserSettings = (userOptions) => {
    let cardSettings = {
      translateWord: userOptions.optional.translateWord,
      wordExplaining: userOptions.optional.wordExplaining,
      sentenceExample: userOptions.optional.sentenceExample,
    };
    cardSettings = Object.keys(cardSettings).map((i) => {
      if (cardSettings[i]) {
        return i;
      }
      return false;
    }).filter((i) => {
      if (i) return i;
      return false;
    });

    setOptions({
      ...userOptions.optional,
      wordsPerDay: userOptions.wordsPerDay,
      cardSettings,
    });
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) {
      (async (user) => {
        const userOptions = await getUserSettings(user.userId, user.token);
        setUserSettings(userOptions);
        setLoading(false);
      })(auth);
    }
  }, [auth]);

  const openSettings = () => {
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  const onSettingsOk = async (newSettings) => {
    setConfirmLoading(true);
    const { cardSettings, wordsPerDay, ...preUpdateNewSettings } = newSettings;
    const updateNewSettings = {
      wordsPerDay,
      optional: preUpdateNewSettings,
    };
    const updatedSettings = await putUserSettings(auth.userId, auth.token, updateNewSettings);
    setUserSettings(updatedSettings);
    setConfirmLoading(false);
    closeSettings();
  };

  const onSettingsCancel = () => {
    console.log('closed');
    closeSettings();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        type="card"
        size="large"
        tabBarExtraContent={
          <SettingsButton open={openSettings} />
        }
      >
        <TabPane tab="Новый" key="1">
          <h1>Табчик с новыми словами</h1>
        </TabPane>
        <TabPane tab="Сложные" key="2">
          <h1>Табчик с сложными словами</h1>
        </TabPane>
        <TabPane tab="Удалённые" key="3">
          <h1>Табчик с удалёнными словами</h1>
        </TabPane>
      </Tabs>
      <SettingsModal
        visible={showSettings}
        onOk={onSettingsOk}
        onCancel={onSettingsCancel}
        options={options}
        loading={confirmLoading}
      />
    </>
  );
};

export default Dictionary;
