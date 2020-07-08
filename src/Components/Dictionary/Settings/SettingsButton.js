import React from 'react';
import PropTypes from 'prop-types';
import { SettingOutlined } from '@ant-design/icons';
import './settingsbutton.css';

const SettingsButton = (props) => {
  const { open } = props;

  return <SettingOutlined className="dictionary__settings_button" onClick={open} />;
};

SettingsButton.propTypes = {
  open: PropTypes.func.isRequired,
};

export default SettingsButton;
