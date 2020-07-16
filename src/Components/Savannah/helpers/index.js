import fail from '../../../assets/audio/savanna_error.mp3'
import success from '../../../assets/audio/savanna_success.mp3'

export function playSound(isRight, soundOn) {
  if (soundOn) {
    let soundUrl = isRight ? success : fail;
    const audioObj = new Audio(soundUrl);
    audioObj.play();
  }
}