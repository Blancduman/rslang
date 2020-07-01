import React from 'react';
import { Button, Layout } from 'antd';
import Header from '../../Components/EnglishPuzzle/Header';

const EnglishPuzzle = () => {
  const showActualPage = () => {
    return (
      <Layout className="english-puzzle__start-screen">
        <h1 className="english-puzzle__title">Мини-игра &quot;Головоломка&quot;</h1>
        <div className="english-puzzle__start-screen_content">
          <Header
            className="speakit__start-screen_level"
          />
          <Button
            type="primary"
          >
            Старт
          </Button>
        </div>
      </Layout>
    );
  };

  return (
    <div>
      {showActualPage()}
    </div>
  );
};

export default EnglishPuzzle;
