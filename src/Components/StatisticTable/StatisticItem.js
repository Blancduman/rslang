import React from 'react';
import PropTypes from 'prop-types';
import { NotificationOutlined } from '@ant-design/icons';
import speechRecognition from '../../utls/Speakit/Sound/Sound';

import './statistics.css';

export default function StatisticItem({ words }) {
  return (
    <ul className="statistics-list">
      {words.map((word) => (
        <li key={word.word} className="statistics-list__item">
          <NotificationOutlined
            className="statistics-list__icon"
            onClick={() => speechRecognition(word.word)}
          />
          <p>
            {`${word.word} - ${word.wordTranslate}`}
          </p>
        </li>
      ))}
    </ul>
  );
}

StatisticItem.propTypes = {
  words: PropTypes.arrayOf(PropTypes.shape({
    word: PropTypes.string,
    wordTranslate: PropTypes.string,
  })).isRequired,
};
