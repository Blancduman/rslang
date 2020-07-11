import { v4 as uuidv4 } from 'uuid';

export const calculatePercent = (amount, total) => ((amount / total) * 100);

export const getWordTranslateFromArrayWithChance = (word, words) => {
  const chance = Math.floor(Math.random() - 0.3);
  if (chance >= 0) {
    return word.wordTranslate;
  }
  const rn = Math.random();
  const random = Math.floor(rn * words.length);
  const transcript = words[random].wordTranslate;
  words.splice(random, 1);
  return transcript;
};

export const createUniqueKey = () => uuidv4();

export const reproduceAudioBySource = (src) => {
  const audio = new Audio(src);
  audio.autoplay = true;
};

export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function gameDate() {
  const res = new Date().toLocaleString('ru-RU', {
    year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false,
  });
  return res;
}
