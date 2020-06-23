import React, { useState, useEffect } from 'react';
import Cards from '../../Components/Speakit/Cards';
import Image from '../../Components/Speakit/Image';
import Control from '../../Components/Speakit/Buttons';
import { getWords } from '../../Services/DataService';

const Speakit = () => {
  const [result, setResult] = useState([]);
  const [inactive, setInactive] = useState('');
  const [picture, setPicture] = useState('');
  const [letter, setLetter] = useState('');
  const [voice, setVoice] = useState('');

  useEffect(() => {
    if (result.length) {
      setPicture(result[0].image);
      setLetter(result[0].wordTranslate);
    }
  }, [result]);

  useEffect(() => {
    getWords(0, 0).then((value) => setResult(value));
  }, []);

  return (
    <div>
      <main className="speakit__main">
        <Image
          checkPronunciations={voice}
          currentLetter={letter}
          currentPicture={picture}
        />
        <Cards
          words={result}
          cardOff={inactive}
          checkPronunciations={voice}
          changeLetter={setLetter}
          changePicture={setPicture}
        />
        <Control
          voice={setVoice}
          offActive={setInactive}
          changeLetter={setLetter}
        />
      </main>
    </div>
  );
};

export default Speakit;
