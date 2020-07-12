const API_BASE_URL = 'https://afternoon-falls-25894.herokuapp.com';

const defaultOptions = {
  wordsPerDay: 20,
  optional: {
    maxWordsPerDay: 20,
    translateWord: true,
    transcriptionWord: false,
    imageAssociation: false,
    showAnswer: false,
    deleteWord: false,
    difficult: false,
    ratingWord: false,
    onlyNew: false,
    wordExplaining: false,
    sentenceExample: false,
  },
};

export const putUserSettings = async (id, token, options) => {
  try {
    const rawResponse = await fetch(`${API_BASE_URL}/users/${id}/settings`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });
    const content = await rawResponse.json();

    return content;
  } catch (e) {
    return e;
  }
};

export const getUserSettings = async (id, token) => {
  try {
    const rawResponse = await fetch(`${API_BASE_URL}/users/${id}/settings`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (!rawResponse.ok) {
      const updatedUserSettings = await putUserSettings(id, token, defaultOptions);

      return updatedUserSettings;
    }
    const content = await rawResponse.json();

    return content;
  } catch (e) {
    return e;
  }
};
