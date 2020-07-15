import React from 'react';
import { Layout } from 'antd';
import teamInfo from './team';
import PersonCard from './PersonCard';
import './about.css';

function AboutPage() {
  const personList = teamInfo.map((person) => (
    <PersonCard key={person.id} person={person} />
  ));

  return (
    <Layout className="about_wrapper">
      <div className="about_title">
        <h1>Члены команды</h1>
      </div>
      <div className="about_persons_wrapper">
        { personList }
      </div>
    </Layout>
  );
}

export default AboutPage;
