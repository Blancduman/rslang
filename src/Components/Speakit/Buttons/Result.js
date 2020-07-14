import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { List, Divider, Card } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
import speechRecognition from '../../../utls/Speakit/Sound/Sound';
import { updateStatistics } from '../../../Services/statistics';
import { gameDate } from '../../../utls';

const { Meta } = Card;

const Result = (props) => {
  const {
    showCorrectAnswer,
    showErrorAnswer,
    timer,
  } = props;

  useEffect(() => {
    function speakit({ gamesCount = 0, dates = '[]' }) {
      const datesArr = JSON.parse(dates);
      datesArr.push({
        date: gameDate(),
        'Время ответа в секундах': timer,
      });
      if (datesArr.length > 10) datesArr.shift();
      return {
        gamesCount: gamesCount + 1,
        dates: JSON.stringify(datesArr),
      };
    }
    if (showCorrectAnswer.size === 10) {
      updateStatistics('speakit', speakit);
    }
  }, [showCorrectAnswer, timer]);


  return (
    <div>
      <Divider orientation="left">
        {`Ошибки: ${showErrorAnswer.size}`}
      </Divider>
      <List
        size="small"
        bordered
        dataSource={Array.from(showErrorAnswer)}
        renderItem={(item) => (
          <List.Item className="speakit__statistiks_list" onClick={() => { speechRecognition(item.split(' ')[0]); }}>
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
        {`Правильные ответы: ${showCorrectAnswer.size}`}
      </Divider>
      <List
        size="small"
        bordered
        dataSource={Array.from(showCorrectAnswer)}
        renderItem={(item) => (
          <List.Item className="speakit__statistiks_list" onClick={() => { speechRecognition(item.split(' ')[0]); }}>
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
  showCorrectAnswer: PropTypes.instanceOf(Set).isRequired,
  showErrorAnswer: PropTypes.instanceOf(Set).isRequired,
  timer: PropTypes.number.isRequired,
};

export default Result;
