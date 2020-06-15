import React, { useState, useEffect } from 'react';
import Cards from '../../Components/Speakit_Cards';
import './speakit.css';

const Speakit = () => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const getWords = async (group, page) => {
      try {
        const url = `https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}`;
        const res = await fetch(url);
        const json = await res.json();
        setResult(json);
      } catch (error) {
        throw new Error('Error promise');
      }
    };
    getWords(1, 1);
  }, []);

  useEffect(() => {
    console.log(result);
  }, [result]);

  return <div><Cards words={result} />
  </div>;
};

export default Speakit;
