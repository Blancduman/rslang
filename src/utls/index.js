import { v4 as uuidv4 } from 'uuid';

export const calculatePercent = (amount, total) => ((amount / total) * 100);

export const getWordTranslateFromArrayWithChance = (word, words) => {
  const chance = Math.floor(Math.random() - 0.3);
  if (chance >= 0) {
    return word.wordTranslate;
  }
  const rn = Math.random();
  const random = Math.floor(rn * words.length);
  // To avoid duplications
  const transcript = words[random].wordTranslate;
  words.splice(random, 1);
  return transcript;
};

export const createUniqueKey = () => uuidv4();

export const reproduceAudioBySource = (src) => {
  const audio = new Audio(src);
  audio.autoplay = true;
};
