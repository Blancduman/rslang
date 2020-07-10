import * as moment from "moment";

export const handleAnswer = async (wordId, isCorrect, difficulty = undefined) => {
    const word = await getUserWordById(wordId);
    if (word) {
        await updateUserWord(difficulty, wordId, isCorrect)
    }
    await createUserWord(difficulty, wordId, isCorrect);
    return Promise.resolve();
};

const getAggregatedUserWordsByDifficulty = async (difficulty, isCorrect) => {
    const user = JSON.parse(localStorage.getItem('user'));

    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${user.userId}/aggregatedWords?filter={"$and":[{"userWord.difficulty":"hard", "userWord.optional.isCorrect":"${String(isCorrect)}"}]}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    });

    if (rawResponse.ok) {
        return rawResponse.json();
    }
    throw new Error('Не удалось получить слова');
};

const getUnlearnedUserWords = async (page = 0) => {
    const user = JSON.parse(localStorage.getItem('user'));

    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${user.userId}/aggregatedWords?page=${page}&filter={"$or":[{"userWord":null}]}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
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
        }
    });

    if (rawResponse.ok) {
        return rawResponse.json();
    }
    throw new Error('Не удалось получить слова');
};

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
        body,
    });

    if (rawResponse.ok) {
        return rawResponse.json();
    }
    throw new Error('Не удалось записать слово');
};

function buildUserBody(difficulty, isCorrect) {
    let date;

    switch (difficulty) {
        case 'easy': {
            date = moment().add(7, 'days').format('DD.MM.YYYY');
            break;
        }
        case 'normal': {
            date = moment().add(1, 'days').format('DD.MM.YYYY');
            break;
        }
        case 'hard': {
            date = moment().format('DD.MM.YYYY');
            break;
        }
        default: {
            date = moment().format('DD.MM.YYYY');
        }
    }

    return {
        difficulty,
        optional: {
            isCorrect,
            date
        }
    };
}

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
        body,
    });

    if (rawResponse.ok) {
        return rawResponse.json();
    }
    throw new Error('Не удалось обновить слово');
};
