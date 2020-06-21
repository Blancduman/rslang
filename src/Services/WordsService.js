const getRandomPage = () => Math.random() * 30;

export const loadWords = async (page, level) => {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${getRandomPage()}&group=${level}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (rawResponse.ok) {
    return rawResponse.json();
  }
  return Promise.reject(new Error('Не удалось загрузить слова'));
};
