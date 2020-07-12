import React from 'react';
import PropTypes from 'prop-types';
import {
  CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis,
} from 'recharts';

export default function StatisticChart({ data, game }) {
  function lineType(gametype) {
    switch (gametype) {
      case 'savannah': {
        return <Line type="monotone" dataKey="Правильные ответы" stroke="#8884d8" />;
      }
      case 'speakit': {
        return <Line type="monotone" dataKey="Время ответа в секундах" stroke="#8884d8" />;
      }
      default: {
        return <Line type="monotone" dataKey="score" stroke="#8884d8" />;
      }
    }
  }
  return (
    <LineChart width={400} height={300} data={data} margin={{ margin: '2rem' }}>
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid stroke="#000" strokeDasharray="5 5" />
      <Tooltip />
      {lineType(game)}
    </LineChart>
  );
}

StatisticChart.propTypes = {
  game: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    score: PropTypes.number,
  })).isRequired,
};
