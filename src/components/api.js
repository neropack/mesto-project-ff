import { baseURL } from '../utils/constants';


const HEADERS = {
    headers: {
        authorization: 'fc80e7f8-a8b0-45d9-bcd1-d9e2033cee76',
        'Content-Type': 'application/json',
    },
};

const handlePromise = (response) => {
    if (response.ok) return response.json();

    return Promise.reject(`Ошибка: ${response.status}`);
};

const handleError = (err) => {
    console.log(err);
};

const request = (endpoint, options) => fetch(`${baseURL}${endpoint}`, options).then(handlePromise).catch(handleError);

const getInitialCards = () =>
    request('/cards', {
        ...HEADERS,
    });

const getProfile = () =>
    request('/users/me', {
        method: 'GET',
        ...HEADERS,
    });

const editProfile = (name, about) =>
    request('/users/me', {
        method: 'PATCH',
        ...HEADERS,
        body: JSON.stringify({
            name: name,
            about: about,
        }),
    });

const addCard = (name, link) =>
    request('/cards', {
        method: 'POST',
        ...HEADERS,
        body: JSON.stringify({
            name: name,
            link: link,
        }),
    });

const deleteCard = (cardId) =>
    request(`/cards/${cardId}`, {
        method: 'DELETE',
        ...HEADERS,
    });

const likeCard = (cardId) =>
    request(`/cards/likes/${cardId}`, {
        method: `PUT`,
        ...HEADERS,
    });

const unlikeCard = (cardId) =>
    request(`/cards/likes/${cardId}`, {
        method: `DELETE`,
        ...HEADERS,
    });

const updateAvatar = (link) =>
    request('/users/me/avatar', {
        method: 'PATCH',
        ...HEADERS,
        body: JSON.stringify({
            avatar: link,
        }),
    });

const checkImage = (link) => fetch(link, { method: 'HEAD' });

export {
    getInitialCards,
    getProfile,
    editProfile,
    addCard,
    deleteCard,
    likeCard,
    unlikeCard,
    updateAvatar,
    checkImage,
};
