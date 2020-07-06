import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { List, Divider } from 'antd';
import speechRecognition from '../../utls/Speakit/Sound/Sound';
import { updateStatistics } from '../../Services/statistics';

import { gameDate } from '../../utls';

const Statistics = (props) => {
  const {
    correctAnswers,
    wrongAnswers,
  } = props;

  useEffect(() => {
    function updateSavannahStatistics({ gamesCount = 0, dates = '[]' }) {
      const datesArr = JSON.parse(dates);
      datesArr.push({
        date: gameDate(),
        'Правильные ответы': correctAnswers.length,
      });
      return {
        gamesCount: gamesCount + 1,
        dates: JSON.stringify(datesArr),
      };
    }
    updateStatistics('savannah', updateSavannahStatistics);
  }, [correctAnswers]);

  return (
    <div>
      <Divider orientation="left">
        {`Ошибки: ${wrongAnswers.length}`}
      </Divider>
      <List
        size="small"
        bordered
        dataSource={wrongAnswers}
        renderItem={(item) => <List.Item className="savannah__statistiks_list" onClick={() => { speechRecognition(item.split(' ')[0]); }}>{item}</List.Item>}
      />
      <Divider orientation="left">
        {`Правильные ответы: ${correctAnswers.length}`}
      </Divider>
      <List
        size="small"
        bordered
        dataSource={correctAnswers}
        renderItem={(item) => <List.Item className="savannah__statistiks_list" onClick={() => { speechRecognition(item.split(' ')[0]); }}>{item}</List.Item>}
      />
    </div>
  );
};
Statistics.propTypes = {
  correctAnswers: PropTypes.arrayOf(PropTypes.any).isRequired,
  wrongAnswers: PropTypes.arrayOf(PropTypes.any).isRequired,
};
export default Statistics;
