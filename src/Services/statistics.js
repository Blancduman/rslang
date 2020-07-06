export const updateStatisticsRequest = async (stats) => {
  try {
    const { userId, token } = JSON.parse(localStorage.getItem('user'));
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stats),
    });
    const content = await rawResponse.json();
    console.log('updated', content.optional);
  } catch (e) {
    console.log(e);
  }
};

export const getStatisticsRequest = async () => {
  try {
    const { userId, token } = JSON.parse(localStorage.getItem('user'));
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const content = await rawResponse.json();
    return content.optional;
  } catch (e) {
    console.log(e);
  }
};

export async function updateStatistics(gameType, updater) {
  const allStats = await getStatisticsRequest() || {};
  const oldGameStats = allStats[gameType] || {};
  const newGameStats = updater(oldGameStats);
  const newAllStats = {
    ...allStats,
    [gameType]: {
      ...oldGameStats,
      ...newGameStats,
    },
  };
  return updateStatisticsRequest({ optional: newAllStats });
}
