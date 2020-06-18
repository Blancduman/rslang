import React, { useState, useEffect } from 'react';
import Cards from '../../Components/Speakit_Cards';
import Image from '../../Components/Speakit_Image';
import Control from '../../Components/Speakit_Buttons';
import './speakit.css';

const Speakit = () => {
  const [result, setResult] = useState([]);
  const [current, setCurrent] = useState({ word: '', image: '' });

  useEffect(() => {
    if (result.length) {
      setCurrent({
        word: result[0].wordTranslate,
        image: result[0].image,
      });
    }
  }, [result]);

  useEffect(() => {
    const getWords = async (group, page) => {
      try {
        const url = `https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}&wordsPerExampleSentenceLTE=20`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTPS ${response.status}: ${await response.text()}`);
        }

        const data = await response.json();
        setResult(data);
      } catch (error) {
        throw new Error(`Error in herokuapp - ${error.message}`);
      }
    };
    getWords(0, 0);
  }, []);

  return (
    <div>
      <main className="speakit__main">
        <Image current={current} />
        <Cards words={result} change={setCurrent} />
        <Control />
      </main>
    </div>
  );
};

export default Speakit;
