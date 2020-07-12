import { updateStatistics } from '../../../Services/statistics';
import { getDate } from '../../../utls/Audichallenge/getDate';

const statistics = async (listUsedWord, level) => {
  const rightAnser = listUsedWord.filter((item) => item.guessed);
  const WrongAnser = listUsedWord.filter((item) => !item.guessed);
  const percent = (rightAnser.length / (rightAnser.length + WrongAnser.length)) * 100;
  function updateAudioChallengeStatistics({ gamesCount = 0, dates = '[]' }) {
    const datesArr = JSON.parse(dates);

    datesArr.push({
      date: getDate(),
      Сложность: level.group,
      Уровень: level.page,
      'Правильные ответы': rightAnser.length,
      'Неправильные ответы': WrongAnser.length,
      'Процент правильных ответов': percent,
    });
    if (datesArr.length > 10) datesArr.shift();
    return {
      gamesCount: gamesCount + 1,
      dates: JSON.stringify(datesArr),
    };
  }

  updateStatistics('audiochallenge', updateAudioChallengeStatistics);
};

export default statistics;
