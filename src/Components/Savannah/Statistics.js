import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { List, Divider } from 'antd';
import speechRecognition from '../../utls/Speakit/Sound/Sound';

import { updateSavannahStatistics, getSavannahStatistics } from '../../Services/statisticsSavannah';
import { gameDate } from '../../utls';

const Statistics = (props) => {
  const {
    correctAnswers,
    wrongAnswers,
  } = props;

  async function updateStatistics() {
    if (await getSavannahStatistics()) {
      const date = gameDate();
      const optional = await getSavannahStatistics();
      await updateSavannahStatistics({
        stats: {
          optional: {
            savannah: {
              savannahGamesCount: optional.savannah.savannahGamesCount + 1,
              [Number(Object.keys(optional.savannah)[Object.keys(optional.savannah).length - 2]) + 1]: { [date]: 4 },
            },
          },
        },
      });
    } else {
      const date = gameDate();
      console.log(date);
      await updateSavannahStatistics({
        stats: {
          optional: {
            savannah: {
              savannahGamesCount: 1,
              1: { [date]: 5 },
            },
          },
        },
      });
    }
  }

  useEffect(() => {
    updateStatistics();
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
