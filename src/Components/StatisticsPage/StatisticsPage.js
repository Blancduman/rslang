import React, { useEffect, useState } from 'react';
import { Col, Divider, Row } from 'antd';
import { getStatisticsRequest } from '../../Services/statistics';
import { getStatistic } from '../../Services/statisticService';
import StatisticChart from '../StatisticChart/StatisticChart';

import './statistics-page.css';

export default function StatisticsPage() {
  const [savannahData, setSavannahData] = useState([]);
  const [savannahGames, setSavannahGames] = useState(0);
  const [sprintData, setSprintData] = useState([]);
  const [speakitData, setSpeakitData] = useState([]);
  const [speakitGames, setSpeakitGames] = useState(0);
  const [englishPuzzleData, setEnglishPuzzleData] = useState([]);
  const [englishPuzzleGames, setEnglishPuzzleGames] = useState(0);
  const [audiochallengeData, setAudiochallengeData] = useState([]);
  const [audiochallengeGames, setAudiochallengeGames] = useState(0);

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
      try {
        const statistic = await getStatistic();
        delete statistic.id;
        const sprintStatistic = statistic.optional.sprint.results;
        setSprintData(sprintStatistic);
      } catch (e) {
        setSprintData([]);
      }
      try {
        const data = await getStatisticsRequest();
        const statistic = JSON.parse(data.audiochallenge.dates);
        const { gamesCount } = data.audiochallenge;
        delete statistic.id;
        setAudiochallengeGames(gamesCount);
        setAudiochallengeData(statistic);
      } catch (e) {
        setAudiochallengeData([]);
      }
      try {
        const dataSpeakit = await getStatisticsRequest();
        const statistic = JSON.parse(dataSpeakit.speakit.dates);
        const { gamesCount } = dataSpeakit.speakit;
        delete statistic.id;
        setSpeakitGames(gamesCount);
        setSpeakitData(statistic);
      } catch (e) {
        setSpeakitData([]);
      }
      try {
        const dataEnglishPuzzle = await getStatisticsRequest();
        const statistic = JSON.parse(dataEnglishPuzzle.englishpuzzle.dates);
        const { gamesCount } = dataEnglishPuzzle.englishpuzzle;
        delete statistic.id;
        setEnglishPuzzleGames(gamesCount);
        setEnglishPuzzleData(statistic);
      } catch (e) {
        setEnglishPuzzleData([]);
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
          <StatisticChart data={savannahData} game="savannah" />
        </Col>
        <Col className="gutter-row">
          <h3>Спринт</h3>
          <StatisticChart data={sprintData} game="sprint" />
        </Col>
        <Col className="gutter-row">
          <h3>Аудиовызов</h3>
          <h4>
            Игр сыграно:
            {' '}
            {audiochallengeGames}
          </h4>
          <StatisticChart data={audiochallengeData} game="audiochallenge" />
        </Col>
        <Col>
          <h3>Скажи это</h3>
          <h4>
            {`Игр сыграно: ${speakitGames}`}
          </h4>
          <StatisticChart data={speakitData} game="speakit" />
        </Col>
        <Col>
          <h3>Головоломка</h3>
          <h4>
            {`Игр сыграно: ${englishPuzzleGames}`}
          </h4>
          <StatisticChart data={englishPuzzleData} game="englishpuzzle" />
        </Col>
      </Row>
    </div>
  );
}
