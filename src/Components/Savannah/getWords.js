const getWords = async (level, page) => {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${level}`);
  const words = await rawResponse.json();
  return words;
};

export default getWords;
