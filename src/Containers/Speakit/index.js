import React, { useState, useEffect } from 'react';
import Cards from '../../Components/Speakit_Cards';
import Image from '../../Components/Speakit_Image';
import Control from '../../Components/Speakit_Buttons';
import { getWords } from '../../Services/DataService';
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

  const x = 0;
  const y = 0;

  useEffect(() => {
    getWords(x, y).then((value) => setResult(value));
  }, [x, y]);

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
