export const updateSavannahStatistics = async ({ stats }) => {
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
};

export const getSavannahStatistics = async () => {
  const { userId, token } = JSON.parse(localStorage.getItem('user'));
  try {
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
