import React from "react";
import PropTypes from 'prop-types';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export default function StatisticChart({data}) {
    return (
        <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
            <XAxis dataKey="date"/>
            <YAxis/>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#8884d8" />
        </LineChart>
        </ResponsiveContainer>
    )
}

StatisticChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.string,
        score: PropTypes.number,
    })).isRequired
};
