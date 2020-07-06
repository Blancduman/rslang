import React, {useEffect, useState} from "react";
import {Col, Divider, Row} from "antd";
import {getStatistic} from "../../Services/StatisticService";
import StatisticChart from "../StatisticChart/StatisticChart";

import './statistics-page.css'

export default function StatisticsPage() {
    const [sprintData, setSprintData] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const statistic = await getStatistic();
                delete statistic.id;
                const sprintStatistic = statistic.optional.sprint.results;
                setSprintData(sprintStatistic);
            } catch (e) {
                setSprintData([]);
            }
        })();
    }, []);

    return (
        <div className="statistics-page__container">
            <Divider orientation="left">
                Изучение слов
            </Divider>
            <Row type="flex" gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col className="gutter-row">

                </Col>
            </Row>
            <Divider orientation="left">
                Мини-игры
            </Divider>
            <Row type="flex" gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col className="gutter-row">
                    <h4>Спринт</h4>
                    <StatisticChart data={sprintData}/>
                </Col>
            </Row>
        </div>
    )
}
