export const getStatistic = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${user.userId}/statistics`, {
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
    throw new Error('Не удалось получить статистику');
};

export const updateStatistic = async (data) => {
    const user = JSON.parse(localStorage.getItem('user'));

    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${user.userId}/statistics`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(data),
    });

    if (rawResponse.ok) {
        return rawResponse.json();
    }
    throw new Error('Не удалось обновить статистику');
};
