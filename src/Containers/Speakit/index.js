import React, { useState, useEffect } from 'react';
import Cards from '../../Components/Speakit/Cards';
import Image from '../../Components/Speakit/Image';
import Control from '../../Components/Speakit/Buttons';
import { getWords } from '../../Services/DataService';

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
    getWords(0, 0).then((value) => setResult(value));
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
