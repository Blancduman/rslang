import React from 'react';
import PropTypes from 'prop-types';
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis,} from 'recharts';

export default function StatisticChart({ data }) {
  return (
      <LineChart width={400} height={300} data={data} margin={{margin: '2rem'}}>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid stroke="#000" strokeDasharray="5 5" />
        <Tooltip />
        <Line type="monotone" dataKey="score" stroke="#8884d8" />
      </LineChart>
  );
}

StatisticChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    score: PropTypes.number,
  })).isRequired,
};
