function buildUserBody(difficulty, isCorrect) {
  if (isCorrect) {
    return {
      difficulty,
      optional: {
        isCorrect,
      },
    };
  }

  let count;

  switch (difficulty) {
    case 'easy': {
      count = 1;
      break;
    }
    case 'normal': {
      count = 2;
      break;
    }
    case 'hard': {
      count = 3;
      break;
    }
    default: {
      count = 3;
    }
  }

  return {
    difficulty,
    optional: {
      isCorrect,
      count,
    },
  };
}

const createUserWord = async (difficulty, wordId, isCorrect) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const body = buildUserBody(difficulty, isCorrect);

  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${user.userId}/words/${wordId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (rawResponse.ok) {
    return rawResponse.json();
  }
  throw new Error('Не удалось записать слово');
};

const updateUserWord = async (difficulty, wordId, isCorrect) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const body = buildUserBody(difficulty, isCorrect);

  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${user.userId}/words/${wordId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (rawResponse.ok) {
    return rawResponse.json();
  }
  throw new Error('Не удалось обновить слово');
};

const getUnlearnedUserWords = async (count = 10) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${user.userId}/aggregatedWords?wordsPerPage=${count}&filter={"$or":[{"userWord":null}]}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (rawResponse.ok) {
    return rawResponse.json();
  }
  throw new Error('Не удалось получить слова');
};

const getAggregatedUserWordsByDifficulty = async (difficulty, isCorrect, count = 10) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${user.userId}/aggregatedWords?wordsPerPage=${count}&filter={"$and":[{"userWord.difficulty":"${difficulty}", "userWord.optional.isCorrect":${isCorrect}}]}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (rawResponse.ok) {
    return rawResponse.json();
  }
  throw new Error('Не удалось получить слова');
};

const getUserWordById = async (wordId) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${user.userId}/words/${wordId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (rawResponse.status === 404) {
    return undefined;
  }

  if (rawResponse.ok) {
    return rawResponse.json();
  }
  throw new Error('Не удалось получить слово');
};

export const handleAnswer = async (wordId, isCorrect, difficulty = 'easy') => {
  const word = await getUserWordById(wordId);
  if (word) {
    await updateUserWord(difficulty, wordId, isCorrect);
  }
  await createUserWord(difficulty, wordId, isCorrect);
  return Promise.resolve();
};

export const getWordsToLearn = async (count = 10) => {
  let resultWords = [];
  const hardWords = await getAggregatedUserWordsByDifficulty('hard', false, count);
  resultWords = resultWords.concat(hardWords[0].paginatedResults);

  let restCount = count - hardWords[0].paginatedResults.length;
  if (restCount > 0) {
    const normalWords = await getAggregatedUserWordsByDifficulty('normal', false, restCount);
    resultWords = resultWords.concat(normalWords[0].paginatedResults);
    restCount -= normalWords[0].paginatedResults.length;
    if (restCount > 0) {
      const easyWords = await getAggregatedUserWordsByDifficulty('easy', false, restCount);
      resultWords = resultWords.concat(easyWords[0].paginatedResults);
      restCount -= easyWords[0].paginatedResults.length;

      if (restCount > 0) {
        const newWords = await getUnlearnedUserWords(restCount);
        resultWords = resultWords.concat(newWords[0].paginatedResults);
      }
    }
  }

  return resultWords;
};
