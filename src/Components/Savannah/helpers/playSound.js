function playSound(isRight, soundOn) {
  if (soundOn) {
    let soundUrl = '';
    if (isRight) soundUrl = '../src/assets/audio/savanna_success.mp3';
    else soundUrl = '../src/assets/audio/savanna_error.mp3';
    const audioObj = new Audio(soundUrl);
    audioObj.play();
  }
}

export default playSound;
