import axios from 'axios';

const HOST = 'http://localhost:3001';
const CONTENT_TYPE_JSON = 'application/json';

export function registerAccount(credentials) {
    return axios
        .post(`${HOST}/api/user/register`, {
            username: credentials.username,
            password: credentials.password,
            email: credentials.email,
            headers: {
                Accept: CONTENT_TYPE_JSON,
            },
        })
        .then((resp) => ({ data: resp.data, error: false }))
        .catch((err) => ({
            data: err && err.response ? err.response.data : '',
            error: true,
            status: err && err.response ? err.response.status : '',
        }));
}

export function loginAccount(credentials) {
    return axios
        .post(`${HOST}/api/auth/login`, {
            username: credentials.username,
            password: credentials.password,
            headers: {
                Accept: CONTENT_TYPE_JSON,
            },
        })
        .then((resp) => ({ data: resp.data, error: false }))
        .catch((err) => ({
            data: err && err.response ? err.response.data : '',
            error: true,
            status: err && err.response ? err.response.status : '',
        }));
}

export function verifyToken(token) {
    return axios
        .post(`${HOST}/api/auth/verify`, {
            headers: {
                Accept: CONTENT_TYPE_JSON,
                authorization: token,
            },
        })
        .then((resp) => ({ data: resp.data, error: false }))
        .catch((err) => ({
            data: err && err.response ? err.response.data : '',
            error: true,
            status: err && err.response ? err.response.status : '',
        }));
}