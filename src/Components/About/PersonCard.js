import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

function PersonCard({
  person: {
    avatar,
    name: {
      first,
      sur,
      nick,
    },
    position,
    aboutPerson,
    contribution,
    linkGitHub,
  },

}) {
  return (
    <div className="about_card">
      <div className="about_card_header">
        <div className="about_card_avatar">
          <img src={avatar} alt="icon" />
        </div>
        <div className="about_card_block-name">
          <div className="about_card_name">
            <h3>
              {first }
              &nbsp;
            </h3>
            <h3>
              {sur}
            </h3>
          </div>
          <div className="about_card_nick">
            <h4>{nick}</h4>
          </div>
          <div className="about_card_position">
            <p>{position}</p>
          </div>
        </div>
      </div>
      <div className="about_card_about_person">
        <p>{aboutPerson}</p>
      </div>
      <div className="about_card_contribution">
        <p>{contribution}</p>
      </div>
      <div className="about_card_link_git_hub">
        <a href={linkGitHub} target="_blank" rel="noreferrer noopener">
          <Button type="primary" shape="circle" icon={<GithubOutlined />} />
        </a>
      </div>
    </div>
  );
}

PersonCard.propTypes = {
  person: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.shape({
      first: PropTypes.string.isRequired,
      sur: PropTypes.string.isRequired,
      nick: PropTypes.string.isRequired,
    }),
    linkGitHub: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    aboutPerson: PropTypes.string.isRequired,
    contribution: PropTypes.string.isRequired,
  }).isRequired,
};

export default PersonCard;
