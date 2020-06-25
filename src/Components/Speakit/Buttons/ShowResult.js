import React from 'react';
import PropTypes from 'prop-types';
import { List, Divider } from 'antd';
import speechRecognition from '../Sound/Sound';

const Result = (props) => {
  const {
    correctAnswer,
    errorAnswer,
  } = props;

  return (
    <div>
      <Divider orientation="left">
        Error answer
      </Divider>
      <List
        size="small"
        bordered
        dataSource={errorAnswer}
        renderItem={(item) => <List.Item className="speakit__statistiks_list" onClick={() => { speechRecognition(item.split(' ')[0]); }}>{item}</List.Item>}
      />
      <Divider orientation="left">
        Correct answer
      </Divider>
      <List
        size="small"
        bordered
        dataSource={correctAnswer}
        renderItem={(item) => <List.Item className="speakit__statistiks_list" onClick={() => { speechRecognition(item.split(' ')[0]); }}>{item}</List.Item>}
      />
    </div>
  );
};

Result.prototype = {
  correctAnswer: PropTypes.arrayOf(PropTypes.string).isRequired,
  errorAnswer: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Result;
