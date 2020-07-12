export const getWords = async (group, page) => {
  try {
    const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}`);

    if (response.ok) {
      const data = await response.json();

      return data;
    }

    throw new Error(`HTTPS ${response.status}: ${await response.text()}`);
  } catch (error) {
    throw new Error(`Error in herokuapp - ${error.message}`);
  }
};
