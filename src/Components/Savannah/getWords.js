const getWords = async (level, page) => {
  try {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${level}`);
    const words = await rawResponse.json();
    return words;
  } catch (error) {
    throw new Error(`Error in herokuapp - ${error.message}`);
  }
};

export default getWords;
