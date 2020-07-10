import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import {
  SoundOutlined, AudioOutlined, AudioMutedOutlined, FileDoneOutlined, FileExcelOutlined,
} from '@ant-design/icons';
import Sound from '../../../utls/Speakit/Sound/Sound';

const Options = ({
  sentence,
  setAutoPronunciation,
  autoPronunciation,
  autoTranslate,
  setAutoTranslate,
  translate,
}) => (
  <div
    className="english-puzzle__options"
  >
    <Button
      type="primary"
      icon={<SoundOutlined />}
      shape="round"
      className="english-puzzle__options_sound"
      onClick={() => Sound(sentence)}
    >
      Произнести
    </Button>
    <Button
      type="primary"
      icon={autoPronunciation ? <AudioOutlined /> : <AudioMutedOutlined />}
      shape="round"
      className="english-puzzle__options_sound"
      onClick={() => {
        if (autoPronunciation) {
          setAutoPronunciation(false);
        } else {
          setAutoPronunciation(true);
        }
      }}
    >
      {autoPronunciation ? 'Автопроизношение включено' : 'Автопроизношение выключено'}
    </Button>
    <Button
      type="primary"
      icon={autoTranslate ? <FileDoneOutlined /> : <FileExcelOutlined />}
      shape="round"
      className="english-puzzle__options_sound"
      onClick={() => {
        if (autoTranslate) {
          setAutoTranslate(false);
        } else {
          setAutoTranslate(true);
        }
      }}
    >
      {autoTranslate ? 'Автоперевод включен' : 'Автоперевод выключен'}
    </Button>
    <p
      className="english-puzzle__translate"
    >
      {autoTranslate ? translate : ''}
    </p>
  </div>
);

Options.propTypes = {
  setAutoPronunciation: PropTypes.func.isRequired,
  setAutoTranslate: PropTypes.func.isRequired,
  translate: PropTypes.string.isRequired,
  autoPronunciation: PropTypes.bool.isRequired,
  autoTranslate: PropTypes.bool.isRequired,
  sentence: PropTypes.string.isRequired,
};

export default Options;
