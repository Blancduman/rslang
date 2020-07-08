import React, { useEffect, useState } from 'react';
import { Col, Divider, Row } from 'antd';
import { getStatisticsRequest } from '../../Services/statistics';
import StatisticChart from '../StatisticChart/StatisticChart';

import './statistics-page.css';

export default function StatisticsPage() {
  const [savannahData, setSavannahData] = useState([]);
  const [savannahGames, setSavannahGames] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const data = await getStatisticsRequest();
        const statistic = JSON.parse(data.savannah.dates);
        const { gamesCount } = data.savannah;
        delete statistic.id;
        setSavannahGames(gamesCount);
        setSavannahData(statistic);
      } catch (e) {
        setSavannahData([]);
      }
    })();
  }, []);

  return (
    <div className="statistics-page__container">
      <Divider orientation="left">
        Изучение слов
      </Divider>
      <Row
        type="flex"
        gutter={{
          xs: 8, sm: 16, md: 24, lg: 32,
        }}
      >
        <Col className="gutter-row" />
      </Row>
      <Divider orientation="left">
        Мини-игры
      </Divider>
      <Row
        type="flex"
        gutter={{
          xs: 8, sm: 16, md: 24, lg: 32,
        }}
      >
        <Col className="gutter-row">
          <h3>Саванна</h3>
          <h4>
            Игр сыграно:
            {' '}
            {savannahGames}
          </h4>
          <StatisticChart data={savannahData} />
        </Col>
      </Row>
    </div>
  );
}
