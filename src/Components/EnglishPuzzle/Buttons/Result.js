import React from 'react';
import PropTypes from 'prop-types';
import { List, Divider, Card } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
import speechRecognition from '../../../utls/Speakit/Sound/Sound';

const { Meta } = Card;

const Result = (props) => {
  const {
    showListCorrect,
    showListError,
  } = props;

  return (
    <div>
      <Divider orientation="left">
        {`Ошибки: ${showListError.size}`}
      </Divider>
      <List
        size="small"
        bordered
        dataSource={Array.from(showListError)}
        renderItem={(item) => (
          <List.Item className="speakit__statistiks_list" onClick={() => { speechRecognition(item); }}>
            <Meta
              className="speakit__list-inner"
              avatar={
                <NotificationOutlined />
                }
            />
            {item}
          </List.Item>
        )}
      />
      <Divider orientation="left">
        {`Правильные ответы: ${showListCorrect.size}`}
      </Divider>
      <List
        size="small"
        bordered
        dataSource={Array.from(showListCorrect)}
        renderItem={(item) => (
          <List.Item className="speakit__statistiks_list" onClick={() => { speechRecognition(item); }}>
            <Meta
              className="speakit__list-inner"
              avatar={
                <NotificationOutlined />
                }
            />
            {item}
          </List.Item>
        )}
      />
    </div>
  );
};

Result.propTypes = {
  showListCorrect: PropTypes.instanceOf(Set).isRequired,
  showListError: PropTypes.instanceOf(Set).isRequired,
};

export default Result;
