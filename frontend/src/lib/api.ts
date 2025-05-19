import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    const steamId = localStorage.getItem('steamId');

    if (steamId) {
        config.headers['x-steam-id'] = steamId;
    }

    return config;
});

export function api() {
    return instance;
}
