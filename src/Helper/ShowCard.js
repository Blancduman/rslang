const showCard = (event) => {
  // if (event.key !== 'Enter') return false;
  const picture = document.querySelector('.speakit__image_word');
  const translation = document.querySelector('.speakit__image_translate');

  const link = event.currentTarget.querySelector('.speakit__img').textContent;
  const englishWord = event.currentTarget.querySelector('.speakit__word');
  const russianWord = event.currentTarget.querySelector('.speakit__translate');

  picture.src = `https://raw.githubusercontent.com/DmitriEr/rslang-data/master/${link}`;
  picture.alt = englishWord.textContent;
  translation.textContent = russianWord.textContent;

  const speech = new SpeechSynthesisUtterance();
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  speech.lang = 'en-EN';
  speech.text = englishWord.textContent;
  window.speechSynthesis.speak(speech);
};

export default showCard;