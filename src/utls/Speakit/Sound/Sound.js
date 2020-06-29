function speechRecognition(value) {
  const speech = new SpeechSynthesisUtterance();
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  speech.lang = 'en-EN';
  speech.text = value;
  window.speechSynthesis.speak(speech);
}

export default speechRecognition;
