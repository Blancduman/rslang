import React from "react";
import PropTypes from 'prop-types'
import {Card} from "antd";

const Statistics = ({score}) => {
    return (
        <Card>
            <Card.Grid className="game-sprint__card-layout">
                <h1>Игра окончена</h1>
                <p>Ваш счёт: {score}</p>
            </Card.Grid>
        </Card>
    )
};

Statistics.propTypes = {
    score: PropTypes.number.isRequired
};

export default Statistics;
